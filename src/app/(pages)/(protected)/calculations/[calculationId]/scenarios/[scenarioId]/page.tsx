'use client'

import { ContainerWithPageTitle, FinancialReport } from '@/components'
import { TFinancialReportValues } from '@/components/reports/types'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const ScenarioPage = ({
  params: { calculationId, scenarioId }
}: {
  params: { calculationId: string; scenarioId: string }
}) => {
  const [data, setData] = useState<TFinancialReportValues | null>(null)
  const [loading, setLoading] = useState(false)
  const getScenario = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/calculations/${calculationId}/scenarios/${scenarioId}`)
      setData(response.data.data)
    } catch (error: any) {
      console.log('Loading calculations', error.message)
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
    <ContainerWithPageTitle title={'Scenario'} toRedirect={`/calculations/${calculationId}`}>
      {!data && <p>No Data</p>}
      {data && (
        <FinancialReport
          calculationId={calculationId}
          scenarioId={scenarioId}
          initialValues={data}
        />
      )}
    </ContainerWithPageTitle>
  )
}

export default ScenarioPage
