'use client'

import { Header } from '@/components'
import { AuthProvider } from '@/context/authContext'
import { useEffect, useState } from 'react'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthStatus] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(true)
  useEffect(() => {
    setLoader(false)
  }, [])
  return (
    <AuthProvider value={{ isAuthenticated, setAuthStatus }}>
      {!loader && (
        <>
          <Header />
          <main className="px-2 py-4">{children}</main>
        </>
      )}
    </AuthProvider>
  )
}

export default HomeLayout
