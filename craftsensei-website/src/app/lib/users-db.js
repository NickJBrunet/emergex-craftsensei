import bcrypt from 'bcryptjs'
import { db } from '../../db'
import { users } from '../../db/schema'
import { eq } from 'drizzle-orm'

export async function findUserByEmail(email) {
  return await db.query.users.findFirst({ where: eq(users.email, email) })
}

export async function createUser(name, email, password) {
  const existing = await findUserByEmail(email)
  if (existing) throw new Error('Email already exists')

  const passwordHash = await bcrypt.hash(password, 12)
  // const [newUser] = await db.insert(users).values({
  //   name, email, passwordHash
  // }).returning()
  // return newUser
  const newUser = await db.insert(users).values({
    name, email, passwordHash
  }).returning();

  return newUser[0];
  
}

export async function findUserBySessionToken(sessionToken) {
  return await db.query.users.findFirst({ where: eq(users.sessionToken, sessionToken) })
}

export async function updateSessionToken(userId, sessionToken) {
  await db.update(users).set({ sessionToken }).where(eq(users.id, userId))
}



