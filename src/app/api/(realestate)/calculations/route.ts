import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import Calculation from '@/models/calculationModel'

connect()

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json()
    const { address } = reqBody

    // check if calculation already exists
    const calculation = await Calculation.findOne({ address })
    if (calculation) {
      return NextResponse.json({ error: 'Calculation already exists' }, { status: 400 })
    }

    const newCalculation = new Calculation({
      address
    })
    const savedCalculation = await newCalculation.save()

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

export async function GET() {
  try {
    const calculations = await Calculation.find()
    return NextResponse.json({
      message: 'successfully loaded',
      success: true,
      data: calculations
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
