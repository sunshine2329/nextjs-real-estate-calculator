import {
  ADDED_SCENARIO,
  UPDATED_SCENARIO,
  DELETED_SCENARIO,
  SCENARIO,
  TReportsAction,
  TReportsState
} from '@/types'
import { removeFromObject } from '../../../helpers/removeFromObject'
import { removeFromArray } from '@/helpers'

export const getScenario = (state: TReportsState, { type, payload }: TReportsAction) => {
  if (type === SCENARIO || type === UPDATED_SCENARIO) {
    const { params, data } = payload
    return {
      ...state,
      scenarios: { ...state.scenarios, [params.scenarioId]: data.scenario },
      cash_buys: data.cash_buy
        ? { ...state.cash_buys, [data.cash_buy._id]: data.cash_buy }
        : state.cash_buys,
      standard_loan_rentals: data.standard_loan_rental
        ? {
            ...state.standard_loan_rentals,
            [data.standard_loan_rental._id]: data.standard_loan_rental
          }
        : state.standard_loan_rentals
    }
  }
  return state
}

export const addScenario = (state: TReportsState, { type, payload }: TReportsAction) => {
  if (type === ADDED_SCENARIO) {
    const { params, data } = payload
    const report = state.reports[params.reportId]
    return {
      ...state,
      reports: {
        ...state.reports,
        [params.reportId]: {
          ...report,
          scenarios: [...report.scenarios, data.scenario._id]
        }
      },
      scenarios: { ...state.scenarios, [data.scenario._id]: data.scenario }
    }
  }
  return state
}

export const removeScenario = (state: TReportsState, { type, payload }: TReportsAction) => {
  if (type === DELETED_SCENARIO) {
    const { params } = payload
    const scenario = state.scenarios[params.scenarioId]
    const report = state.reports[params.reportId]
    return {
      ...state,
      reports: {
        ...state.reports,
        [params.reportId]: {
          ...report,
          scenarios: removeFromArray(report.scenarios, params.scenarioId)
        }
      },
      scenarios: { ...removeFromObject(state.scenarios, params.scenarioId) },
      cash_buys: { ...removeFromObject(state.cash_buys, scenario.cash_buy) },
      standard_loan_rentals: {
        ...removeFromObject(state.standard_loan_rentals, scenario.standard_loan_rental)
      }
    }
  }
  return state
}
