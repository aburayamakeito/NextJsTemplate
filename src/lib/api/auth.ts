// lib/auth.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function checkPermission(requiredRole: 'admin' | 'editor' | 'user') {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single()

  if (!profile) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const hasPermission = 
    (requiredRole === 'admin' && profile.role === 'admin') ||
    (requiredRole === 'editor' && ['admin', 'editor'].includes(profile.role)) ||
    (requiredRole === 'user')

  if (!hasPermission) {
    return new NextResponse('Forbidden', { status: 403 })
  }
}

// 使用例
// app/api/admin/users/route.ts
export async function GET() {
  const permissionCheck = await checkPermission('admin')
  if (permissionCheck) return permissionCheck

  // 処理を継続...
}