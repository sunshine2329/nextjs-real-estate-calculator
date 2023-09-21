import { useMemo } from 'react'
import ReportChart from './ReportChart'
import ReportTable from './ReportTable'
import { TScenarioValues, TChartData } from './types'
import calculateFinancialInvestment from './calculateFinancialInvestment'

type TReportProps = {
  reportId: string
  scenarios: TScenarioValues[]
}

const FinancialReport = ({ reportId, scenarios }: TReportProps) => {
  const { data, finalValues } = useMemo(() => {
    const finalValues: TChartData[] = []
    const data = scenarios.map((item, index) => {
      const scenario = { ...item, holding_length: 30 }
      const calculations = calculateFinancialInvestment({
        ...scenario
      })
      finalValues.push({ ...calculations, name: item.name })
      return { ...scenario, ...calculations, no: index }
    })
    return { data, finalValues }
  }, [scenarios])
  return (
    <>
      <ReportTable reportId={reportId} data={data} />
      <ReportChart values={finalValues} />
    </>
  )
}

export default FinancialReport
