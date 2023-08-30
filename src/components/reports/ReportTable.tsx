'use client'

import { useState } from 'react'
import classNames from 'classnames'
import { ColumnDef, TReportColumns, TScenarioValues } from './types'
import FinancialReportItem from './FinancialReportItem'

const defaultColumns: ColumnDef<TReportColumns>[] = [
  {
    header: 'No',
    accessorKey: 'no',
    width: 40,
    isPinned: true
  },
  {
    header: 'Scenario Name',
    accessorKey: 'name',
    width: 120,
    isPinned: true
  },
  {
    header: 'Purchase Price',
    accessorKey: 'purchase_price',
    width: 150,
    prefix: '$'
  },
  {
    header: 'Closing Costs',
    accessorKey: 'closing_costs',
    width: 200,
    prefix: '$'
  },
  {
    header: 'Finder Fee Cost',
    accessorKey: 'finder_fee_cost',
    width: 80,
    prefix: '$'
  },
  {
    header: 'Rehab Expense',
    accessorKey: 'rehab_expense',
    width: 180,
    prefix: '$'
  },
  {
    header: 'Total Cash In',
    accessorKey: 'totalCashIn',
    width: 180,
    prefix: '$'
  },
  {
    header: 'Gross Rental Income',
    accessorKey: 'gross_rental_income',
    width: 150,
    prefix: '$'
  },
  {
    header: 'Maintenance',
    accessorKey: 'maintenance',
    width: 80,
    suffix: '%'
  },
  {
    header: 'Vacancy',
    accessorKey: 'vacancy',
    width: 150,
    suffix: '%'
  },
  {
    header: 'Property Management',
    accessorKey: 'management',
    width: 100,
    suffix: '%'
  },
  {
    header: 'Capital Expenses',
    accessorKey: 'capital_expenses',
    width: 120,
    suffix: '%'
  },
  {
    header: 'Rental Expenses',
    accessorKey: 'rentalExpenses',
    width: 150,
    prefix: '$'
  },
  {
    header: 'Taxes (Annual)',
    accessorKey: 'annual_taxes',
    width: 180,
    prefix: '$'
  },
  {
    header: 'Property Insurance (Annual)',
    accessorKey: 'annual_insurance',
    width: 80,
    prefix: '$'
  },
  {
    header: 'Gross Income',
    accessorKey: 'grossIncome',
    width: 80,
    prefix: '$'
  },
  {
    header: 'Net Income',
    accessorKey: 'netIncome',
    width: 120,
    prefix: '$'
  },
  {
    header: 'CoC Renturn',
    accessorKey: 'cocReturn',
    width: 150,
    suffix: '%'
  }
]

type TReportTableProps = {
  reportId: string
  scenarios: TScenarioValues[]
}
const ReportTable = ({ reportId, scenarios = [] }: TReportTableProps) => {
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
      return curr + column.width
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
          {scenarios.map((item: TScenarioValues, index: number) => (
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
