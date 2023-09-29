'use client'

import {
  Button,
  CalculatorInput,
  CalculatorSection,
  CalculatorTotalSection,
  TCalculatorInputProps
} from '@/components'
import React, { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import defaultInitialValues from './defaultInitialValues'
import useCashBuyData from './useCashBuyData'
import { TScenarioParams, TCashBuy } from '@/types'
import useCashBuy from '@/providers/reports/useCashBuy'

type TRenderInputProps = TCalculatorInputProps & {
  id: keyof TCashBuy
  label?: string
  prefix?: string
  suffix?: string
  value: number
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const CashBuyCalculator = ({
  reportId,
  scenarioId,
  calculatorId,
  initialValues = defaultInitialValues
}: TScenarioParams & { calculatorId: string; initialValues: TCashBuy }) => {
  const [values, setValues] = useState<TCashBuy>(initialValues)
  const {
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
  } = values
  const { chartData, netIncome, appreciation, rentalRateIncrease } = useCashBuyData(values)
  const { saving, saveCashBuy } = useCashBuy({
    reportId,
    scenarioId,
    type: 'cash_buy',
    calculatorId: calculatorId
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    saveCashBuy(values)
  }
  const renderInput = ({ id, label, prefix, suffix, value }: TRenderInputProps) => (
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
      disabled={saving}
    />
  )
  // const renderInputWithIncrease = (
  //   inputProps: TRenderInputProps,
  //   increaseProps?: TRenderInputProps
  // ) => (
  //   <div className="flex items-end space-x-2">
  //     <div className="flex-auto">{renderInput(inputProps)}</div>
  //     <div className="w-24">{increaseProps && renderInput({ ...increaseProps, suffix: '%' })}</div>
  //   </div>
  // )
  return (
    <>
      <form className="w-fit flex-col space-y-4 m-auto mt-10 relative" onSubmit={handleSubmit}>
        <div className="absolute mt-[-60px] right-0">
          <Button type="submit" loading={saving}>
            {calculatorId ? 'Save' : 'Add'}
          </Button>
        </div>
        <div className="flex flex-wrap mx-auto justify-center">
          <div className="m-4">
            <CalculatorSection title="Purchase Information">
              {renderInput({
                id: 'purchase_price',
                label: 'Purchase Price',
                value: purchase_price,
                prefix: '$'
              })}
            </CalculatorSection>
            <CalculatorSection title="Rental Information">
              {renderInput({
                id: 'gross_annual_income',
                label: 'Gross Annual Income',
                value: gross_annual_income,
                prefix: '$'
              })}
              {renderInput({
                id: 'rental_increase',
                label: 'Annual Rental Rate Increase',
                value: rental_increase,
                suffix: '%'
              })}
              {renderInput({
                id: 'expenses_increase',
                label: 'Annual Expenses Rate Increase',
                value: expenses_increase,
                suffix: '%'
              })}
            </CalculatorSection>
          </div>
          <div className="m-4">
            <CalculatorSection title="Rental Expenses">
              {renderInput({
                id: 'maintenance_rate',
                label: 'Maintenance Expense Rate',
                value: maintenance_rate,
                suffix: '%'
              })}
              {renderInput({
                id: 'vacancy_rate',
                label: 'Vacancy Rate',
                value: vacancy_rate,
                suffix: '%'
              })}
              {renderInput({
                id: 'management_rate',
                label: 'Property Management',
                value: management_rate,
                suffix: '%'
              })}
              {renderInput({
                id: 'capital_rate',
                label: 'Capital Expenses',
                value: capital_rate,
                suffix: '%'
              })}
            </CalculatorSection>
          </div>
          <div className="m-4">
            <CalculatorSection title="Property Expenses">
              {renderInput({
                id: 'tax_rate',
                label: 'Annual Taxes Rate',
                value: tax_rate,
                suffix: '%'
              })}
              {renderInput({
                id: 'insurance_rate',
                label: 'Annual Insurance Rate',
                value: insurance_rate,
                suffix: '%'
              })}
              {renderInput({
                id: 'appreciation_rate',
                label: 'Appreciation Rate',
                value: appreciation_rate,
                suffix: '%'
              })}
            </CalculatorSection>
            <CalculatorSection title="Current">
              <CalculatorTotalSection label="Net Income" value={netIncome} prefix="$" />
              <CalculatorTotalSection label="Appreciation" value={appreciation} prefix="$" />
              <CalculatorTotalSection
                label="Rental Rate Increase"
                value={rentalRateIncrease}
                prefix="$"
              />
            </CalculatorSection>
          </div>
        </div>
      </form>
      <div className="space-y-6 w-full">
        {chartData.map((values: any) => (
          <Bar key={values.options.plugins.title.text} {...values} className="w-full" />
        ))}
      </div>
    </>
  )
}

export default CashBuyCalculator
