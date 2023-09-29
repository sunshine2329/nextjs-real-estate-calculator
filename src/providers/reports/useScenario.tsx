import { SCENARIO, TScenarioParams } from '@/types'
import { useReportsState } from '.'
import useReportsData from './useReportsData'
import api from '@/lib/api'
import { useMemo } from 'react'

const useScenario = (params: TScenarioParams) => {
  const { reportId, scenarioId } = params
  const { scenarios, cash_buys, standard_loan_rentals } = useReportsState()
  const { scenario, cashBuy, standardLoanRental } = useMemo(() => {
    const scenario = scenarios[scenarioId]
    const cashBuy = scenario ? cash_buys[scenario.cash_buy] : undefined
    const standardLoanRental = scenario
      ? standard_loan_rentals[scenario.standard_loan_rental]
      : undefined
    return { scenario, cashBuy, standardLoanRental }
  }, [cash_buys, scenarioId, scenarios, standard_loan_rentals])
  return {
    scenario,
    cashBuy,
    standardLoanRental,
    ...useReportsData({
      action: SCENARIO,
      params,
      fetchData: () => api.get(`/api/reports/${reportId}/scenarios/${scenarioId}`)
    })
  }
}
export default useScenario
