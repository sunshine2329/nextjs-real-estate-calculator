import { REPORT, TReportParams } from '@/types'
import { useReportsState } from '.'
import useReportsData from './useReportsData'
import api from '@/lib/api'

const useScenarios = ({ reportId }: TReportParams & { type: string }) => {
  const { reports, scenarios, calculations } = useReportsState()
  const report = reports[reportId]
  report.scenarios = report
    ? report.scenarios.map((scenarioId: string) => {
        const scenario = scenarios[scenarioId]
        if (scenario && scenario.cash_buy) {
          scenario.cash_buy = calculations[scenario.cash_buy]
        }
        if (scenario && scenario.standard_loan_rental) {
          scenario.standard_loan_rental = calculations[scenario.standard_loan_rental]
        }
      })
    : []
  return {
    report,
    ...useReportsData({
      action: REPORT,
      params: { reportId },
      fetchData: () => api.get(`/api/reports/${reportId}`)
    })
  }
}
export default useScenarios
