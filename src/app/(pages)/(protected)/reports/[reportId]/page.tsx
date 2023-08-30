import {
  CalculatorSection,
  ContainerWithPageTitle,
  Address,
  Button,
  ReportTable
} from '@/components'
import axios from 'axios'
import Link from 'next/link'

async function getReports(reportId: string) {
  try {
    const response = await axios.get(`${process.env.API_URI}/api/reports/${reportId}`)
    // data = response.data
    console.log('successfully loaded')
    return response.data.data
  } catch (error: any) {
    console.log('load failed', error.message)
  }
  return []
}

const ReportPage = async ({ params: { reportId } }: { params: { reportId: string } }) => {
  const data = await getReports(reportId)
  // let data: any
  // try {
  //   const response = await axios.get(`${process.env.API_URI}/api/reports/${reportId}`)
  //   data = response.data.data
  //   // data = response.data
  //   console.log('successfully loaded')
  // } catch (error: any) {
  //   console.log('load failed', error.message)
  // }

  const renderActions = () => (
    <Link href={`/reports/${reportId}/scenarios/create`}>
      <Button color="default">Add Scenario</Button>
    </Link>
  )

  return (
    <ContainerWithPageTitle title="Report" actions={renderActions()} toRedirect="/reports">
      {data && (
        <CalculatorSection title="Property Information" className="bg-transparent">
          <Address reportId={reportId} initialValues={data.address} />
          <ReportTable reportId={reportId} scenarios={data.scenarios} />
        </CalculatorSection>
      )}
      {!data && <p>Not Found Data.</p>}
    </ContainerWithPageTitle>
  )
}

export default ReportPage
