import { connect } from '@/dbConfig/dbConfig'
import { getErrorResponse } from '@/lib/helpers'
import { RegisterUserInput, RegisterUserSchema } from '@/lib/validations/user.schema'
import User from '@/models/userModel'
import { hash } from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

connect()

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterUserInput
    const data = RegisterUserSchema.parse(body)

    const hashedPassword = await hash(data.password, 12)
    const user = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword
    })
    const savedUser = await user.save()
    return new NextResponse(
      JSON.stringify({
        status: 'success',
        data: { user: { ...savedUser.toJSON(), password: undefined } }
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, 'failed validations', error)
    }

    if (error.code === 'P2002') {
      return getErrorResponse(409, 'user with that email already exists')
    }

    return getErrorResponse(500, error.message)
  }
}
