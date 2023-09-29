import TCashBuy from './TCashBuy'
import TReport from './TReport'
import TScenario from './TScenario'
import TStandardLoanRental from './TStandardLoanRental'
import {
  REPORTS,
  REPORT,
  ADDED_REPORT,
  UPDATED_REPORT,
  ADDED_SCENARIO,
  SCENARIO,
  UPDATED_SCENARIO,
  DELETED_SCENARIO,
  ADDED_CASH_BUY,
  CASH_BUY,
  UPDATED_CASH_BUY,
  ADDED_STANDARD_LOAN_RENTAL,
  STANDARD_LOAN_RENTAL,
  UPDATED_STANDARD_LOAN_RENTAL,
  CHANGED_CALCULATOR,
  DELETED_REPORT
} from './ActionTypes'

export type { TReport, TScenario, TCashBuy, TStandardLoanRental }
export * from './TParams'
export * from './TObject'
export * from './ActionTypes'
export * from './TCashBuy'
export * from './TStandardLoanRental'

export type TCalculator = 'cash_buy' | 'standard_loan_rental'
export type TReportParams = { reportId: string }
export type TScenarioParams = TReportParams & { scenarioId: string }
export type TCalculatorTypeParams = TScenarioParams & { type: string }
export type TCalculatorParams = TCalculatorTypeParams & { calculatorId: string }

export type TReportData = {
  report: TReport
  scenarios: TScenario[]
  cash_buys: TCashBuy[]
  standard_loan_rentals: TStandardLoanRental[]
}

export type TCashBuyData = {
  cash_buy: TCashBuy
}

export type TStandardLoanRentalData = {
  standard_loan_rental: TStandardLoanRental
}

export type TScenarioData = TCashBuyData &
  TStandardLoanRentalData & {
    scenario: TScenario
  }

export type TReportsState = { [key: string]: any }
export type TReportsAction =
  | { type: typeof REPORTS; payload: { data: { reports: TReport[] } } }
  | {
      type: typeof REPORT
      payload: {
        params: TReportParams
        data: TReportData
      }
    }
  | { type: typeof ADDED_REPORT; payload: { data: { report: TReport } } }
  | {
      type: typeof UPDATED_REPORT
      payload: { params: TReportParams; data: TReportData }
    }
  | {
      type: typeof DELETED_REPORT
      payload: { params: TReportParams }
    }
  | {
      type: typeof CHANGED_CALCULATOR
      payload: { params: TReportParams; data: { type: 'cash_buy' | 'standard_loan_rental' } }
    }
  | {
      type: typeof ADDED_SCENARIO
      payload: { params: TReportParams; data: { scenario: TScenario } }
    }
  | {
      type: typeof SCENARIO
      payload: { params: TScenarioParams; data: TScenarioData }
    }
  | {
      type: typeof UPDATED_SCENARIO
      payload: { params: TScenarioParams; data: TScenarioData }
    }
  | {
      type: typeof DELETED_SCENARIO
      payload: { params: TScenarioParams }
    }
  | {
      type: typeof ADDED_CASH_BUY
      payload: {
        params: TCalculatorTypeParams
        data: TCashBuyData
      }
    }
  | {
      type: typeof CASH_BUY
      payload: {
        params: TCalculatorParams
        data: TCashBuyData
      }
    }
  | {
      type: typeof UPDATED_CASH_BUY
      payload: {
        params: TCalculatorParams
        data: TCashBuyData
      }
    }
  | {
      type: typeof ADDED_STANDARD_LOAN_RENTAL
      payload: {
        params: TCalculatorTypeParams
        data: TStandardLoanRentalData
      }
    }
  | {
      type: typeof STANDARD_LOAN_RENTAL
      payload: {
        params: TCalculatorParams
        data: TStandardLoanRentalData
      }
    }
  | {
      type: typeof UPDATED_STANDARD_LOAN_RENTAL
      payload: {
        params: TCalculatorParams
        data: TStandardLoanRentalData
      }
    }

export type TReportsDispatch = React.Dispatch<TReportsAction>
