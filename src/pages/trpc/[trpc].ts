import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import type { APIRoute } from 'astro'
import { createContext } from '../../lib/trpc/context'
import { appRouter } from '../../lib/trpc/route'

export const ALL: APIRoute = (opts) => {
  return fetchRequestHandler({
    endpoint: '/trpc',
    req: opts.request,
    router: appRouter,
    createContext,
    onError(err) {
      console.error('TRPC error:', err)
    },
  })
}
