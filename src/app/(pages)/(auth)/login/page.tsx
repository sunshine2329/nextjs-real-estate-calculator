'use client'

import { AuthContainer, Button, Input } from '@/components'
import api from '@/lib/api'
import { useAuthDispatch } from '@/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, Resolver, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'

type TFormValues = {
  email: string
  password: string
}

const resolver: Resolver<TFormValues> = async values => {
  const errors: { [key: string]: any } = {}
  if (!values.email) {
    errors['email'] = { type: 'required', message: 'This is required.' }
  }
  if (!values.password || values.password.length < 6) {
    errors['password'] = { type: 'required', message: 'This is required.' }
  }
  return {
    values,
    errors
  }
}

export default function SignInPage() {
  const [loading, setLoading] = useState(false)
  const dispatch = useAuthDispatch()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TFormValues>({ resolver })
  const onSubmit: SubmitHandler<TFormValues> = async data => {
    try {
      setLoading(true)
      const response = await api.post('/api/auth/login', data)
      dispatch({ type: 'LOGIN', payload: response.data })
      router.push('/reports')
    } catch (error: any) {
      console.log('Login failed', error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <AuthContainer title="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('email', { required: true })}
          type="email"
          placeholder="email"
          label="Email"
          error={errors.email?.message}
          required
          disabled={loading}
          className="mb-4"
        />
        <Input
          {...register('password', { required: true })}
          type="password"
          placeholder="password"
          label="Password"
          error={errors.password?.message}
          required
          disabled={loading}
          className="mb-4"
        />
        <Button type="submit" loading={loading} className="w-full">
          Login
        </Button>
      </form>
    </AuthContainer>
  )
}
