'use client'
import api from '@/lib/api'
import React, { createContext, useContext, useEffect, useReducer } from 'react'

api.setConfigure({
  baseURL: process.env.BASE_URL!,
  headers: { common: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } }
})
console.log('RootLayout')
console.log(process.env.BASE_URL!)

type User = {
  email: string
  name: string
} | null
type AuthState = {
  authenticated: boolean
  user: User
  loading: boolean
}
type Action =
  | { type: 'LOGIN'; payload: { user: User; token: string } }
  | { type: 'POPULATE'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'STOP_LOADING' }
type Dispatch = React.Dispatch<Action>

const StateContext = createContext<AuthState>({
  authenticated: false,
  user: null,
  loading: true
})
const DispatchContext = createContext((() => undefined) as Dispatch)

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.token)
      api.setHeaderToken(action.payload.token)
      return {
        ...state,
        authenticated: true,
        user: action.payload.user
      }
    case 'LOGOUT':
      localStorage.removeItem('token')
      api.setHeaderToken()
      return {
        ...state,
        authenticated: false,
        user: null
      }
    case 'POPULATE':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        } as User
      }
    case 'STOP_LOADING':
      return {
        ...state,
        loading: false
      }
    default:
      throw new Error('Unknown action type')
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true
  })

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token === null || token === undefined) {
          return
        }
        api.setHeaderToken(token)
        const res = await api.get('/api/users/me')
        dispatch({ type: 'LOGIN', payload: { user: res.data.user, token } })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        localStorage.removeItem('token')
      } finally {
        dispatch({ type: 'STOP_LOADING' })
      }
    }

    loadUser()
    // eslint-disable-next-line
  }, [])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export const useAuthState = () => useContext(StateContext)
export const useAuthDispatch: () => Dispatch = () => useContext(DispatchContext)
