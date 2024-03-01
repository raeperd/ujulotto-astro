import type { Session } from '@auth/core/types'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { getSession } from 'auth-astro/server'
import { db } from '../db/db'

interface CreateInnerContextOptions
  extends Partial<FetchCreateContextFnOptions> {
  session: Session | null
}

export async function createContextInner(opts?: CreateInnerContextOptions) {
  return {
    db,
    session: opts?.session,
  }
}

export async function createContext({ req }: FetchCreateContextFnOptions) {
  const session = await getSession(req)
  const contextInner = await createContextInner({ session })
  return { ...contextInner }
}

export type Context = Awaited<ReturnType<typeof createContext>>
