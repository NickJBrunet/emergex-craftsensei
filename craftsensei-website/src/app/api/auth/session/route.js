import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { findUserBySessionToken } from '../../../lib/users-db'

export async function GET() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("sessionToken")?.value
  
  if (!sessionToken) {
    return NextResponse.json({ session: null })
  }

  const user = await findUserBySessionToken(sessionToken)
  if (!user) {
    return NextResponse.json({ session: null })
  }

  return NextResponse.json({ 
    session: { 
      user: { name: user.name, email: user.email } 
    } 
  })
}

