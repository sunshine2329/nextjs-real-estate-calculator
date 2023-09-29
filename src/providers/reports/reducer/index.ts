import {
  ADDED_CASH_BUY,
  ADDED_REPORT,
  ADDED_SCENARIO,
  CASH_BUY,
  UPDATED_REPORT,
  UPDATED_SCENARIO,
  DELETED_SCENARIO,
  REPORT,
  REPORTS,
  SCENARIO,
  UPDATED_CASH_BUY,
  TReportsAction,
  TReportsState,
  ADDED_STANDARD_LOAN_RENTAL,
  STANDARD_LOAN_RENTAL,
  UPDATED_STANDARD_LOAN_RENTAL,
  CHANGED_CALCULATOR,
  DELETED_REPORT
} from '@/types/reports'
import { getReports, addReport, getReport, changeCalculator, deleteReport } from './reports'
import { addScenario, removeScenario, getScenario } from './scenarios'
import { addCashBuy, getCashBuy } from './cashBuys'
import { addStandardLoanRental, getStandardLoanRental } from './standardLoanRentals'

const reportsReducer = (state: TReportsState, action: TReportsAction): TReportsState => {
  const { type } = action
  switch (type) {
    case REPORTS:
      return getReports(state, action)
    case ADDED_REPORT:
      return addReport(state, action)
    case REPORT:
    case UPDATED_REPORT:
      return getReport(state, action)
    case CHANGED_CALCULATOR:
      return changeCalculator(state, action)
    case DELETED_REPORT:
      return deleteReport(state, action)

    case ADDED_SCENARIO:
      return addScenario(state, action)
    case SCENARIO:
    case UPDATED_SCENARIO:
      return getScenario(state, action)
    case DELETED_SCENARIO:
      return removeScenario(state, action)

    case ADDED_CASH_BUY:
      return addCashBuy(state, action)
    case CASH_BUY:
    case UPDATED_CASH_BUY:
      return getCashBuy(state, action)

    case ADDED_STANDARD_LOAN_RENTAL:
      return addStandardLoanRental(state, action)
    case STANDARD_LOAN_RENTAL:
    case UPDATED_STANDARD_LOAN_RENTAL:
      return getStandardLoanRental(state, action)
    default:
      throw new Error('Unknown action type')
  }
}

export default reportsReducer
