import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { getSession } from 'auth-astro/server'
import { db } from '../db'

export async function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  const session = await getSession(req)
  return { req, resHeaders, session, db }
}

export type Context = Awaited<ReturnType<typeof createContext>>
