'use client'

import useAuth from '@/context/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const LogoutPage = () => {
  const router = useRouter()
  const { setAuthStatus } = useAuth()
  useEffect(() => {
    setAuthStatus(false)
    router.replace('/')
  }, [])
  return <></>
}

export default LogoutPage
