'use client'
import { AuthDispatchContext, AuthStateContext } from '@/providers/auth/AuthContext'
import api from '@/lib/api'
import { TAuthDispatch } from '@/types/auth'
import React, { useContext, useEffect, useReducer } from 'react'
import authReducer from './authReducer'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
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
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}

export const useAuthState = () => useContext(AuthStateContext)
export const useAuthDispatch: () => TAuthDispatch = () => useContext(AuthDispatchContext)
export default AuthProvider
