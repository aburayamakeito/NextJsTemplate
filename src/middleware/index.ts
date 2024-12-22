// src/middleware/index.ts
import { NextRequest, NextResponse } from 'next/server'
import { corsMiddleware } from './cors'
import { authMiddleware } from './auth'
import { loggingMiddleware } from './logging'
import { logger } from './logging'

// ミドルウェアの実行順序を制御する関数
export async function runMiddleware(request: NextRequest) {
  try {
    // ロギングは常に最初に実行
    const loggingResponse = loggingMiddleware(request)
    if (loggingResponse && loggingResponse !== NextResponse.next()) {
      return loggingResponse
    }

    // CORSチェック
    const corsResponse = corsMiddleware(request)
    if (corsResponse && corsResponse !== NextResponse.next()) {
      return corsResponse
    }

    // 認証チェック
    const authResponse = await authMiddleware(request)
    if (authResponse) {
      return authResponse
    }

    // すべてのチェックを通過
    return NextResponse.next()

  } catch (error) {
    // エラーハンドリング
    logger.error('Middleware error:', { error })
    
    // APIルートの場合はJSONレスポンス
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return new NextResponse(
        JSON.stringify({ error: 'Internal server error' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
    
    // それ以外はエラーページにリダイレクト
    return NextResponse.redirect(new URL('/error', request.url))
  }
}

// 個別のミドルウェアも再エクスポート
export { corsMiddleware, authMiddleware, loggingMiddleware }