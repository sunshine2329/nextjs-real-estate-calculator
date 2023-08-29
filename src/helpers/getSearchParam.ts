import { NextRequest } from 'next/server'

export const getSearchParam = (request: NextRequest, name: string) => {
  console.log(request.nextUrl)
  return request.nextUrl.searchParams.get(name)
}
