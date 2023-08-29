import {
  CalculatorSection,
  ContainerWithPageTitle,
  Address,
  Button,
  CalculationTable
} from '@/components'
import axios from 'axios'
import Link from 'next/link'

async function getCalculations(calculationId: string) {
  try {
    const response = await axios.get(`${process.env.API_URI}/api/calculations/${calculationId}`)
    // data = response.data
    console.log('successfully loaded')
    return response.data.data
  } catch (error: any) {
    console.log('load failed', error.message)
  }
  return []
}

const CalculationPage = async ({
  params: { calculationId }
}: {
  params: { calculationId: string }
}) => {
  const data = await getCalculations(calculationId)
  // let data: any
  // try {
  //   const response = await axios.get(`${process.env.API_URI}/api/calculations/${calculationId}`)
  //   data = response.data.data
  //   // data = response.data
  //   console.log('successfully loaded')
  // } catch (error: any) {
  //   console.log('load failed', error.message)
  // }

  const renderActions = () => (
    <Link href={`/calculations/${calculationId}/scenarios/create`}>
      <Button color="default">Add Scenario</Button>
    </Link>
  )

  return (
    <ContainerWithPageTitle
      title="Calculation"
      actions={renderActions()}
      toRedirect="/calculations"
    >
      {data && (
        <CalculatorSection title="Property Information" className="bg-transparent">
          <Address calculationId={calculationId} initialValues={data.address} />
          <CalculationTable calculationId={calculationId} scenarios={data.scenarios} />
        </CalculatorSection>
      )}
      {!data && <p>Not Found Data.</p>}
    </ContainerWithPageTitle>
  )
}

export default CalculationPage
