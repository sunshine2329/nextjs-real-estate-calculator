import {
  CHANGED_CALCULATOR,
  REPORT,
  TCalculator,
  TReportParams,
  TScenario,
  TStandardLoanRental,
  TCashBuy
} from '@/types'
import { useReportsDispatch, useReportsState } from '.'
import useReportsData from './useReportsData'
import api from '@/lib/api'
import { useMemo } from 'react'

const useReport = (params: TReportParams) => {
  const { reportId } = params
  const dispatch = useReportsDispatch()
  const { calculators, reports, scenarios, cash_buys, standard_loan_rentals } = useReportsState()
  const { report, type, scenariosForReport, cashBuys, standardLoanRentals } = useMemo(() => {
    const report = reports[reportId]
    const type: TCalculator = (calculators[reportId] || 'cash_buy') as TCalculator
    const scenariosForReport: TScenario[] = []
    const cashBuys: { [key: string]: TCashBuy } = {}
    const standardLoanRentals: { [key: string]: TStandardLoanRental } = {}
    if (report)
      report.scenarios.forEach((scenarioId: string) => {
        const scenario = scenarios[scenarioId]
        if (scenario) {
          scenariosForReport.push(scenario)
          cashBuys[scenario._id] = scenario.cash_buy ? cash_buys[scenario.cash_buy] : null
          standardLoanRentals[scenario._id] = scenario.standard_loan_rental
            ? standard_loan_rentals[scenario.standard_loan_rental]
            : null
        }
      })
    return { report, type, scenariosForReport, cashBuys, standardLoanRentals }
  }, [calculators, cash_buys, reportId, reports, scenarios, standard_loan_rentals])

  const changeCalculator = (type: TCalculator) => {
    dispatch({
      type: CHANGED_CALCULATOR,
      payload: { params, data: { type } }
    })
  }

  return {
    report,
    type,
    scenarios: scenariosForReport,
    cashBuys,
    standardLoanRentals,
    changeCalculator,
    ...useReportsData({
      action: REPORT,
      params,
      fetchData: () => api.get(`/api/reports/${reportId}`)
    })
  }
}
export default useReport
