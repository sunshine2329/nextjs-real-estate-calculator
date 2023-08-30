'use client'

import { ContainerWithPageTitle, Button, TAddressValues } from '@/components'
import api from '@/lib/api'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const getAddress = (address: TAddressValues) =>
  `${address.street}, ${address.city}, ${address.state}, ${address.postal_code}`

const CalculatorPage = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const getReports = async () => {
    try {
      setLoading(true)
      const response = await api.get('/api/reports')
      setData(response.data.data)
    } catch (error: any) {
      console.log('Loading reports', error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getReports()
  }, [])

  const renderActions = () => (
    <Link href={'/reports/create'}>
      <Button color="default">Add Report</Button>
    </Link>
  )

  return (
    <ContainerWithPageTitle title="Real Estate Reports" actions={renderActions()} toRedirect="/">
      {loading && <p>Loading...</p>}
      {!loading && data.length === 0 && <p>No Data</p>}
      {!loading && data.length > 0 && (
        <div className="grid grid-cols-1 divide-y">
          {data.map((report, index) => (
            <Link key={report._id} href={`/reports/${report._id}`}>
              <div className="flex w-full bg-slate-50 px-6 py-2 space-x-6 justify-between">
                <p>{`${index + 1}. ${getAddress(report.address)}`}</p>
                <p>{report.created}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </ContainerWithPageTitle>
  )
}

export default CalculatorPage
