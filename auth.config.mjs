import Kakao from '@auth/core/providers/kakao'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { defineConfig } from 'auth-astro'
import { db } from 'src/lib/db'
import { mysqlTable } from 'src/lib/schema'

export default defineConfig({
  adapter: DrizzleAdapter(db, mysqlTable),
  providers: [
    Kakao({
      clientId: import.meta.env.KAKAO_CLIENT_ID,
      clientSecret: import.meta.env.KAKAO_CLIENT_SECRET,
    }),
  ],
})
