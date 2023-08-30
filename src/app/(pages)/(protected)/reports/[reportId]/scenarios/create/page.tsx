import { ContainerWithPageTitle, FinancialReport } from '@/components'

const CreateScenarioPage = ({ params: { reportId } }: { params: { reportId: string } }) => {
  return (
    <ContainerWithPageTitle title="New Scenario" toRedirect={`/reports/${reportId}`}>
      <FinancialReport reportId={reportId} />
    </ContainerWithPageTitle>
  )
}

export default CreateScenarioPage
