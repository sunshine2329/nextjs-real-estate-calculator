import { connect } from '@/dbConfig/dbConfig'
import { getErrorResponse } from '@/lib/helpers'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function GET(req: NextRequest) {
  const userId = req.headers.get('X-USER-ID')

  if (!userId) {
    return getErrorResponse(401, 'You are not logged in, please provide token to gain access')
  }

  const user = await User.findById(userId)

  return NextResponse.json({
    status: 'success',
    data: { user: { ...user.toJSON(), password: undefined } }
  })
}
