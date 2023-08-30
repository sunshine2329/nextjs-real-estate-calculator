'use client'

import { useState } from 'react'
import classNames from 'classnames'
import { ColumnDef, TReportColumns, TScenarioValues } from './types'
import { FinancialReportItem } from '.'

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
    header: 'Loan Principal (P)',
    accessorKey: 'loanPrincipal',
    width: 150,
    prefix: '$'
  },
  {
    header: 'Annual Percentage Rate',
    accessorKey: 'annualPercentageRate',
    width: 200,
    suffix: '%'
  },
  {
    header: 'Loan Term',
    accessorKey: 'loanTerm',
    width: 80,
    suffix: 'years'
  },
  {
    header: 'Net Operating Income (NOI)',
    accessorKey: 'netOperatingIncome',
    width: 180,
    prefix: '$'
  },
  {
    header: 'Monthly Rental Income',
    accessorKey: 'monthlyRentalIncome',
    width: 180,
    prefix: '$'
  },
  {
    header: 'Purchase Price',
    accessorKey: 'purchasePrice',
    width: 150,
    prefix: '$'
  },
  {
    header: 'Rehab Costs',
    accessorKey: 'rehabCosts',
    width: 80,
    prefix: '$'
  },
  {
    header: 'Annual Debt Service',
    accessorKey: 'annualDebtService',
    width: 150,
    prefix: '$'
  },
  {
    header: 'Cash Outlay',
    accessorKey: 'cashOutlay',
    width: 100,
    prefix: '$'
  },
  {
    header: 'Operating Income',
    accessorKey: 'operatingIncome',
    width: 120,
    prefix: '$'
  },
  {
    header: 'Renovation Value',
    accessorKey: 'renovationValue',
    width: 150,
    prefix: '$'
  },
  {
    header: 'Estimated Repair Costs',
    accessorKey: 'estimatedRepairCosts',
    width: 180,
    prefix: '$'
  },
  {
    header: 'Length',
    accessorKey: 'length',
    width: 80,
    suffix: 'ft'
  },
  {
    header: 'Width',
    accessorKey: 'width',
    width: 80,
    suffix: 'ft'
  },
  {
    header: 'Mortgage Payment',
    accessorKey: 'mortgagePayment',
    width: 120,
    prefix: '$'
  },
  {
    header: 'Capitalization Rate',
    accessorKey: 'capitalizationRate',
    width: 150,
    suffix: '%'
  },
  {
    header: 'Rent Cost Ratio',
    accessorKey: 'rentCostRatio',
    width: 120,
    suffix: '%'
  },
  {
    header: 'Gross Yield',
    accessorKey: 'grossYield',
    width: 100,
    suffix: '%'
  },
  {
    header: 'Debt Service Ratio',
    accessorKey: 'debtServiceRatio',
    width: 150
  },
  {
    header: 'Cash On cash Return',
    accessorKey: 'cashOnCashReturn',
    width: 200,
    suffix: '%'
  },
  {
    header: 'The 50% Rule',
    accessorKey: 'maximumOfferPrice',
    width: 100,
    prefix: '$'
  },
  {
    header: 'After Repair Value (ARV)',
    accessorKey: 'afterRepairValue',
    width: 200,
    prefix: '$'
  },
  {
    header: '70% of ARV Rule',
    accessorKey: 'afterRepairValue',
    width: 150,
    prefix: '$'
  },
  {
    header: 'Square Footage',
    accessorKey: 'squareFootage',
    width: 200,
    suffix: 'square feet'
  }
]

type TReportTableProps = {
  reportId: string
  scenarios: TScenarioValues[]
}
const ReportTable = ({ reportId, scenarios }: TReportTableProps) => {
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
