import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { createUser, updateSessionToken } from '../../../lib/users-db'  // Add updateSessionToken

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()
    
    // Log for debug
    console.log('Signup body:', { name, email, passwordLength: password?.length })

    if (!name || !email || !password || password.length < 6) {
      return NextResponse.json({ error: 'Name, email, and password (6+ chars) required' }, { status: 400 })
    }

    const newUser = await createUser(name, email, password)

    const sessionToken = Buffer.from(`${newUser.id}:${Date.now()}`).toString('base64')
    await updateSessionToken(newUser.id, sessionToken)

    const cookieStore = await cookies()
    cookieStore.set('sessionToken', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    })

    return NextResponse.json({ success: true, user: { name: newUser.name, email: newUser.email } })
  } catch (error) {
    console.error('Signup error:', error)
    if (error.message === 'Email already exists') {
      return NextResponse.json({ error: error.message }, { status: 409 })
    }
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 })
  }
}

