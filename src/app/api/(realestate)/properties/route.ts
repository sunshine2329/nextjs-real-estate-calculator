// In pages/api/location.js:
import { getRealEstateData } from '@/helpers'
import { NextRequest, NextResponse } from 'next/server'
export async function POST(request: NextRequest) {
  const data = await request.json()
  try {
    const response = await getRealEstateData({
      method: 'POST',
      url: 'https://realty-in-us.p.rapidapi.com/properties/v3/list',
      data: { ...data, status: ['for_sale', 'ready_to_build'] }
    })
    return NextResponse.json({ ...response.data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
