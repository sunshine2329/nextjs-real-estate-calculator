import { ADDED_CASH_BUY, CASH_BUY, UPDATED_CASH_BUY, TReportsAction, TReportsState } from '@/types'

export const getCashBuy = (state: TReportsState, { type, payload }: TReportsAction) => {
  if (type === CASH_BUY || type === UPDATED_CASH_BUY) {
    const { params, data } = payload
    if (params.type !== 'cash_buy') return state

    return {
      ...state,
      cash_buys: { ...state.cash_buys, [params.calculatorId]: data.cash_buy }
    }
  }
  return state
}

export const addCashBuy = (state: TReportsState, { type, payload }: TReportsAction) => {
  if (type === ADDED_CASH_BUY) {
    const { params, data } = payload
    if (params.type !== 'cash_buy') return state

    const scenario = state.scenarios[params.scenarioId]
    return {
      ...state,
      cash_buys: { ...state.cash_buys, [data.cash_buy._id]: data.cash_buy },
      scenarios: {
        ...state.scenarios,
        [params.scenarioId]: { ...scenario, cash_buy: data.cash_buy._id }
      }
    }
  }
  return state
}
