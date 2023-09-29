'use client'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { isNumber } from 'lodash'
import { ColumnDef, TCashBuyTableData } from '@/types'

const CashBuyItem = ({
  reportId,
  index,
  data,
  columns,
  getLeftStickyPos
}: {
  reportId: string
  index: number
  data: TCashBuyTableData
  columns: ColumnDef<TCashBuyTableData>[]
  getLeftStickyPos: (index: number) => number
}) => {
  const router = useRouter()
  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    router.push(`/reports/${reportId}/scenarios/${data._id}`)
  }
  return (
    <tr key={index} className="text-left cursor-pointer" onClick={handleClick}>
      {columns.map((col, i) => {
        const accessorKey = col.accessorKey
        const value = data[accessorKey]
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

export default CashBuyItem
