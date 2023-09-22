'use client'

import {
  Button,
  CalculatorInput,
  CalculatorSection,
  CalculatorSubSection,
  CalculatorTotalSection,
  Input,
  TCalculatorInputProps
} from '@/components'
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'
import { TFinancialReportProps, TFinancialReportValues } from './types'
import api from '@/lib/api'
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
import useReportData from './useReportData'

type TRenderInputProps = TCalculatorInputProps & {
  id: keyof TFinancialReportValues
  label?: string
  prefix?: string
  suffix?: string
  value: number
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const FinancialScenario = ({
  reportId,
  scenarioId,
  initialValues = defaultInitialValues
}: TFinancialReportProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState<boolean>(false)
  const isMutating = isPending || loading
  const [values, setValues] = useState<TFinancialReportValues>(initialValues)
  const {
    name,
    purchase_price,
    use_loan,
    down_payment,
    interest_rate,
    loan_term,
    closing_cost,
    need_repairs,
    repair_cost,
    value_after_repairs,

    // Income
    monthly_rent,
    annual_increase_monthly_rent,
    other_monthly_income,
    annual_increase_other_monthly_income,
    vacancy_rate,
    management_fee,

    // Recurring Operating Expenses
    property_tax,
    annual_increase_property_tax,
    total_insurance,
    annual_increase_total_insurance,
    hoa_fee,
    annual_increase_hoa_fee,
    maintenance,
    annual_increase_maintenance,
    other_costs,
    annual_increase_other_costs,

    // Sell
    know_sell_price,
    sell_price,
    value_appreciation,
    holding_length,
    cost_to_sell
  } = values

  const { chartData, netIncome, appreciation, rentalRateIncrease } = useReportData(values)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const data = { ...values }
      if (!data.use_loan) {
        data.down_payment = 0
        data.interest_rate = 0
        data.loan_term = 0
      }
      if (!data.need_repairs) {
        data.repair_cost = 0
        data.value_after_repairs = 0
      }

      if (data.know_sell_price) {
        data.value_appreciation = 0
      } else {
        data.sell_price = 0
      }
      if (scenarioId)
        await api.put(`/api/reports/${reportId}/scenarios/${scenarioId}`, {
          ...data
        })
      else
        await api.post(`/api/reports/${reportId}/scenarios`, {
          ...data
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
      disabled={isMutating}
    />
  )
  const renderInputWithIncrease = (
    inputProps: TRenderInputProps,
    increaseProps?: TRenderInputProps
  ) => (
    <div className="flex items-end space-x-2">
      <div className="flex-auto">{renderInput(inputProps)}</div>
      <div className="w-24">{increaseProps && renderInput({ ...increaseProps, suffix: '%' })}</div>
    </div>
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
              <CalculatorSubSection
                label="Use Loan?"
                checked={use_loan}
                onChange={(value: boolean) => {
                  setValues(prevState => ({ ...prevState, use_loan: value }))
                }}
              >
                {use_loan && (
                  <>
                    {renderInput({
                      id: 'down_payment',
                      label: 'Down Payment',
                      value: down_payment,
                      suffix: '%'
                    })}
                    {renderInput({
                      id: 'interest_rate',
                      label: 'Interest Rate',
                      value: interest_rate,
                      suffix: '%'
                    })}
                    {renderInput({
                      id: 'loan_term',
                      label: 'Loan Term',
                      value: loan_term,
                      suffix: ' years'
                    })}
                  </>
                )}
              </CalculatorSubSection>
              {renderInput({
                id: 'closing_cost',
                label: 'Closing Cost',
                value: closing_cost,
                prefix: '$'
              })}
              <CalculatorSubSection
                label="Need Repairs?"
                checked={need_repairs}
                onChange={(value: boolean) => {
                  setValues(prevState => ({ ...prevState, need_repairs: value }))
                }}
              >
                {need_repairs && (
                  <>
                    {renderInput({
                      id: 'repair_cost',
                      label: 'Repair Cost',
                      value: repair_cost,
                      prefix: '$'
                    })}
                    {renderInput({
                      id: 'value_after_repairs',
                      label: 'Value After Repairs',
                      value: value_after_repairs,
                      prefix: '$'
                    })}
                  </>
                )}
              </CalculatorSubSection>
            </CalculatorSection>
          </div>
          <div className="m-4">
            <CalculatorSection title="Income">
              {renderInputWithIncrease(
                {
                  id: 'monthly_rent',
                  label: 'Monthly Rent',
                  value: monthly_rent,
                  prefix: '$'
                },
                {
                  id: 'annual_increase_monthly_rent',
                  label: 'Annual Increase',
                  value: annual_increase_monthly_rent
                }
              )}
              {renderInputWithIncrease(
                {
                  id: 'other_monthly_income',
                  label: 'Other Monthly Income',
                  value: other_monthly_income,
                  prefix: '$'
                },
                {
                  id: 'annual_increase_other_monthly_income',
                  value: annual_increase_other_monthly_income
                }
              )}
              {renderInputWithIncrease({
                id: 'vacancy_rate',
                label: 'Vacancy Rate',
                value: vacancy_rate,
                suffix: '%'
              })}
              {renderInputWithIncrease({
                id: 'management_fee',
                label: 'Management Fee',
                value: management_fee,
                suffix: '%'
              })}
            </CalculatorSection>
          </div>
          <div className="m-4">
            <CalculatorSection title="Annual Expenses">
              {renderInputWithIncrease(
                {
                  id: 'property_tax',
                  label: 'Property Tax',
                  value: property_tax,
                  prefix: '$'
                },
                {
                  id: 'annual_increase_property_tax',
                  label: 'Annual Increase',
                  value: annual_increase_property_tax
                }
              )}
              {renderInputWithIncrease(
                {
                  id: 'total_insurance',
                  label: 'Total Insurance',
                  value: total_insurance,
                  prefix: '$'
                },
                {
                  id: 'annual_increase_total_insurance',
                  value: annual_increase_total_insurance
                }
              )}
              {renderInputWithIncrease(
                {
                  id: 'hoa_fee',
                  label: 'HOA Fee',
                  value: hoa_fee,
                  prefix: '$'
                },
                {
                  id: 'annual_increase_hoa_fee',
                  value: annual_increase_hoa_fee
                }
              )}
              {renderInputWithIncrease(
                {
                  id: 'maintenance',
                  label: 'Maintenance',
                  value: maintenance,
                  prefix: '$'
                },
                {
                  id: 'annual_increase_maintenance',
                  value: annual_increase_maintenance
                }
              )}
              {renderInputWithIncrease(
                {
                  id: 'other_costs',
                  label: 'Other Costs',
                  value: other_costs,
                  prefix: '$'
                },
                {
                  id: 'annual_increase_other_costs',
                  value: annual_increase_other_costs
                }
              )}
            </CalculatorSection>
          </div>

          <div className="m-4">
            <CalculatorSection title="Sell">
              <CalculatorSubSection
                label="Do You Know the Sell Price?"
                checked={know_sell_price}
                onChange={(value: boolean) => {
                  setValues(prevState => ({ ...prevState, know_sell_price: value }))
                }}
              />
              {know_sell_price &&
                renderInput({
                  id: 'sell_price',
                  label: 'Sell Price',
                  value: sell_price,
                  prefix: '$'
                })}
              {!know_sell_price &&
                renderInput({
                  id: 'value_appreciation',
                  label: 'Value Appreciation(Per Year)',
                  value: value_appreciation,
                  suffix: '%'
                })}
              {renderInput({
                id: 'holding_length',
                label: 'Holding Length',
                value: holding_length,
                suffix: ' years'
              })}
              {renderInput({
                id: 'cost_to_sell',
                label: 'Cost to Sell',
                value: cost_to_sell,
                suffix: '%'
              })}
            </CalculatorSection>
          </div>
          <div className="m-4">
            <CalculatorSection title={`For ${holding_length || 1} years`}>
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

export default FinancialScenario
