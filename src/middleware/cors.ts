// src/middleware/cors.ts
import { NextRequest, NextResponse } from 'next/server'

export type CorsMiddleware = {
  (request: NextRequest): Promise<NextResponse | undefined> | NextResponse | undefined
}

export const corsMiddleware: CorsMiddleware = (req: NextRequest) => {
  // リクエストのオリジンを取得
  const origin = req.headers.get('origin') || ''
  
  // レスポンスの作成
  const response = NextResponse.next()

  // 許可するオリジンの設定
  // 開発環境と本番環境で分ける場合
  const allowedOrigins = process.env.NODE_ENV === 'development' 
    ? ['http://localhost:3000']
    : ['https://yourdomain.com']

  if (allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }

  // プリフライトリクエストの処理
  if (req.method === 'OPTIONS') {
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    )
    
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-CSRF-Token'
    )

    // プリフライトリクエストの有効期限（秒）
    response.headers.set('Access-Control-Max-Age', '86400')
  }
  

  // クレデンシャルを含むリクエストを許可
  response.headers.set('Access-Control-Allow-Credentials', 'true')

  return response
}