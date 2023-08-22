'use client'

import useAuth from '@/context/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const LogoutPage = () => {
  const router = useRouter()
  const { setAuthStatus } = useAuth()
  useEffect(() => {
    setAuthStatus(false)
    router.replace('/signin')
  }, [])
  return <h1 className="m-auto w-full h-full">Logging out...</h1>
}

export default LogoutPage
