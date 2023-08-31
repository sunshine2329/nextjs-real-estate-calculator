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
import getFinancialCalculations from './getFinancialCalculations'
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
      gross_annual_income: 12000,
      rental_increase: 2,
      expenses_increase: 3,
      tax_rate: 3,
      insurance_rate: 0.5,
      maintenance_rate: 10,
      management_rate: 10,
      vacancy_rate: 10,
      capital_rate: 5,
      appreciation_rate: 3
    }
  )
  const {
    name,
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

  const { chartData, netIncome, appreciation, rentalIncome } = useMemo(() => {
    const currentYear = new Date().getFullYear()
    const arr = Array.from(Array(30).keys())
    const data = arr.map(i => getFinancialCalculations(values, i))
    const chartOptions = (title: string) => ({
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const
        },
        title: {
          display: true,
          text: title
        }
      }
    })
    const labels = arr.map(i => currentYear + i)
    const chartData = [
      {
        options: chartOptions('Real estate calculation over 30 years'),
        data: {
          labels,
          datasets: [
            {
              label: 'Net income over 30 years',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              data: data.map(({ netIncome }) => netIncome)
            },
            {
              label: 'Appreciation over 30 years',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
              data: data.map(({ appreciation }) => appreciation)
            },
            {
              label: 'Rental Income over 30 years',
              backgroundColor: 'rgba(rgba(123, 135, 132, 0.5)',
              data: data.map(({ rentalIncome }) => rentalIncome)
            }
          ]
        }
      }
    ]
    return { chartData, ...getFinancialCalculations(values) }
  }, [values])

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
              <CalculatorTotalSection label="Rental Income" value={rentalIncome} prefix="$" />
            </CalculatorSection>
          </div>
        </div>
      </form>
      <div className="space-y-6">
        {chartData.map(values => (
          <Bar key={values.options.plugins.title.text} {...values} />
        ))}
      </div>
    </>
  )
}

export default FinancialReport
