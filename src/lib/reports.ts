import Report from '@/models/reportModel'
import Scenario from '@/models/scenarioModel'
import { TScenarioParams, TReportParams } from '@/types'

export const getReport = async ({ reportId }: TReportParams) => {
  const report = await Report.findById(reportId)
  if (!report) {
    throw 'Not found report'
  }
  return report
}

export const getScenario = async ({ reportId, scenarioId }: TScenarioParams) => {
  const report = await getReport({ reportId })
  const index = report.scenarios.findIndex((id: any) => String(id) === scenarioId)
  if (index === -1) {
    throw 'Not found scenario from report'
  }

  const scenario = await Scenario.findById(scenarioId)
  if (!scenario) {
    throw 'Not found scenario'
  }
  return { report, scenario, index }
}
