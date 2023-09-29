import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import CashBuy from '@/models/cashBuyModel'
import StandardLoanRental from '@/models/standardLoanRentalModel'
import { getError } from '@/lib'
import { getScenario } from '@/lib/reports'
import { TCalculatorTypeParams } from '@/types'

connect()

const getCalculation = async ({ reportId, scenarioId, type }: TCalculatorTypeParams) => {
  const { scenario } = await getScenario({ reportId, scenarioId })
  let calculation
  switch (type) {
    case 'cash_buy':
      calculation = await CashBuy.findById(scenario.cash_buy)
      break
    case 'standard_loan_rental':
      calculation = await StandardLoanRental.findById(scenario.standard_loan_rental)
      break
    default:
      throw 'Wrong Type.'
  }
  return calculation
}
export async function GET(req: NextRequest, { params }: { params: TCalculatorTypeParams }) {
  try {
    const { type } = params
    const calculation = await getCalculation(params)
    return NextResponse.json({
      success: true,
      data: { [type]: calculation }
    })
  } catch (error: any) {
    return getError(error)
  }
}

export async function PUT(req: NextRequest, { params }: { params: TCalculatorTypeParams }) {
  try {
    const { type } = params
    const calculation = await getCalculation(params)
    const reqBody = await req.json()
    calculation.override({ ...reqBody })
    const savedCalculation = await calculation.save()
    return NextResponse.json({
      message: 'Scenario updated successfully',
      success: true,
      data: { [type]: savedCalculation }
    })
  } catch (error: any) {
    return getError(error)
  }
}
