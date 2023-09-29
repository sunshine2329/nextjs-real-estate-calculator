import { NextRequest, NextResponse } from 'next/server'
import Scenario from '@/models/scenarioModel'
import { TReportParams } from '@/types'
import { getReport } from '@/lib/reports'
import { getError } from '@/lib'

export async function POST(req: NextRequest, { params }: { params: TReportParams }) {
  try {
    const { name } = await req.json()
    const report = await getReport(params)
    const scenario = new Scenario({ name })
    const savedScenario = await scenario.save()
    report.scenarios.push(savedScenario._id)
    const savedReport = await report.save()
    return NextResponse.json({
      message: 'Scenario created and added to Report successfully',
      success: true,
      data: { report: savedReport, scenario: savedScenario }
    })
  } catch (error: any) {
    return getError(error)
  }
}
