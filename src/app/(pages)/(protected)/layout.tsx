'use client'

import { Spinner } from '@/components'
import { useAuthState } from '@/providers/auth'
import ReportsProvider from '@/providers/reports'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { loading, authenticated } = useAuthState()
  const router = useRouter()
  useEffect(() => {
    if (!loading && !authenticated) router.replace('/login')
  }, [loading, authenticated, router])
  if (loading) return <Spinner />
  return <ReportsProvider>{!loading && authenticated && children}</ReportsProvider>
}

export default ProtectedLayout
