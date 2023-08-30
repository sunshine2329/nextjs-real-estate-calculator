import { useMemo } from 'react'
import { TFinancialReportValues } from './types'

const useFinancialCalculations = ({
  purchase_price,
  closing_costs,
  finder_fee_cost,
  rehab_expense,
  gross_rental_income,
  maintenance,
  vacancy,
  management,
  capital_expenses,
  annual_taxes,
  annual_insurance
}: TFinancialReportValues) => {
  const totalCashIn = useMemo(
    () => purchase_price + closing_costs + finder_fee_cost + rehab_expense,
    [closing_costs, finder_fee_cost, purchase_price, rehab_expense]
  )
  const rentalExpenses = useMemo(
    () => (gross_rental_income * (maintenance + vacancy + management + capital_expenses)) / 100,
    [capital_expenses, gross_rental_income, maintenance, management, vacancy]
  )
  const grossIncome = useMemo(() => gross_rental_income * 12, [gross_rental_income])
  const netIncome = useMemo(
    () => grossIncome - rentalExpenses * 12 - annual_taxes - annual_insurance,
    [annual_insurance, annual_taxes, grossIncome, rentalExpenses]
  )
  const cocReturn = useMemo(() => (netIncome / totalCashIn) * 100, [netIncome, totalCashIn])
  return { totalCashIn, rentalExpenses, grossIncome, netIncome, cocReturn }
}

export default useFinancialCalculations
