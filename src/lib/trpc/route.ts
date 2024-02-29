import { initTRPC } from '@trpc/server'
import type { Context } from './context'

export const t = initTRPC.context<Context>().create()

export const appRouter = t.router({
  getCurrentUser: t.procedure.query(({ ctx }) => ctx.user),
})

// export type definition of API
export type AppRouter = typeof appRouter
