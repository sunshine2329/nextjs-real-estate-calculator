'use client'

import { ContainerWithPageTitle, Button, TAddressValues } from '@/components'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const getAddress = (address: TAddressValues) =>
  `${address.state}, ${address.city}, ${address.state}, ${address.postal_code}`

const CalculatorPage = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const getCalculations = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/calculations')
      setData(response.data.data)
    } catch (error: any) {
      console.log('Loading calculations', error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCalculations()
  }, [])

  const renderActions = () => (
    <Link href={'/calculations/create'}>
      <Button color="default">Add Calculation</Button>
    </Link>
  )

  return (
    <ContainerWithPageTitle
      title="Real Estate Calculations"
      actions={renderActions()}
      toRedirect="/"
    >
      {loading && <p>Loading...</p>}
      {!loading && data.length === 0 && <p>No Data</p>}
      {!loading && data.length > 0 && (
        <div className="grid grid-cols-1 divide-y">
          {data.map((calculation, index) => (
            <Link key={calculation._id} href={`/calculations/${calculation._id}`}>
              <div className="flex w-full bg-slate-50 px-6 py-2 space-x-6 justify-between">
                <p>{`${index + 1}. ${getAddress(calculation.address)}`}</p>
                <p>{calculation.created}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </ContainerWithPageTitle>
  )
}

export default CalculatorPage
