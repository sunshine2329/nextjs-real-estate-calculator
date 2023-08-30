'use client'

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
  const [isAuthenticated, dispatch] = useReducer(reducer, false)
  const handleAuthenticate = (value: boolean) => {
    if (isAuthenticated !== value) {
      sessionStorage.setItem('isAuthenticated', `${value}`)
    }
    dispatch({ type: 'AUTHENTICATION', payload: value })
  }
  // const [isAuthenticated, setAuthStatus] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(true)
  useEffect(() => {
    handleAuthenticate(sessionStorage.getItem('isAuthenticated') === 'true')
    setLoader(false)
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
