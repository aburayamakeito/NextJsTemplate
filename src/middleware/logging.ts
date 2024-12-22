// src/middleware/logging.ts
import { NextRequest, NextResponse } from 'next/server'

export type LoggingMiddleware = {
  (request: NextRequest): Promise<NextResponse | undefined> | NextResponse | undefined
}

export const loggingMiddleware: LoggingMiddleware = (request: NextRequest) => {
  const startTime = Date.now()
  const requestId = crypto.randomUUID()

  // リクエスト情報をログ
  const logInfo = {
    id: requestId,
    timestamp: new Date().toISOString(),
    method: request.method,
    url: request.url,
    ua: request.headers.get('user-agent'),
    referer: request.headers.get('referer'),
    ip: request.headers.get('x-forwarded-for') || 
       request.headers.get('x-real-ip') || 
       'unknown'
  }

  // 開発環境でのみ詳細ログを表示
  if (process.env.NODE_ENV === 'development') {
    console.log('📝 Request:', {
      ...logInfo,
      headers: Object.fromEntries(request.headers.entries()),
    })
  }

  const response = NextResponse.next()

  // レスポンスヘッダーにリクエストIDを追加
  response.headers.set('X-Request-Id', requestId)

  // レスポンス時間を計測
  response.headers.set('X-Response-Time', `${Date.now() - startTime}ms`)

  return response
}

// カスタムログレベル
export const logLevels = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
} as const

// ログエントリーの型定義
type LogEntry = {
  level: keyof typeof logLevels
  message: string
  timestamp: string
  data?: unknown
  requestId?: string
}

// ロギングユーティリティ
export const logger = {
  log: (entry: LogEntry) => {
    const logMessage = {
      ...entry,
      timestamp: entry.timestamp || new Date().toISOString(),
    }

    switch (entry.level) {
      case 'ERROR':
        console.error(logMessage)
        break
      case 'WARN':
        console.warn(logMessage)
        break
      case 'INFO':
        console.info(logMessage)
        break
      case 'DEBUG':
        console.debug(logMessage)
        break
      default:
        console.log(logMessage)
    }

    // ここで外部ログサービスへの送信などを実装可能
  },

  error: (message: string, data?: unknown, requestId?: string) => {
    logger.log({
      level: 'ERROR',
      message,
      data,
      requestId,
      timestamp: new Date().toISOString(),
    })
  },

  warn: (message: string, data?: unknown, requestId?: string) => {
    logger.log({
      level: 'WARN',
      message,
      data,
      requestId,
      timestamp: new Date().toISOString(),
    })
  },

  info: (message: string, data?: unknown, requestId?: string) => {
    logger.log({
      level: 'INFO',
      message,
      data,
      requestId,
      timestamp: new Date().toISOString(),
    })
  },

  debug: (message: string, data?: unknown, requestId?: string) => {
    if (process.env.NODE_ENV === 'development') {
      logger.log({
        level: 'DEBUG',
        message,
        data,
        requestId,
        timestamp: new Date().toISOString(),
      })
    }
  },
}

// 使用例:
// logger.info('User logged in', { userId: '123' }, 'req-id-123')
// logger.error('Database connection failed', { error: err }, 'req-id-456')