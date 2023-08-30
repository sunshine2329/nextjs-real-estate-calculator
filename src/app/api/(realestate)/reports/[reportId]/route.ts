import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import Report from '@/models/reportModel'

connect()

export async function GET(req: NextRequest, { params }: { params: { reportId: string } }) {
  try {
    const reportId = params.reportId
    const report = await Report.findById(reportId)
    if (!report) {
      return NextResponse.json({ error: 'Not found report' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      data: report
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { reportId: string } }) {
  try {
    const reqBody = await req.json()
    const reportId = params.reportId
    const report = await Report.findById(reportId)
    if (!report) {
      return NextResponse.json({ error: 'Not found report' }, { status: 400 })
    }
    report.address.overwrite({ ...reqBody.address })
    const savedReport = await report.save()
    return NextResponse.json({
      success: true,
      data: savedReport
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
