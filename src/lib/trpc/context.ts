import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { getSession } from 'auth-astro/server'

export function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  const user = getSession(req).then((session) => session?.user ?? null)
  return { req, resHeaders, user }
}

export type Context = Awaited<ReturnType<typeof createContext>>
