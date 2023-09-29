import { useMemo } from 'react'
import { TCashBuy, TCashBuyChartData, TCashBuyTableData, TScenario } from '@/types'
import getCashBuyCalculations from './getCashBuyCalculations'
import CashBuyTable from './CashBuyTable'
import CashBuyChart from './CashBuyChart'

type TCashBuyReportProps = {
  reportId: string
  scenarios: TScenario[]
  cashBuys: { [key: string]: TCashBuy }
}

const CashBuyReport = ({ reportId, scenarios, cashBuys }: TCashBuyReportProps) => {
  const { data, finalValues } = useMemo(() => {
    const data: TCashBuyTableData[] = []
    const finalValues: TCashBuyChartData[] = []
    scenarios.forEach((scenario: TScenario, index) => {
      const cashBuy = cashBuys[scenario.cash_buy]
      const calculations = getCashBuyCalculations(cashBuy)
      finalValues.push({ ...calculations, name: scenario.name })
      data.push({ ...scenario, ...cashBuy, ...calculations, no: index })
    })
    return { data, finalValues }
  }, [cashBuys, scenarios])
  return (
    <>
      <CashBuyTable reportId={reportId} data={data} />
      <CashBuyChart values={finalValues} />
    </>
  )
}

export default CashBuyReport
