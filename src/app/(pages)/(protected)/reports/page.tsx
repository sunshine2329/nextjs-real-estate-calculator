'use client'

import { ContainerWithPageTitle, Button } from '@/components'
import useReports from '@/providers/reports/useReports'
import { TAddressValues } from '@/types'
import Link from 'next/link'
import { useEffect } from 'react'

const getAddress = (address: TAddressValues) =>
  `${address.street}, ${address.city}, ${address.state}, ${address.postal_code}`

const CalculatorPage = () => {
  const { ids, reports, loading, mutate } = useReports()
  useEffect(() => {
    mutate()
  }, [])

  const renderActions = () => (
    <Link href={'/reports/create'}>
      <Button color="default">Add Report</Button>
    </Link>
  )

  return (
    <ContainerWithPageTitle title="Real Estate Reports" actions={renderActions()} toRedirect="/">
      {loading && ids.length === 0 && <p>Loading...</p>}
      {!loading && ids.length === 0 && <p>No Data</p>}
      {!loading && ids.length > 0 && (
        <div className="grid grid-cols-1 divide-y">
          {ids.map((id: string, index: number) => (
            <Link key={id} href={`/reports/${id}`}>
              <div className="flex w-full bg-slate-50 px-6 py-2 space-x-6 justify-between">
                <p>{`${index + 1}. ${getAddress(reports[id].address)}`}</p>
                <p>{reports[id].created}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </ContainerWithPageTitle>
  )
}

export default CalculatorPage
