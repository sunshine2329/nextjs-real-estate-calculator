import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import Scenario from '@/models/scenarioModel'
import CashBuy from '@/models/cashBuyModel'
import StandardLoanRental from '@/models/standardLoanRentalModel'
import { TScenarioParams } from '@/types'
import { getScenario } from '@/lib/reports'
import { getError } from '@/lib'

connect()

export async function GET(req: NextRequest, { params }: { params: TScenarioParams }) {
  try {
    const { scenario } = await getScenario(params)
    const cashBuy = await CashBuy.findById(scenario.cash_buy)
    const standardLoanRental = await StandardLoanRental.findById(scenario.standard_loan_rental)
    return NextResponse.json({
      success: true,
      data: { scenario, cash_buy: cashBuy, standard_loan_rental: standardLoanRental }
    })
  } catch (error: any) {
    return getError(error)
  }
}

export async function PUT(req: NextRequest, { params }: { params: TScenarioParams }) {
  try {
    const { name } = await req.json()
    const { scenario } = await getScenario(params)
    scenario.override({ name })
    const savedScenario = await scenario.save()

    return NextResponse.json({
      message: 'Scenario updated successfully',
      success: true,
      data: { scenario: savedScenario }
    })
  } catch (error: any) {
    return getError(error)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: TScenarioParams }) {
  try {
    const { report, scenario, index } = await getScenario(params)

    report.scenarios.splice(index, 1)

    await report.save()

    if (scenario.cash_buy) await CashBuy.deleteOne({ _id: scenario.cash_buy })
    if (scenario.standard_loan_rental)
      await StandardLoanRental.deleteOne({ _id: scenario.standard_loan_rental })

    await Scenario.deleteOne({ _id: params.scenarioId })

    return NextResponse.json({
      message: 'successfully removed',
      success: true
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
