'use client'

import { useAuthState } from '@/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { loading, authenticated } = useAuthState()
  const router = useRouter()
  useEffect(() => {
    if (!loading && !authenticated) router.replace('/login')
  }, [loading, authenticated, router])
  return <>{!loading && authenticated && children}</>
}

export default ProtectedLayout
