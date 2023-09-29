'use client'

import { useState } from 'react'
import classNames from 'classnames'
import { ColumnDef, TCashBuyTableData } from '@/types'
import CashBuyItem from './CashBuyItem'

const defaultColumns: ColumnDef<TCashBuyTableData>[] = [
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
    header: 'Gross Annual Income',
    accessorKey: 'gross_annual_income',
    width: 200,
    prefix: '$'
  },
  {
    header: 'Annual Rental Rate Increase',
    accessorKey: 'rental_increase',
    width: 80,
    suffix: '%'
  },
  {
    header: 'Annual Expenses Rate Increase',
    accessorKey: 'expenses_increase',
    width: 180,
    suffix: '%'
  },
  {
    header: 'Maintenance Expense Rate',
    accessorKey: 'maintenance_rate',
    width: 180,
    suffix: '%'
  },
  {
    header: 'Vacancy Rate',
    accessorKey: 'vacancy_rate',
    width: 150,
    suffix: '%'
  },
  {
    header: 'Capital Rate',
    accessorKey: 'capital_rate',
    width: 80,
    suffix: '%'
  },
  {
    header: 'Annual Tax Rate',
    accessorKey: 'tax_rate',
    width: 150,
    suffix: '%'
  },
  {
    header: 'Annual Insurance Rate',
    accessorKey: 'insurance_rate',
    width: 100,
    suffix: '%'
  },
  {
    header: 'Appreciation Rate',
    accessorKey: 'appreciation_rate',
    width: 120,
    suffix: '%'
  },
  {
    header: 'Net Income',
    accessorKey: 'netIncome',
    width: 150,
    prefix: '$'
  },
  {
    header: 'Appreciation',
    accessorKey: 'appreciation',
    width: 180,
    prefix: '$'
  },
  {
    header: 'Rental Rate Increase',
    accessorKey: 'rentalRateIncrease',
    width: 80,
    prefix: '$'
  }
]

const CashBuyTable = ({ reportId, data = [] }: { reportId: string; data: TCashBuyTableData[] }) => {
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
          {data.map((item: TCashBuyTableData, index: number) => (
            <CashBuyItem
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

export default CashBuyTable
