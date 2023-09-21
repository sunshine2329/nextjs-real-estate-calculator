'use client'
import { ContainerWithPageTitle, FinancialScenario } from '@/components'

const CreateScenarioPage = ({ params: { reportId } }: { params: { reportId: string } }) => {
  return (
    <ContainerWithPageTitle title="New Scenario" toRedirect={`/reports/${reportId}`}>
      <FinancialScenario reportId={reportId} />
    </ContainerWithPageTitle>
  )
}

export default CreateScenarioPage
