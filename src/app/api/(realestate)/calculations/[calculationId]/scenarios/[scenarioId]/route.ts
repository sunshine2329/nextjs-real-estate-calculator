import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import Calculation from '@/models/calculationModel'

connect()

export async function GET(
  req: NextRequest,
  { params }: { params: { calculationId: string; scenarioId: string } }
) {
  try {
    const calculationId = params.calculationId
    const scenarioId = params.scenarioId
    const calculation = await Calculation.findById(calculationId)
    if (!calculation) {
      return NextResponse.json({ error: 'Not found calculation' }, { status: 400 })
    }

    const scenario = calculation.scenarios.filter((item: any) => String(item._id) === scenarioId)[0]

    if (!scenario) {
      return NextResponse.json({ error: 'Not found scenario' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      data: scenario
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { calculationId: string; scenarioId: string } }
) {
  try {
    const reqBody = await req.json()
    const calculationId = params.calculationId
    const scenarioId = params.scenarioId
    const calculation = await Calculation.findById(calculationId)
    if (!calculation) {
      return NextResponse.json({ error: 'Not found calculation' }, { status: 400 })
    }

    const index = calculation.scenarios.findIndex((item: any) => String(item._id) === scenarioId)

    if (index === -1) {
      return NextResponse.json({ error: 'Not found scenario' }, { status: 400 })
    }

    calculation.scenarios[index].overwrite({ ...reqBody })

    const savedCalculation = await calculation.save()
    return NextResponse.json({
      success: true,
      data: savedCalculation.scenarios[index]
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { calculationId: string; scenarioId: string } }
) {
  try {
    const calculationId = params.calculationId
    const scenarioId = params.scenarioId
    const calculation = await Calculation.findById(calculationId)
    if (!calculation) {
      return NextResponse.json({ error: 'Not found calculation' }, { status: 400 })
    }

    const index = calculation.scenarios.findIndex((item: any) => String(item._id) === scenarioId)

    if (index === -1) {
      return NextResponse.json({ error: 'Not found scenario' }, { status: 400 })
    }

    calculation.scenarios.splice(index, 1)

    await calculation.save()
    return NextResponse.json({
      message: 'successfully removed',
      success: true
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
