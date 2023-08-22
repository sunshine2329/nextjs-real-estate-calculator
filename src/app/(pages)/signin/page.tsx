'use client'

// import useAuth from '@/context/useAuth'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
import { AuthContainer, Button, Input, Spinner } from '@/components'
import useAuth from '@/context/useAuth'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm, Resolver, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'

type TFormValues = {
  email: string
  password: string
}

const resolver: Resolver<TFormValues> = async values => {
  return {
    values,
    errors: {
      email: !values.email ? { type: 'required', message: 'This is required.' } : {},
      password:
        !values.password || values.password.length < 6
          ? { type: 'required', message: 'Password should be 6 length at least' }
          : {}
    }
  }
}

export default function SignInPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TFormValues>({ resolver })
  const onSubmit: SubmitHandler<TFormValues> = async data => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/login', data)
      console.log('Login success', response.data)
      router.push('/profile')
    } catch (error: any) {
      console.log('Login failed', error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/')
    }
  }, [isAuthenticated, router])
  return isAuthenticated ? (
    <Spinner />
  ) : (
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
        />
        <Input
          {...register('password', { required: true })}
          type="password"
          placeholder="password"
          label="Password"
          error={errors.password?.message}
          required
          disabled={loading}
        />
        <Button type="submit" loading={loading}>
          Login
        </Button>
      </form>
    </AuthContainer>
  )
}
