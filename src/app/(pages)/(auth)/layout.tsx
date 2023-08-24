'use client'

import useAuth from '@/context/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  useEffect(() => {
    loading && setLoading(false)
    if (isAuthenticated) {
      router.replace('/calculator')
    }
  }, [loading, isAuthenticated, router])
  if (loading) return <></>
  return children
}

export default HomeLayout
