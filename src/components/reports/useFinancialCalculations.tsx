import { useMemo } from 'react'
import { TFinancialReportValues } from './types'

const useFinancialCalculations = ({
  loanPrincipal,
  annualPercentageRate,
  loanTerm,
  netOperatingIncome,
  purchasePrice,
  rehabCosts,
  monthlyRentalIncome,
  annualDebtService,
  cashOutlay,
  operatingIncome,
  renovationValue,
  estimatedRepairCosts,
  length,
  width
}: TFinancialReportValues) => {
  const mortgagePayment = useMemo(() => {
    const monthlyInterestRate = annualPercentageRate / 12
    const numberOfMonthlyPayments = loanTerm * 12
    const multiplicative = Math.pow(1 + monthlyInterestRate, numberOfMonthlyPayments)
    return loanPrincipal * ((monthlyInterestRate * multiplicative) / (multiplicative - 1))
  }, [annualPercentageRate, loanPrincipal, loanTerm])

  const totalPropertyPrice = useMemo(() => purchasePrice + rehabCosts, [purchasePrice, rehabCosts])
  const capitalizationRate = useMemo(() => {
    return (netOperatingIncome / totalPropertyPrice) * 100
  }, [netOperatingIncome, totalPropertyPrice])
  const rentCostRatio = useMemo(
    () => (monthlyRentalIncome / totalPropertyPrice) * 100,
    [monthlyRentalIncome, totalPropertyPrice]
  )
  const annualRentalIncome = useMemo(() => monthlyRentalIncome * 12, [monthlyRentalIncome])
  const grossYield = useMemo(
    () => (annualRentalIncome / totalPropertyPrice) * 100,
    [annualRentalIncome, totalPropertyPrice]
  )
  const debtServiceRatio = useMemo(
    () => netOperatingIncome / annualDebtService,
    [annualDebtService, netOperatingIncome]
  )
  const annualCashFlow = useMemo(
    () => netOperatingIncome - annualDebtService,
    [annualDebtService, netOperatingIncome]
  )
  const cashOnCashReturn = useMemo(
    () => (annualCashFlow / cashOutlay) * 100,
    [annualCashFlow, cashOutlay]
  )
  const probableOperatingExpenses = useMemo(() => operatingIncome * 0.5, [operatingIncome])
  const afterRepairValue = useMemo(
    () => purchasePrice + renovationValue,
    [purchasePrice, renovationValue]
  )
  const maximumOfferPrice = useMemo(
    () => afterRepairValue * 0.7 - estimatedRepairCosts,
    [afterRepairValue, estimatedRepairCosts]
  )
  const squareFootage = useMemo(() => length * width, [length, width])

  return {
    mortgagePayment,
    capitalizationRate,
    rentCostRatio,
    grossYield,
    debtServiceRatio,
    cashOnCashReturn,
    probableOperatingExpenses,
    afterRepairValue,
    maximumOfferPrice,
    squareFootage
  }
}

export default useFinancialCalculations
