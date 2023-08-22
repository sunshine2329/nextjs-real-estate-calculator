'use client'

import Link from 'next/link'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast/headless'
import { Button } from '@/components'

const ProfilePage = () => {
  const [data, setData] = useState<{ [key: string]: string } | null>(null)
  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/me')
      console.log(res.data)
      setData(res.data.data)
    } catch (error: any) {
      console.log('Failed getting user details', error.message)
      toast.error(error.message)
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
      {data && (
        <div>
          <h3>username: {data.username}</h3>
          <h3>email: {data.email}</h3>
        </div>
      )}
      <Button className="my-4" color="secondary">
        <Link href={'/logout'}>Logout</Link>
      </Button>
    </div>
  )
}
export default ProfilePage
