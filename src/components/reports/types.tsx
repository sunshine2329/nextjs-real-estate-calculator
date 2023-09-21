export type TFinancialReportValues = {
  name: string

  // Purchase Information
  purchase_price: number
  use_loan: boolean
  down_payment: number
  interest_rate: number
  loan_term: number
  closing_cost: number
  need_repairs: boolean
  repair_cost: number
  value_after_repairs: number

  // Income
  monthly_rent: number
  annual_increase_monthly_rent: number
  other_monthly_income: number
  annual_increase_other_monthly_income: number
  vacancy_rate: number
  management_fee: number

  // Recurring Operating Expenses
  property_tax: number
  annual_increase_property_tax: number
  total_insurance: number
  annual_increase_total_insurance: number
  hoa_fee: number
  annual_increase_hoa_fee: number
  maintenance: number
  annual_increase_maintenance: number
  other_costs: number
  annual_increase_other_costs: number

  // Sell
  know_sell_price: boolean
  sell_price: number
  value_appreciation: number
  holding_length: number
  cost_to_sell: number
}

export type TFinancialReportProps = {
  reportId: string
  scenarioId?: string
  initialValues?: TFinancialReportValues
}
export type TScenarioValues = TFinancialReportValues & {
  _id: string
  created: string
}

export type ColumnDef<T> = {
  header: string //header Text
  accessorKey: keyof T //key for how to get the value
  width?: number // column width
  isPinned?: boolean //column pinned state
  prefix?: string
  suffix?: string
}
export type TScenarioCalculations = {
  netIncome: number
  appreciation: number
  rentalRateIncrease: number
}

export type TReportTableData = TScenarioCalculations &
  TScenarioValues & {
    no: number
  }

export type TReportData = TScenarioCalculations & {
  chartData: any
}

export type TChartData = TScenarioCalculations & { name: string }
