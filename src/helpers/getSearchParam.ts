import { NextRequest } from 'next/server'

export const getSearchParam = (request: NextRequest, name: string) => {
  return request.nextUrl.searchParams.get(name)
}
