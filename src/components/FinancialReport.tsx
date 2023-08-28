'use client'

import {
  CalculatorInput,
  CalculatorSection,
  CalculatorTotalSection,
  TCalculatorInputProps
} from '@/components'
import { useMemo, useState } from 'react'
import classNames from 'classnames'
export type TFinancialReportFormValues = {
  marketValue: number
  rentalIncome: number
  maintenanceCosts: number
  propertyTaxes: number
  insurance: number
  vacancyRate: number
}
type TFinancialReportProps = {
  className?: string
  title: string
  initialValues: TFinancialReportFormValues
}
const FinancialReport = ({ className, title, initialValues }: TFinancialReportProps) => {
  const [values, setValues] = useState<TFinancialReportFormValues>(initialValues)
  const { marketValue, rentalIncome, maintenanceCosts, propertyTaxes, insurance, vacancyRate } =
    values

  const effectiveRentalIncome = useMemo(
    () => rentalIncome * (1 - vacancyRate / 100),
    [rentalIncome, vacancyRate]
  )
  const noi = useMemo(
    () => effectiveRentalIncome - maintenanceCosts - propertyTaxes - insurance,
    [effectiveRentalIncome, insurance, maintenanceCosts, propertyTaxes]
  )
  const grossYield = useMemo(() => (noi / marketValue) * 100, [marketValue, noi])
  const capRate = useMemo(
    () => (effectiveRentalIncome / marketValue) * 100,
    [marketValue, effectiveRentalIncome]
  )
  const renderInput = ({
    id,
    label,
    prefix,
    suffix,
    value
  }: TCalculatorInputProps & {
    id: keyof TFinancialReportFormValues
    label: string
    prefix?: string
    suffix?: string
    value: number
  }) => (
    <CalculatorInput
      id={id}
      label={label}
      required
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
    <form className={classNames('flex m-2', className)}>
      <CalculatorSection title={title}>
        {renderInput({
          id: 'marketValue',
          label: 'Market Value',
          value: marketValue,
          prefix: '$'
        })}
        {renderInput({
          id: 'rentalIncome',
          label: 'Rental Income',
          value: rentalIncome,
          prefix: '$'
        })}
        {renderInput({
          id: 'vacancyRate',
          label: 'Vacancy Rate (%)',
          value: vacancyRate,
          suffix: '%'
        })}
        <CalculatorTotalSection
          label="Effective Rental Income"
          value={effectiveRentalIncome}
          prefix="$"
        />
        {renderInput({
          id: 'maintenanceCosts',
          label: 'Maintenance Costs',
          value: maintenanceCosts,
          prefix: '$'
        })}
        {renderInput({
          id: 'propertyTaxes',
          label: 'Property Taxes',
          value: propertyTaxes,
          prefix: '$'
        })}
        {renderInput({
          id: 'insurance',
          label: 'Insurance',
          value: insurance,
          prefix: '$'
        })}
        <CalculatorTotalSection label="Net Operating Income (NOI)" value={noi} prefix="$" />
        <CalculatorTotalSection label="Gross Yield (%)" value={grossYield} suffix="%" />
        <CalculatorTotalSection label="Cap Rate (%)" value={capRate} suffix="%" />
      </CalculatorSection>
    </form>
  )
}

export default FinancialReport
