'use client'

import {
  CalculatorInput,
  CalculatorSection,
  CalculatorTotalSection,
  ContainerWithPageTitle,
  TCalculatorInputProps
} from '@/components'
import { useMemo, useState } from 'react'

type TFormValues = {
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

const CalculatorPage = () => {
  const [values, setValues] = useState<TFormValues>({
    loanPrincipal: 200000,
    annualPercentageRate: 4,
    loanTerm: 30,
    netOperatingIncome: 30000,
    purchasePrice: 250000,
    rehabCosts: 250000,
    monthlyRentalIncome: 2000,
    annualDebtService: 25000,
    cashOutlay: 50000,
    operatingIncome: 50000,
    renovationValue: 100000,
    estimatedRepairCosts: 50000,
    length: 20,
    width: 15
  })
  const {
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
  } = values

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

  const renderInput = ({
    id,
    label,
    prefix,
    suffix,
    value
  }: TCalculatorInputProps & {
    id: keyof TFormValues
    label: string
    prefix?: string
    suffix?: string
    value: number
  }) => (
    // disable-eslint
    <CalculatorInput
      id={id}
      label={label}
      required
      className="w-fit m-2 flex-1"
      labelClassName="font-semibold"
      inputClassName="text-right"
      prefix={prefix}
      suffix={suffix}
      value={value}
      onValueChange={values => {
        setValues(prevState => ({ ...prevState, [id]: values.floatValue }))
      }}
      valueIsNumericString
    />
  )
  return (
    <ContainerWithPageTitle title="Calculator">
      <CalculatorSection title="Property Information" className="bg-transparent">
        <div className="flex space-x-4 mb-4">
          <h3>Property Address</h3>
          <span>123 Main St, Orange California 92911</span>
        </div>
      </CalculatorSection>
      <form className="flex-col flex-wrap items-stretch mx-auto">
        <CalculatorSection title="" className="flex flex-wrap">
          {renderInput({
            id: 'loanPrincipal',
            label: 'Loan Principal (P)',
            value: loanPrincipal,
            prefix: '$'
          })}
          {renderInput({
            id: 'annualPercentageRate',
            label: 'Annual Percentage Rage',
            value: annualPercentageRate,
            suffix: '%'
          })}
          {renderInput({
            id: 'loanTerm',
            label: 'Loan Term',
            value: loanTerm,
            suffix: ' years'
          })}
          {renderInput({
            id: 'netOperatingIncome',
            label: 'Net Operating Income (NOI)',
            value: netOperatingIncome,
            prefix: '$'
          })}
          {renderInput({
            id: 'monthlyRentalIncome',
            label: 'Monthly Rental Income',
            value: monthlyRentalIncome,
            prefix: '$'
          })}
          {renderInput({
            id: 'purchasePrice',
            label: 'Purchase Price',
            value: purchasePrice,
            prefix: '$'
          })}
          {renderInput({
            id: 'rehabCosts',
            label: 'Rehab Costs',
            value: rehabCosts,
            prefix: '$'
          })}
          {renderInput({
            id: 'annualDebtService',
            label: 'Annual Debt Service',
            value: annualDebtService,
            prefix: '$'
          })}
          {renderInput({
            id: 'cashOutlay',
            label: 'Cash Outlay',
            value: cashOutlay,
            prefix: '$'
          })}
          {renderInput({
            id: 'operatingIncome',
            label: 'Operating Income',
            value: operatingIncome,
            prefix: '$'
          })}
          {renderInput({
            id: 'renovationValue',
            label: 'Renovation Value',
            value: renovationValue,
            prefix: '$'
          })}
          {renderInput({
            id: 'estimatedRepairCosts',
            label: 'Estimated Repair Costs',
            value: estimatedRepairCosts,
            prefix: '$'
          })}
          {renderInput({
            id: 'length',
            label: 'Length',
            value: length,
            suffix: 'ft'
          })}
          {renderInput({
            id: 'width',
            label: 'Width',
            value: width,
            suffix: 'ft'
          })}
        </CalculatorSection>
        <div className="flex-1 flex-col m-2">
          {/* <CalculatorTotalSection
            label="Total Property Price"
            value={totalPropertyPrice}
            prefix="$"
          /> */}
          <CalculatorTotalSection label="Mortgage Payment" value={mortgagePayment} prefix="$" />
          <CalculatorTotalSection
            label="Capitalization Rate"
            value={capitalizationRate}
            suffix="%"
          />
          <CalculatorTotalSection label="Rent Cost Ratio" value={rentCostRatio} suffix="%" />
          <CalculatorTotalSection label="Gross Yield" value={grossYield} suffix="%" />
          <CalculatorTotalSection label="Debt Service Ratio" value={debtServiceRatio} />
          <CalculatorTotalSection label="Cash On Cash Return" value={cashOnCashReturn} suffix="%" />
          <CalculatorTotalSection
            label="The 50% Rule"
            value={probableOperatingExpenses}
            prefix="$"
          />
          <CalculatorTotalSection
            label="After Repair Value (ARV)"
            value={afterRepairValue}
            prefix="$"
          />
          <CalculatorTotalSection label="70% of ARV Rule" value={maximumOfferPrice} prefix="$" />
          <CalculatorTotalSection
            label="Square Footage"
            value={squareFootage}
            suffix=" square feet"
          />
        </div>
      </form>
    </ContainerWithPageTitle>
  )
}

export default CalculatorPage
