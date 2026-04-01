import { NextResponse } from 'next/server'
import { findUserBySessionToken } from './lib/users-db'

export default async function middleware(request) {
  // Get session token from request (NOT next/headers)
  const sessionToken = request.cookies.get('sessionToken')?.value
  
  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    // Double-check token is valid
    const user = await findUserBySessionToken(sessionToken)
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }
  
  // Redirect logged-in users from auth pages
  if (sessionToken) {
    if (request.nextUrl.pathname === '/auth/login' || 
        request.nextUrl.pathname === '/auth/signup') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = { 
  matcher: [
    '/dashboard/:path*',
    '/auth/login',
    '/auth/signup'
  ]
}


