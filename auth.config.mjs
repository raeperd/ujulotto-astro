import { db } from '@/lib/db/db'
import { mysqlTable } from '@/lib/db/schema'
import Kakao from '@auth/core/providers/kakao'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { defineConfig } from 'auth-astro'

export default defineConfig({
  adapter: DrizzleAdapter(db, mysqlTable),
  providers: [
    Kakao({
      clientId: import.meta.env.KAKAO_CLIENT_ID,
      clientSecret: import.meta.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
})
