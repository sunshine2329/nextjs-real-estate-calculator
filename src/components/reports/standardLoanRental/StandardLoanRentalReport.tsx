import { useMemo } from 'react'
import {
  TStandardLoanRental,
  TStandardLoanRentalChartData,
  TStandardLoanRentalTableData,
  TScenario
} from '@/types'
import getStandardLoanRentalCalculations from './getStandardLoanRentalCalculations'
import StandardLoanRentalTable from './StandardLoanRentalTable'
import StandardLoanRentalChart from './StandardLoanRentalChart'

type TStandardLoanRentalReportProps = {
  reportId: string
  scenarios: TScenario[]
  standardLoanRentals: { [key: string]: TStandardLoanRental }
}

const StandardLoanRentalReport = ({
  reportId,
  scenarios,
  standardLoanRentals
}: TStandardLoanRentalReportProps) => {
  const { data, finalValues } = useMemo(() => {
    const data: TStandardLoanRentalTableData[] = []
    const finalValues: TStandardLoanRentalChartData[] = []
    scenarios.forEach((scenario: TScenario, index) => {
      const standardLoanRental = standardLoanRentals[scenario._id]
      const calculations = getStandardLoanRentalCalculations(standardLoanRental)
      finalValues.push({ ...calculations, name: scenario.name })
      data.push({
        ...scenario,
        ...standardLoanRental,
        ...calculations,
        no: index,
        scenarioId: scenario._id
      })
    })
    return { data, finalValues }
  }, [standardLoanRentals, scenarios])
  return (
    <>
      <StandardLoanRentalTable reportId={reportId} data={data} />
      <StandardLoanRentalChart values={finalValues} />
    </>
  )
}

export default StandardLoanRentalReport
