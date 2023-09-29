import { TAuthDispatch, TAuthState } from '@/types/auth'
import { createContext } from 'react'

export const AuthStateContext = createContext<TAuthState>({
  authenticated: false,
  user: null,
  loading: true
})
export const AuthDispatchContext = createContext((() => undefined) as TAuthDispatch)
