'use client'
import { useContext } from 'react'
import AuthContext from './authContext'

const useAuth = () => {
  const { isAuthenticated, setAuthStatus } = useContext(AuthContext)
  return { isAuthenticated, setAuthStatus }
}

export default useAuth
