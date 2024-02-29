import { TRPCError, initTRPC } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { ZodError, z } from 'zod'
import { numbers } from '../schema'
import { generationModeSchema } from '../type'
import type { Context } from './context'

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
    if (!ctx.session?.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: '로그인이 필요합니다.',
      })
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.session.user,
      },
    })
  }),
)

export const appRouter = t.router({
  getCurrentUser: publicProcedure.query(({ ctx }) => ctx.session?.user),

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
      where: eq(numbers.createdBy, ctx.user?.id),
    })
    return userNumbers.map((userNumber) => ({
      ...userNumber,
      numbers: userNumber.numbers.split(',').map((num) => parseInt(num)),
    }))
  }),
})

// export type definition of API
export type AppRouter = typeof appRouter
