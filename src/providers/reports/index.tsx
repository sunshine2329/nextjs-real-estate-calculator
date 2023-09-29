'use client'

import React, { useContext, useReducer } from 'react'
import reportsReducer from './reducer'
import { ReportsDispatchContext, ReportsStateContext } from './ReportsContext'
import { TReportsDispatch } from '@/types'

const initialState = {
  ids: [],
  calculators: {},
  reports: {},
  scenarios: {},
  cash_buys: {},
  standard_loan_rentals: {}
}
export const ReportsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reportsReducer, initialState)

  return (
    <ReportsStateContext.Provider value={state}>
      <ReportsDispatchContext.Provider value={dispatch}>{children}</ReportsDispatchContext.Provider>
    </ReportsStateContext.Provider>
  )
}

export const useReportsState = () => useContext(ReportsStateContext)
export const useReportsDispatch: () => TReportsDispatch = () => useContext(ReportsDispatchContext)
export default ReportsProvider
