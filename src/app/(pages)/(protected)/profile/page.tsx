'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast/headless'
import { Button, Spinner } from '@/components'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { useAuthDispatch, useAuthState } from '@/providers/auth'

const ProfilePage = () => {
  const [loggingOut, setLoggingOut] = useState(false)
  const dispatch = useAuthDispatch()
  const { user } = useAuthState()
  const router = useRouter()
  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      setLoggingOut(true)
      await api.get('/api/auth/logout')
      dispatch({ type: 'LOGOUT' })
      router.replace('/')
    } catch (error: any) {
      console.log('Logout Failed', error.message)
      toast.error(error.message)
    } finally {
      setLoggingOut(false)
    }
  }

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
      {user && (
        <div>
          <h3>name: {user.name}</h3>
          <h3>email: {user.email}</h3>
        </div>
      )}
      <Button className="my-4" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
      {loggingOut && <Spinner />}
    </div>
  )
}
export default ProfilePage
