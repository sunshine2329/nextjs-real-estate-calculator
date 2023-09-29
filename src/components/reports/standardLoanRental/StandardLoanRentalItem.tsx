'use client'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import classNames from 'classnames'
import { isNumber } from 'lodash'
import { ColumnDef, TStandardLoanRentalTableData } from '@/types'

const StandardLoanRentalItem = ({
  reportId,
  index,
  data,
  columns,
  getLeftStickyPos
}: {
  reportId: string
  index: number
  data: TStandardLoanRentalTableData
  columns: ColumnDef<TStandardLoanRentalTableData>[]
  getLeftStickyPos: (index: number) => number
}) => {
  const values = useMemo(() => {
    const result = { ...data } as any
    if (!result.use_loan) {
      result.down_payment = ''
      result.interest_rate = ''
      result.loan_term = ''
    }
    if (!result.need_repairs) {
      result.repair_cost = ''
      result.value_after_repairs = ''
    }

    result.monthly_rent = result.monthly_rent
      ? `${result.monthly_rent.toFixed(2)} (${result.annual_increase_monthly_rent.toFixed(2)}%)`
      : ''
    result.other_monthly_income = result.other_monthly_income
      ? `${result.other_monthly_income.toFixed(2)} (${
          result.annual_increase_other_monthly_income
        }%)`
      : ''

    result.property_tax = result.property_tax
      ? `${result.property_tax.toFixed(2)} (${result.annual_increase_property_tax}%)`
      : ''
    result.total_insurance = result.total_insurance
      ? `${result.total_insurance.toFixed(2)} (${result.annual_increase_total_insurance}%)`
      : ''
    result.hoa_fee = result.hoa_fee
      ? `${result.hoa_fee.toFixed(2)} (${result.annual_increase_hoa_fee}%)`
      : ''
    result.maintenance = result.maintenance
      ? `${result.maintenance.toFixed(2)} (${result.annual_increase_maintenance}%)`
      : ''
    result.other_costs = result.other_costs
      ? `${result.other_costs.toFixed(2)} (${result.annual_increase_other_costs}%)`
      : ''

    if (result.know_sell_price) {
      result.value_appreciation = ''
    } else {
      result.sell_price = ''
    }
    return result
  }, [data])

  const router = useRouter()
  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    router.push(`/reports/${reportId}/scenarios/${data._id}`)
  }
  return (
    <tr key={index} className="text-left cursor-pointer" onClick={handleClick}>
      {columns.map((col, i) => {
        const accessorKey = col.accessorKey
        const value = values[accessorKey]
        const number = isNumber(value)
        return (
          <td
            className={classNames({
              'p-2 whitespace-nowrap border border-slate-300 w-full': true,
              'sticky bg-indigo-200': col.isPinned,
              'text-right': number
            })}
            style={{
              left: getLeftStickyPos(i),
              width: col.width
            }}
            key={col.header}
          >
            {col.prefix}
            {number && accessorKey !== 'no' ? value.toFixed(2) : value}
            {col.suffix}
          </td>
        )
      })}
    </tr>
  )
}

export default StandardLoanRentalItem
