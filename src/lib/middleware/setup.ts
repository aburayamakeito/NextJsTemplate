// src/middleware.ts
import { NextRequest } from 'next/server'
import { runMiddleware } from '@/middleware/index'

export async function middleware(request: NextRequest) {
  return runMiddleware(request)
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/login',
    '/register'
  ]
}