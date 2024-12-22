import '@testing-library/jest-dom'
import { afterEach, beforeAll, afterAll, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { server } from '@/lib/mocks/server'

// 各テスト後にクリーンアップ
afterEach(() => {
  cleanup()
})

// MSWの設定
beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

// グローバルなモックの設定
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn()
  })
}))

// フェッチのモック
global.fetch = vi.fn()