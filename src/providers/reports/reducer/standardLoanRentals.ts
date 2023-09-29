import {
  ADDED_STANDARD_LOAN_RENTAL,
  STANDARD_LOAN_RENTAL,
  UPDATED_STANDARD_LOAN_RENTAL,
  TReportsAction,
  TReportsState
} from '@/types'

export const getStandardLoanRental = (state: TReportsState, { type, payload }: TReportsAction) => {
  if (type === STANDARD_LOAN_RENTAL || type === UPDATED_STANDARD_LOAN_RENTAL) {
    const { params, data } = payload
    if (params.type !== 'standard_loan_rental') return state

    return {
      ...state,
      standard_loan_rentals: {
        ...state.standard_loan_rentals,
        [params.calculatorId]: data.standard_loan_rental
      }
    }
  }
  return state
}

export const addStandardLoanRental = (state: TReportsState, { type, payload }: TReportsAction) => {
  if (type === ADDED_STANDARD_LOAN_RENTAL) {
    const { params, data } = payload
    if (params.type !== 'standard_loan_rental') return state

    const scenario = state.scenarios[params.scenarioId]
    return {
      ...state,
      standard_loan_rentals: {
        ...state.standard_loan_rentals,
        [data.standard_loan_rental._id]: data.standard_loan_rental
      },
      scenarios: {
        ...state.scenarios,
        [params.scenarioId]: { ...scenario, standard_loan_rental: data.standard_loan_rental._id }
      }
    }
  }
  return state
}
