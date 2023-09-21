'use client'

import { ContainerWithPageTitle, FinancialScenario } from '@/components'
import { TFinancialReportValues } from '@/components/reports/types'
import api from '@/lib/api'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const ScenarioPage = ({
  params: { reportId, scenarioId }
}: {
  params: { reportId: string; scenarioId: string }
}) => {
  const [data, setData] = useState<TFinancialReportValues | null>(null)
  const [loading, setLoading] = useState(false)
  const getScenario = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/api/reports/${reportId}/scenarios/${scenarioId}`)
      setData(response.data.data)
    } catch (error: any) {
      console.log('Loading reports', error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getScenario()
  }, [])

  if (loading) {
    return <p>loading...</p>
  }
  return (
    <ContainerWithPageTitle title={'Scenario'} toRedirect={`/reports/${reportId}`}>
      {!data && <p>No Data</p>}
      {data && (
        <FinancialScenario reportId={reportId} scenarioId={scenarioId} initialValues={data} />
      )}
    </ContainerWithPageTitle>
  )
}

export default ScenarioPage
