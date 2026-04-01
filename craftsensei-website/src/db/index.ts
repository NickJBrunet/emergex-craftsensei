import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { users } from './schema'

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql, { 
  schema: { users } 
});
export type UsersTable = typeof users
