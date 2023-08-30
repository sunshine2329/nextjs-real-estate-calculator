'use client'
import {
  CalculatorSection,
  ContainerWithPageTitle,
  Address,
  Button,
  ReportTable,
  ReportChart
} from '@/components'
import api from '@/lib/api'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const ReportPage = ({ params: { reportId } }: { params: { reportId: string } }) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const getReports = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/api/reports/${reportId}`)
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
    <Link href={`/reports/${reportId}/scenarios/create`}>
      <Button color="default">Add Scenario</Button>
    </Link>
  )

  console.log(data)
  return (
    <ContainerWithPageTitle title="Report" actions={renderActions()} toRedirect="/reports">
      {loading && <p>Loading...</p>}
      {!loading && data && (
        <CalculatorSection title="Property Information" className="bg-transparent">
          <Address reportId={reportId} initialValues={data.address} />
          <ReportTable reportId={reportId} scenarios={data.scenarios} />
          <ReportChart scenarios={data.scenarios} />
        </CalculatorSection>
      )}
      {!loading && !data && <p>Not Found Data.</p>}
    </ContainerWithPageTitle>
  )
}

export default ReportPage
