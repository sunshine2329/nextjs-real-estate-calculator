import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import Scenario from '@/models/scenarioModel'
import CashBuy from '@/models/cashBuyModel'
import StandardLoanRental from '@/models/standardLoanRentalModel'
import mongoose from 'mongoose'
import { TReportParams } from '@/types'
import { getError } from '@/lib'
import { getReport } from '@/lib/reports'

connect()

const getReportRelations = async (report: { scenarios: mongoose.Types.ObjectId[] }) => {
  const scenarios =
    report.scenarios.length > 0 ? await Scenario.find({ _id: { $in: report.scenarios } }) : []

  const cashBuyIds: any[] = []
  const standardLoanRentalIds: any[] = []
  scenarios.forEach(scenario => {
    if (scenario.cash_buy) cashBuyIds.push(scenario.cash_buy)
    if (scenario.standard_loan_rental) standardLoanRentalIds.push(scenario.standard_loan_rental)
  })

  const cash_buys = cashBuyIds.length > 0 ? await CashBuy.find({ _id: { $in: cashBuyIds } }) : []
  const standard_loan_rentals =
    standardLoanRentalIds.length > 0
      ? await StandardLoanRental.find({ _id: { $in: standardLoanRentalIds } })
      : []
  return { scenarios, cash_buys, standard_loan_rentals }
}
export async function GET(req: NextRequest, { params }: { params: TReportParams }) {
  try {
    const report = await getReport(params)
    const relations = await getReportRelations(report)

    return NextResponse.json({
      success: true,
      data: { report, ...relations }
    })
  } catch (error: any) {
    return getError(error)
  }
}

export async function PUT(req: NextRequest, { params }: { params: TReportParams }) {
  try {
    const reqBody = await req.json()
    const report = await getReport(params)
    report.overwrite({ address: reqBody.address })
    const savedReport = await report.save()
    const relations = await getReportRelations(savedReport)
    return NextResponse.json({
      success: true,
      data: { report: savedReport, ...relations }
    })
  } catch (error: any) {
    return getError(error)
  }
}
