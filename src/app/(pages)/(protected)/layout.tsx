'use client'

import { Spinner } from '@/components'
import useAuth from '@/context/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/signin')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return <Spinner />
  }
  return children
}

export default ProtectedLayout
