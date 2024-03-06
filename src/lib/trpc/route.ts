import { TRPCError, initTRPC } from '@trpc/server'
import { desc, eq, inArray } from 'drizzle-orm'
import { ZodError, z } from 'zod'
import { numbers, users } from '../db/schema'
import { generationModeSchema } from '../type'
import { createContextInner, type Context } from './context'

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

const publicProcedure = t.procedure
const protectedProcedure = t.procedure.use(
  t.middleware(async ({ ctx, next }) => {
    const currentUser = ctx.session?.user
    if (!currentUser?.id) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: `로그인이 필요합니다. ${JSON.stringify(ctx.session)}`,
      })
    }
    return next({
      ctx: {
        db: ctx.db,
        user: currentUser,
      },
    })
  }),
)

const { router, createCallerFactory } = t

export const appRouter = router({
  getCurrentUser: publicProcedure.query(({ ctx }) => ctx.session?.user),

  setUsername: protectedProcedure
    .input(z.object({ username: z.string() }))
    .mutation(({ input, ctx }) => {
      console.log('input.username:', input.username)
      return ctx.db
        .update(users)
        .set({ name: input.username })
        .where(eq(users.id, ctx.user.id))
    }),

  createUserNumbers: protectedProcedure
    .input(
      z.object({
        mode: generationModeSchema,
        numbers: z
          .array(z.number())
          .length(30)
          .refine((numbers) => numbers.every((num) => 0 < num && num <= 45), {
            message: '1~45 사이의 숫자를 입력해주세요.',
          }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.insert(numbers).values({
        createdBy: ctx.user.id,
        mode: input.mode,
        numbers: input.numbers.join(','),
      })
    }),

  getUserNumbers: protectedProcedure.query(async ({ ctx }) => {
    const userNumbers = await ctx.db.query.numbers.findMany({
      where: eq(numbers.createdBy, ctx.user.id),
    })
    return userNumbers.map((userNumber) => ({
      ...userNumber,
      numbers: userNumber.numbers.split(',').map((num) => parseInt(num)),
    }))
  }),

  getAllNumbers: publicProcedure.query(async ({ ctx }) => {
    const results = await ctx.db.query.numbers.findMany({
      orderBy: [desc(numbers.id)],
      limit: 10,
      with: {
        create: true,
      },
    })
    return results.map((number) => ({
      id: number.id,
      mode: number.mode,
      numbers: number.numbers.split(',').map((num) => parseInt(num)),
      createdAt: number.createdAt ?? new Date(),
      createdBy: number.create.name ?? 'unknown',
    }))
  }),

  getNumbersById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.numbers.findFirst({
        where: eq(numbers.id, input.id),
      })
    }),

  deleteNumbersByIds: protectedProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .mutation(({ input, ctx }) => {
      return ctx.db.delete(numbers).where(inArray(numbers.id, input.ids))
    }),

  getPlaces: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
        latitude: z.number(),
        longitude: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const res = await fetch(
        'https://dapi.kakao.com/v2/local/search/keyword?' +
          new URLSearchParams({
            query: input.query,
            x: input.longitude.toString(),
            y: input.latitude.toString(),
            radius: '2000',
          }).toString(),
        {
          headers: {
            Authorization: 'KakaoAK 96d40be9ef0c11e65e8daf0b766da70b',
          },
        },
      )
      if (res.status != 200) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: await res.text(),
        })
      }
      return placesSchema.parse(await res.json())
    }),
})

const placesSchema = z.object({
  documents: z.array(
    z.object({
      address_name: z.string(),
      category_group_code: z.string(),
      category_group_name: z.string(),
      category_name: z.string(),
      distance: z.string(),
      id: z.string(),
      phone: z.string(),
      place_name: z.string(),
      place_url: z.string(),
      road_address_name: z.string(),
      x: z.coerce.number(),
      y: z.coerce.number(),
    }),
  ),
  meta: z.object({
    is_end: z.boolean(),
    pageable_count: z.number(),
    same_name: z.object({
      keyword: z.string(),
      region: z.array(z.unknown()),
      selected_region: z.string(),
    }),
    total_count: z.number(),
  }),
})

export const caller = createCallerFactory(appRouter)(await createContextInner())

// export type definition of API
export type AppRouter = typeof appRouter
