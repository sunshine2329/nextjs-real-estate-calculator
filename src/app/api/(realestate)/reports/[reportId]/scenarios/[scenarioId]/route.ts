import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import Report from '@/models/reportModel'

connect()

export async function GET(
  req: NextRequest,
  { params }: { params: { reportId: string; scenarioId: string } }
) {
  try {
    const reportId = params.reportId
    const scenarioId = params.scenarioId
    const report = await Report.findById(reportId)
    if (!report) {
      return NextResponse.json({ error: 'Not found report' }, { status: 400 })
    }

    const scenario = report.scenarios.filter((item: any) => String(item._id) === scenarioId)[0]

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
  { params }: { params: { reportId: string; scenarioId: string } }
) {
  try {
    const reqBody = await req.json()
    const reportId = params.reportId
    const scenarioId = params.scenarioId
    const report = await Report.findById(reportId)
    if (!report) {
      return NextResponse.json({ error: 'Not found report' }, { status: 400 })
    }

    const index = report.scenarios.findIndex((item: any) => String(item._id) === scenarioId)

    if (index === -1) {
      return NextResponse.json({ error: 'Not found scenario' }, { status: 400 })
    }

    report.scenarios[index].overwrite({ ...reqBody })

    const savedReport = await report.save()
    return NextResponse.json({
      success: true,
      data: savedReport.scenarios[index]
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { reportId: string; scenarioId: string } }
) {
  try {
    const reportId = params.reportId
    const scenarioId = params.scenarioId
    const report = await Report.findById(reportId)
    if (!report) {
      return NextResponse.json({ error: 'Not found report' }, { status: 400 })
    }

    const index = report.scenarios.findIndex((item: any) => String(item._id) === scenarioId)

    if (index === -1) {
      return NextResponse.json({ error: 'Not found scenario' }, { status: 400 })
    }

    report.scenarios.splice(index, 1)

    await report.save()
    return NextResponse.json({
      message: 'successfully removed',
      success: true
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
