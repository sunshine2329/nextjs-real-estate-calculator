import { TReportsDispatch, TReportsState } from '@/types/reports'
import { createContext } from 'react'

export const ReportsStateContext = createContext<TReportsState>({})
export const ReportsDispatchContext = createContext((() => undefined) as TReportsDispatch)
