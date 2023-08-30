import { clearToken } from '@/lib'
import { NextResponse } from 'next/server'

export async function GET() {
  const response = new NextResponse(JSON.stringify({ status: 'success' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })

  return await clearToken(response)
}
