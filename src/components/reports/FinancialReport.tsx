'use client'

import {
  Button,
  CalculatorInput,
  CalculatorSection,
  CalculatorTotalSection,
  Input,
  TCalculatorInputProps
} from '@/components'
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'
import useFinancialCalculations from './useFinancialCalculations'
import { TFinancialReportProps, TFinancialReportValues } from './types'
import api from '@/lib/api'
import { useMemo } from 'react'
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const FinancialReport = ({ reportId, scenarioId, initialValues }: TFinancialReportProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState<boolean>(false)
  const isMutating = isPending || loading
  const [values, setValues] = useState<TFinancialReportValues>(
    initialValues || {
      name: '',
      purchase_price: 100000,
      closing_costs: 1500,
      finder_fee_cost: 3000,
      rehab_expense: 35000,
      gross_rental_income: 850,
      maintenance: 10,
      vacancy: 10,
      management: 10,
      capital_expenses: 5,
      annual_taxes: 1800,
      annual_insurance: 1200
    }
  )
  const {
    name,
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
  } = values

  const { totalCashIn, rentalExpenses, grossIncome, netIncome, cocReturn } =
    useFinancialCalculations(values)

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Reports over 30 years'
      }
    }
  }
  const chartData = useMemo(() => {
    const currentYear = new Date().getFullYear()
    const arr = Array.from(Array(30).keys())
    return {
      labels: arr.map(i => currentYear + i),
      datasets: [
        {
          label: 'Net income',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          data: arr.map(i => netIncome * (i + 1))
        },
        {
          label: 'Appreciation',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          data: arr.map(i => purchase_price * Math.pow(vacancy / 100 + 1, i + 1))
        },
        {
          label: 'Rental rate increase * rental income',
          backgroundColor: 'rgba(rgba(123, 135, 132, 0.5)',
          data: arr.map(i => cocReturn * netIncome * (i + 1))
        }
      ]
    }
  }, [cocReturn, netIncome, purchase_price, vacancy])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)

      if (scenarioId)
        await api.put(`/api/reports/${reportId}/scenarios/${scenarioId}`, {
          ...values
        })
      else
        await api.post(`/api/reports/${reportId}/scenarios`, {
          ...values
        })
      startTransition(() => {
        router.refresh()
        if (scenarioId) router.back()
        else router.push(`/reports/${reportId}`)
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

      await api.delete(`/api/reports/${reportId}/scenarios/${scenarioId}`)
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
    <>
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
          <div className="m-4">
            <CalculatorSection title="Purchase Information">
              {renderInput({
                id: 'purchase_price',
                label: 'Purchase Price',
                value: purchase_price,
                prefix: '$'
              })}
              {renderInput({
                id: 'closing_costs',
                label: 'Closing Costs',
                value: closing_costs,
                prefix: '$'
              })}
              {renderInput({
                id: 'finder_fee_cost',
                label: 'Finder Fee Cost',
                value: finder_fee_cost,
                prefix: '$'
              })}
            </CalculatorSection>
            <CalculatorSection title="Rehab Info">
              {renderInput({
                id: 'rehab_expense',
                label: 'Rehab Expense',
                value: rehab_expense,
                prefix: '$'
              })}
            </CalculatorSection>
            <CalculatorTotalSection label="Total Cash In" value={totalCashIn} prefix="$" />
          </div>
          <div className="m-4">
            <CalculatorSection title="Rental Information">
              {renderInput({
                id: 'gross_rental_income',
                label: 'Gross Rental Income',
                value: gross_rental_income,
                prefix: '$'
              })}
            </CalculatorSection>
            <CalculatorSection title="Rental Expenses">
              {renderInput({
                id: 'maintenance',
                label: 'Maintenance',
                value: maintenance,
                suffix: '%'
              })}
              {renderInput({
                id: 'vacancy',
                label: 'Vacancy',
                value: vacancy,
                suffix: '%'
              })}
              {renderInput({
                id: 'management',
                label: 'Property Management',
                value: management,
                suffix: '%'
              })}
              {renderInput({
                id: 'capital_expenses',
                label: 'Capital Expenses',
                value: capital_expenses,
                suffix: '%'
              })}
            </CalculatorSection>
            <CalculatorTotalSection label="Rental Expenses" value={rentalExpenses} prefix="$" />
          </div>
          <div className="m-4">
            <CalculatorSection title="Rental Information">
              {renderInput({
                id: 'annual_taxes',
                label: 'Taxes (Annual)',
                value: annual_taxes,
                prefix: '$'
              })}
              {renderInput({
                id: 'annual_insurance',
                label: 'Property Insurance (Annual)',
                value: annual_insurance,
                prefix: '$'
              })}
            </CalculatorSection>
          </div>
          <div className="m-4">
            <CalculatorSection title="Current">
              <CalculatorTotalSection label="Gross Income" value={grossIncome} prefix="$" />
              <CalculatorTotalSection label="Net Income" value={netIncome} prefix="$" />
              <CalculatorTotalSection label="CoC Return" value={cocReturn} suffix="%" />
            </CalculatorSection>
          </div>
        </div>
      </form>
      <Bar options={chartOptions} data={chartData} />
    </>
  )
}

export default FinancialReport
