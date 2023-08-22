import { createContext } from 'react'

export const AuthContext = createContext<{
  isAuthenticated: boolean
  setAuthStatus: (status: boolean) => void
}>({
  isAuthenticated: false,
  setAuthStatus: () => {}
})

export const AuthProvider = AuthContext.Provider

export default AuthContext
