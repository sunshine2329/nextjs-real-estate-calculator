'use client'

import api from '@/lib/api'
import { Header } from '@/components'
import { AuthProvider } from '@/context/authContext'
import { useEffect, useState, useReducer } from 'react'

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'AUTHENTICATION':
      return action.payload
    default:
      return state
  }
}

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [loader, setLoader] = useState<boolean>(true)
  const [isAuthenticated, dispatch] = useReducer(reducer, false)
  const handleAuthenticate = (token?: string | null) => {
    if (token) sessionStorage.setItem('token', token)
    else sessionStorage.removeItem('token')
    api.setHeaderToken(token)
    dispatch({ type: 'AUTHENTICATION', payload: token })
    setLoader(false)
  }
  // const [isAuthenticated, setAuthStatus] = useState<boolean>(false)
  useEffect(() => {
    handleAuthenticate(sessionStorage.getItem('token'))
  }, [])
  return (
    <AuthProvider value={{ isAuthenticated, setAuthStatus: handleAuthenticate }}>
      {!loader && (
        <>
          <Header />
          <main>{children}</main>
        </>
      )}
    </AuthProvider>
  )
}

export default ProtectedLayout
