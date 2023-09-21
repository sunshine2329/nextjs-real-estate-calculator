'use client'

import { useState } from 'react'
import classNames from 'classnames'
import { ColumnDef, TReportTableData } from './types'
import FinancialReportItem from './FinancialReportItem'

const defaultColumns: ColumnDef<TReportTableData>[] = [
  {
    header: 'No',
    accessorKey: 'no',
    isPinned: true,
    width: 40
  },
  {
    header: 'Scenario Name',
    accessorKey: 'name',
    isPinned: true,
    width: 291
  },
  {
    header: 'Purchase Price',
    accessorKey: 'purchase_price',
    prefix: '$',
    width: 135
  },
  {
    header: 'Down Payment',
    accessorKey: 'down_payment',
    suffix: '%',
    width: 135
  },
  {
    header: 'Interest Rate',
    accessorKey: 'interest_rate',
    suffix: '%',
    width: 118
  },
  {
    header: 'Loan Term',
    accessorKey: 'loan_term',
    suffix: 'years',
    width: 103
  },
  {
    header: 'Closing Cost',
    accessorKey: 'closing_cost',
    prefix: '$',
    width: 118
  },
  {
    header: 'Repair Cost',
    accessorKey: 'repair_cost',
    prefix: '$',
    width: 109
  },
  {
    header: 'Value after Repairs',
    accessorKey: 'value_after_repairs',
    prefix: '$',
    width: 166
  },
  {
    header: 'Monthly Rent',
    accessorKey: 'monthly_rent',
    prefix: '$',
    width: 122
  },
  {
    header: 'Other Monthly Income',
    accessorKey: 'other_monthly_income',
    prefix: '$',
    width: 193
  },
  {
    header: 'Vacancy Rate',
    accessorKey: 'vacancy_rate',
    suffix: '%',
    width: 125
  },
  {
    header: 'Management Fee',
    accessorKey: 'management_fee',
    suffix: '%',
    width: 153
  },
  {
    header: 'Property Tax',
    accessorKey: 'property_tax',
    prefix: '$',
    width: 120
  },
  {
    header: 'Total Insurance',
    accessorKey: 'total_insurance',
    prefix: '$',
    width: 140
  },
  {
    header: 'Maintenance',
    accessorKey: 'maintenance',
    prefix: '$',
    width: 121
  },
  {
    header: 'Other Costs',
    accessorKey: 'other_costs',
    prefix: '$',
    width: 113
  },
  {
    header: 'Sell Price',
    accessorKey: 'sell_price',
    prefix: '$',
    width: 91
  },
  {
    header: 'Value Appreciation',
    accessorKey: 'value_appreciation',
    suffix: '%',
    width: 168
  },
  {
    header: 'Cost to Sell',
    accessorKey: 'cost_to_sell',
    suffix: '%',
    width: 108
  },
  {
    header: 'Net Income Over 30 years',
    accessorKey: 'netIncome',
    prefix: '$',
    width: 221
  },
  {
    header: 'Appreciation over 30 years',
    accessorKey: 'appreciation',
    prefix: '$',
    width: 231
  },
  {
    header: 'Rental Rate Increase over 30 years',
    accessorKey: 'rentalRateIncrease',
    prefix: '$',
    width: 290
  }
]

const ReportTable = ({ reportId, data = [] }: { reportId: string; data: TReportTableData[] }) => {
  const [columns, setColumns] = useState([...defaultColumns])

  const onPinColumn = (accessorKey: string, isPinned: boolean = false) => {
    const newCols = columns.map(col => {
      if (col.accessorKey === accessorKey) {
        return {
          ...col,
          isPinned
        }
      }
      return col
    })

    newCols.sort((a, b) => {
      const aPinned = a.isPinned ? 1 : 0
      const bPinned = b.isPinned ? 1 : 0
      return bPinned - aPinned
    })
    return setColumns([...newCols])
  }
  const getLeftStickyPos = (index: number) => {
    if (!index) return 0

    const prevColumnsTotalWidth = columns.slice(0, index).reduce((curr, column) => {
      return curr + column.width!
    }, 0)
    return prevColumnsTotalWidth
  }
  return (
    <div className="w-full relative overflow-hidden pb-4">
      <table className="table-auto w-full overflow-auto block">
        <thead className="sticky border-collapse border border-slate-400">
          <tr>
            {columns.map((col, i) => {
              return (
                <th
                  className={classNames({
                    'p-2 text-left whitespace-nowrap border border-slate-300 w-full': true,
                    'bg-indigo-500': !col.isPinned,
                    'sticky bg-indigo-900 text-indigo-50': col.isPinned
                  })}
                  style={{
                    left: getLeftStickyPos(i),
                    width: col.width
                  }}
                  key={col.header}
                  onClick={() => onPinColumn(col.accessorKey, !col.isPinned)}
                >
                  {col.header}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item: TReportTableData, index: number) => (
            <FinancialReportItem
              key={item._id}
              data={item}
              reportId={reportId}
              index={index + 1}
              columns={columns}
              getLeftStickyPos={getLeftStickyPos}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReportTable
