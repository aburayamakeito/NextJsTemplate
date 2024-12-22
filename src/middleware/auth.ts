// src/middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export type AuthMiddleware = {
  (request: NextRequest): Promise<NextResponse | undefined>
}

export const authMiddleware: AuthMiddleware = async (request: NextRequest) => {
  try {
    // レスポンスの作成
    const res = NextResponse.next()
    // Supabaseクライアントの作成
    const supabase = createMiddlewareClient({ req: request, res })

    // セッションの取得
    const { data: { session } } = await supabase.auth.getSession()

    // 保護されたルートのパターン
    const protectedRoutes = ['/dashboard', '/admin', '/profile']
    const isProtectedRoute = protectedRoutes.some(route => 
      request.nextUrl.pathname.startsWith(route)
    )

    // 認証が必要なルートでセッションがない場合
    if (isProtectedRoute && !session) {
      const redirectUrl = new URL('/login', request.url)
      redirectUrl.searchParams.set('from', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // 認証済みユーザーがログインページにアクセスした場合
    const isAuthRoute = ['/login', '/register'].includes(request.nextUrl.pathname)
    if (isAuthRoute && session) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return res
  } catch (error) {
    console.error('Auth middleware error:', error)
    return NextResponse.next()
  }
}