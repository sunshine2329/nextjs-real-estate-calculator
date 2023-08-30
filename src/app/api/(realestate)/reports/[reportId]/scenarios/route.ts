import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import Report from '@/models/reportModel'

connect()

export async function POST(req: NextRequest, { params }: { params: { reportId: string } }) {
  try {
    const reportId = params.reportId
    const reqBody = await req.json()
    const report = await Report.findById(reportId)
    if (!report) {
      return NextResponse.json({ error: 'Not found report' }, { status: 400 })
    }
    report.scenarios.push(reqBody)
    const savedReport = await report.save()
    return NextResponse.json({
      message: 'Report created successfully',
      success: true,
      data: savedReport
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
