import { TObject } from './TObject'

type TCashBuy = TObject & {
  purchase_price: number
  gross_annual_income: number
  rental_increase: number
  expenses_increase: number
  tax_rate: number
  insurance_rate: number
  maintenance_rate: number
  management_rate: number
  vacancy_rate: number
  capital_rate: number
  appreciation_rate: number
}

export type TCashBuyCalculations = {
  netIncome: number
  appreciation: number
  rentalRateIncrease: number
}

export type TCashBuyTableData = TCashBuyCalculations &
  TCashBuy & {
    scenarioId: string
    no: number
    name: string
  }

export type TCashBuyChartData = TCashBuyCalculations & { name: string }

export default TCashBuy
