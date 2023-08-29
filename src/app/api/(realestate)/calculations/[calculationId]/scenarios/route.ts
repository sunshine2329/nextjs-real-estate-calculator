import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import Calculation from '@/models/calculationModel'

connect()

export async function POST(req: NextRequest, { params }: { params: { calculationId: string } }) {
  try {
    const calculationId = params.calculationId
    const reqBody = await req.json()
    const calculation = await Calculation.findById(calculationId)
    if (!calculation) {
      return NextResponse.json({ error: 'Not found calculation' }, { status: 400 })
    }
    calculation.scenarios.push(reqBody)
    const savedCalculation = await calculation.save()
    return NextResponse.json({
      message: 'Calculation created successfully',
      success: true,
      data: savedCalculation
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
