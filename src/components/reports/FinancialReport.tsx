'use client'

import {
  Button,
  CalculatorInput,
  CalculatorSection,
  CalculatorTotalSection,
  Input,
  TCalculatorInputProps
} from '@/components'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'
import useFinancialCalculations from './useFinancialCalculations'
import { TFinancialReportProps, TFinancialReportValues } from './types'

const FinancialReport = ({ calculationId, scenarioId, initialValues }: TFinancialReportProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState<boolean>(false)
  const isMutating = isPending || loading
  const [values, setValues] = useState<TFinancialReportValues>(
    initialValues || {
      name: '',
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
    }
  )
  const {
    name,
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

  const {
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
  } = useFinancialCalculations(values)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)

      let response: any
      if (scenarioId)
        response = await axios.put(`/api/calculations/${calculationId}/scenarios/${scenarioId}`, {
          ...values
        })
      else
        response = await axios.post(`/api/calculations/${calculationId}/scenarios`, {
          ...values
        })
      console.log('successfully saved', response.data)
      startTransition(() => {
        router.refresh()
        if (scenarioId) router.back()
        else router.push(`/calculations/${calculationId}`)
      })
    } catch (error: any) {
      console.log('Save failed', error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      setLoading(true)

      const response = await axios.delete(
        `/api/calculations/${calculationId}/scenarios/${scenarioId}`
      )
      console.log(response)
      startTransition(() => {
        router.refresh()
        router.back()
      })
    } catch (error: any) {
      console.log('Save failed', error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  const renderInput = ({
    id,
    label,
    prefix,
    suffix,
    value
  }: TCalculatorInputProps & {
    id: keyof TFinancialReportValues
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
      prefix={prefix}
      suffix={suffix}
      value={value}
      onValueChange={values => {
        setValues(prevState => ({ ...prevState, [id]: values.floatValue }))
      }}
      valueIsNumericString
      disabled={isMutating}
    />
  )
  return (
    <form className="w-fit flex-col space-y-4 m-auto mt-10" onSubmit={handleSubmit}>
      <div className="flex space-x-4 items-end mx-2">
        <Input
          label="Scenario Name"
          id="name"
          value={name}
          onChange={e => setValues(prevState => ({ ...prevState, name: e.target.value }))}
        />
        <Button type="submit" loading={isMutating}>
          Save
        </Button>
        {scenarioId && (
          <Button type="button" loading={isMutating} onClick={handleRemove}>
            Delete
          </Button>
        )}
      </div>
      <div className="flex flex-wrap mx-auto justify-center">
        <CalculatorSection title="Property Details" className="flex flex-wrap w-fit m-2">
          <div className="m-2">
            {renderInput({
              id: 'loanPrincipal',
              label: 'Loan Principal (P)',
              value: loanPrincipal,
              prefix: '$'
            })}
            {renderInput({
              id: 'annualPercentageRate',
              label: 'Annual Percentage Rate',
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
          </div>
          <div className="m-2">
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
          </div>
        </CalculatorSection>
        <CalculatorSection title="Pro Forma Calculations" className="flex-col m-2 !bg-slate-300">
          <CalculatorTotalSection label="1. Mortgage Payment" value={mortgagePayment} prefix="$" />
          <CalculatorTotalSection
            label="2. Capitalization Rate"
            value={capitalizationRate}
            suffix="%"
          />
          <CalculatorTotalSection label="3. Rent Cost Ratio" value={rentCostRatio} suffix="%" />
          <CalculatorTotalSection label="4. Gross Yield" value={grossYield} suffix="%" />
          <CalculatorTotalSection label="5. Debt Service Ratio" value={debtServiceRatio} />
          <CalculatorTotalSection
            label="6. Cash On Cash Return"
            value={cashOnCashReturn}
            suffix="%"
          />
          <CalculatorTotalSection
            label="7. The 50% Rule"
            value={probableOperatingExpenses}
            prefix="$"
          />
          <CalculatorTotalSection
            label="8. After Repair Value (ARV)"
            value={afterRepairValue}
            prefix="$"
          />
          <CalculatorTotalSection label="9. 70% of ARV Rule" value={maximumOfferPrice} prefix="$" />
          <CalculatorTotalSection
            label="10. Square Footage"
            value={squareFootage}
            suffix=" square feet"
          />
        </CalculatorSection>
      </div>
    </form>
  )
}

export default FinancialReport
