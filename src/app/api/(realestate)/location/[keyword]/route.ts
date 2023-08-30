import { getRealEstateData } from '@/helpers'
import { NextRequest, NextResponse } from 'next/server'
export async function GET(
  request: NextRequest,
  { params: { keyword } }: { params: { keyword: string } }
) {
  try {
    const data = await getRealEstateData({
      method: 'GET',
      url: 'https://realty-in-us.p.rapidapi.com/locations/v2/auto-complete',
      params: {
        input: keyword
      }
    })
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
