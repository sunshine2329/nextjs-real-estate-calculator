import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import Report from '@/models/reportModel'

connect()

export async function POST(req: NextRequest) {
  try {
    const { address } = await req.json()

    // check if report already exists
    const report = await Report.findOne({ address })
    if (report) {
      return NextResponse.json({ error: 'Report already exists' }, { status: 400 })
    }

    const newReport = new Report({
      address
    })
    const savedReport = await newReport.save()

    return NextResponse.json({
      message: 'Report created successfully',
      success: true,
      data: { report: savedReport }
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const reports = await Report.find()
    return NextResponse.json({
      message: 'successfully loaded',
      success: true,
      data: { reports }
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
