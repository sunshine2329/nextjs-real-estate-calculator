export type TFinancialReportValues = {
  name: string
  purchase_price: number
  closing_costs: number
  finder_fee_cost: number
  rehab_expense: number
  gross_rental_income: number
  maintenance: number
  vacancy: number
  management: number
  capital_expenses: number
  annual_taxes: number
  annual_insurance: number
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
  width: number // column width
  isPinned?: boolean //column pinned state
  prefix?: string
  suffix?: string
}

export type TReportColumns = TScenarioValues & {
  no: number
  totalCashIn: number
  rentalExpenses: number
  grossIncome: number
  netIncome: number
  cocReturn: number
}
