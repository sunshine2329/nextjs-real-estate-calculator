import { NextRequest, NextResponse } from 'next/server'
import CashBuy from '@/models/cashBuyModel'
import StandardLoanRental from '@/models/standardLoanRentalModel'
import { getError } from '@/lib'
import { TCalculatorTypeParams } from '@/types'
import { getScenario } from '@/lib/reports'

export async function POST(req: NextRequest, { params }: { params: TCalculatorTypeParams }) {
  try {
    const { type, ...rest } = params
    const { scenario } = await getScenario(rest)

    const reqBody = await req.json()
    delete reqBody._id

    let calculation
    switch (type) {
      case 'cash_buy':
        calculation = new CashBuy({ ...reqBody })
        calculation = await calculation.save()
        scenario.cash_buy = calculation._id
        break
      case 'standard_loan_rental':
        calculation = new StandardLoanRental({ ...reqBody })
        calculation = await calculation.save()
        scenario.standard_loan_rental = calculation._id
        break

      default:
        throw 'Wrong Type.'
    }
    const savedScenario = await scenario.save()
    return NextResponse.json({
      message: 'Scenario updated successfully',
      success: true,
      data: { scenario: savedScenario, [type]: calculation }
    })
  } catch (error: any) {
    return getError(error)
  }
}
