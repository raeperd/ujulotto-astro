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
})

export const caller = createCallerFactory(appRouter)(await createContextInner())

// export type definition of API
export type AppRouter = typeof appRouter
