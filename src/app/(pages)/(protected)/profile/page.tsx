'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast/headless'
import { Button, Spinner } from '@/components'
import { useRouter } from 'next/navigation'
import useAuth from '@/context/useAuth'
import api from '@/lib/api'

const ProfilePage = () => {
  const [data, setData] = useState<{ [key: string]: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const { setAuthStatus } = useAuth()
  const router = useRouter()
  const getUserDetails = async () => {
    try {
      setLoading(true)
      const res = await api.get('/api/users/me')
      setData(res.data.data.user)
    } catch (error: any) {
      console.log('Failed getting user details', error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      setLoggingOut(true)
      await api.get('/api/auth/logout')
      setAuthStatus(null)
      router.replace('/')
    } catch (error: any) {
      console.log('Logout Failed', error.message)
      toast.error(error.message)
    } finally {
      setLoggingOut(false)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  return (
    <div className="w-full max-w-xl mx-auto py-8 gap-y-6">
      <h1 className="w-full flex items-center gap-x-4">
        <Link href={'../'}>
          <span className="inline-flex justify-center items-center w-10 h-10 bg-gray-200/70 hover:bg-gray-100 rounded-xl">
            &lt;
          </span>
        </Link>
      </h1>
      <span className="text-3xl font-bold">My Account</span>
      {loading && <p>Loading...</p>}
      {!loading && data && (
        <div>
          <h3>name: {data.name}</h3>
          <h3>email: {data.email}</h3>
        </div>
      )}
      {!loading && !data && <p>Error</p>}
      <Button className="my-4" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
      {loggingOut && <Spinner />}
    </div>
  )
}
export default ProfilePage
