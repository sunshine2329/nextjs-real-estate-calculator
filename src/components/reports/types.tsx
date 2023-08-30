export type TFinancialReportValues = {
  name: string
  loanPrincipal: number
  annualPercentageRate: number
  loanTerm: number
  netOperatingIncome: number
  purchasePrice: number
  rehabCosts: number
  monthlyRentalIncome: number
  annualDebtService: number
  cashOutlay: number
  operatingIncome: number
  renovationValue: number
  estimatedRepairCosts: number
  length: number
  width: number
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
  mortgagePayment: string
  capitalizationRate: string
  rentCostRatio: string
  grossYield: string
  debtServiceRatio: string
  cashOnCashReturn: string
  probableOperatingExpenses: string
  afterRepairValue: string
  maximumOfferPrice: string
  squareFootage: string
}
