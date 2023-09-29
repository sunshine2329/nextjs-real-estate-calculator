'use client'
import { ContainerWithPageTitle } from '@/components'
import ScenarioName from '@/components/reports/ScenarioName'
import { TScenarioParams } from '@/types'

const CreateScenarioPage = ({ params }: { params: TScenarioParams }) => {
  return (
    <ContainerWithPageTitle title="New Scenario" toRedirect={`/reports/${params.reportId}`}>
      <ScenarioName params={params} />
    </ContainerWithPageTitle>
  )
}

export default CreateScenarioPage
