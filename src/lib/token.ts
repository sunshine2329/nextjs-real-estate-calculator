import { NextResponse } from 'next/server'
import { getEnvVariable } from './helpers'
import { SignJWT, jwtVerify } from 'jose'

export const signJWT = async (payload: { sub: string }, options: { exp: string }) => {
  const secret = new TextEncoder().encode(getEnvVariable('JWT_SECRET_KEY'))
  const alg = 'HS256'
  return new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setExpirationTime(options.exp)
    .setIssuedAt()
    .setSubject(payload.sub)
    .sign(secret)
}

export const verifyJWT = async <T>(token: string): Promise<T> => {
  try {
    return (await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY)))
      .payload as T
  } catch (error) {
    console.log(error)
    throw new Error('Your token has expired.')
  }
}

export const setToken = async (userId: string) => {
  const JWT_EXPIRES_IN = getEnvVariable('JWT_EXPIRES_IN')

  const token = await signJWT({ sub: userId }, { exp: `${JWT_EXPIRES_IN}m` })

  const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60
  console.log(token)
  console.log(tokenMaxAge)
  const cookieOptions = {
    name: 'token',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV !== 'development',
    maxAge: tokenMaxAge
  }

  const response = new NextResponse(
    JSON.stringify({
      status: 'success',
      token
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  )

  await Promise.all([
    response.cookies.set(cookieOptions),
    response.cookies.set({
      name: 'logged-in',
      value: 'true',
      maxAge: tokenMaxAge
    })
  ])
  return response
}

export const clearToken = async (response: NextResponse) => {
  await Promise.all([
    response.cookies.set({
      name: 'token',
      value: '',
      maxAge: -1
    }),
    response.cookies.set({
      name: 'logged-in',
      value: '',
      maxAge: -1
    })
  ])
  return response
}
