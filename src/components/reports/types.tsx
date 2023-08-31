export type TFinancialReportValues = {
  name: string
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
  netIncome: number
  appreciation: number
  rentalIncome: number
}
