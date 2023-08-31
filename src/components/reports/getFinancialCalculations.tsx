import { TFinancialReportValues } from './types'

const getFinancialCalculations = (
  {
    purchase_price,
    gross_annual_income,
    rental_increase,
    expenses_increase,
    tax_rate,
    insurance_rate,
    maintenance_rate,
    management_rate,
    vacancy_rate,
    capital_rate,
    appreciation_rate
  }: TFinancialReportValues,
  years: number = 0
) => {
  const grossIncome = gross_annual_income * Math.pow(1 + rental_increase / 100, years)
  const totalExpenses =
    (purchase_price * ((insurance_rate + tax_rate) / 100) +
      gross_annual_income *
        ((maintenance_rate + management_rate + vacancy_rate + capital_rate) / 100)) *
    Math.pow(1 + expenses_increase / 100, years)
  const netIncome = grossIncome - totalExpenses
  const appreciation = purchase_price * Math.pow(1 + appreciation_rate / 100, years)
  const totalRentalIncrease = Array.from(Array(years + 1).keys())
    .map(i => Math.pow(1 + rental_increase / 100, i))
    .reduce((total: number, value: number) => total + value, 0)
  const rentalIncome = gross_annual_income * (totalRentalIncrease - years)
  return { netIncome, appreciation, rentalIncome }
}

export default getFinancialCalculations
