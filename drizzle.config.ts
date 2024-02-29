import { type Config } from 'drizzle-kit'

export default {
  schema: './src/lib/schema.ts',
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.DATABASE_URL ?? '',
  },
  tablesFilter: ['ujulotto_*'],
} satisfies Config
