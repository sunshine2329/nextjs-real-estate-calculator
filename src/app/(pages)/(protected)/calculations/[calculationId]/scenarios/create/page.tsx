import { ContainerWithPageTitle, FinancialReport } from '@/components'

const CreateScenarioPage = ({
  params: { calculationId }
}: {
  params: { calculationId: string }
}) => {
  return (
    <ContainerWithPageTitle title="New Scenario" toRedirect={`/calculations/${calculationId}`}>
      <FinancialReport calculationId={calculationId} />
    </ContainerWithPageTitle>
  )
}

export default CreateScenarioPage
