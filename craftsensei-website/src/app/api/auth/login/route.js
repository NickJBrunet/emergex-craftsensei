import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { findUserByEmail, updateSessionToken } from '../../../lib/users-db'  // Add update

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    console.log('Login body:', { email, passwordLength: password?.length })

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
    }

    const user = await findUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash)
    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const sessionToken = Buffer.from(`${user.id}:${Date.now()}`).toString('base64')
    await updateSessionToken(user.id, sessionToken)

    const cookieStore = await cookies()
    cookieStore.set('sessionToken', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    })

    return NextResponse.json({ success: true, user: { name: user.name, email: user.email } })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}


