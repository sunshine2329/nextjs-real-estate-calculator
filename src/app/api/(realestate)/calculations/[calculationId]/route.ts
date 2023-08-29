import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import Calculation from '@/models/calculationModel'

connect()

export async function GET(req: NextRequest, { params }: { params: { calculationId: string } }) {
  try {
    const calculationId = params.calculationId
    const calculation = await Calculation.findById(calculationId)
    if (!calculation) {
      return NextResponse.json({ error: 'Not found calculation' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      data: calculation
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { calculationId: string } }) {
  try {
    const reqBody = await req.json()
    const calculationId = params.calculationId
    const calculation = await Calculation.findById(calculationId)
    if (!calculation) {
      return NextResponse.json({ error: 'Not found calculation' }, { status: 400 })
    }
    calculation.address.overwrite({ ...reqBody.address })
    const savedCalculation = await calculation.save()
    return NextResponse.json({
      success: true,
      data: savedCalculation
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
