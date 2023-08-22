'use client'

// import useAuth from '@/context/useAuth'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
import { AuthContainer, Button, Input, Spinner } from '@/components'
import useAuth from '@/context/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm, Resolver, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-hot-toast/headless'

type TFormValues = {
  username: string
  email: string
  password: string
}

const resolver: Resolver<TFormValues> = async values => {
  console.log(values)
  return {
    values,
    errors: {
      username: !values.username ? { type: 'required', message: 'This is required.' } : {},
      email: !values.email ? { type: 'required', message: 'This is required.' } : {},
      password:
        !values.password || values.password.length < 6
          ? { type: 'required', message: 'Password should be 6 length at least' }
          : {}
    }
  }
}

export default function SignUpPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const { isAuthenticated } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TFormValues>({ resolver })
  const onSubmit: SubmitHandler<TFormValues> = async data => {
    console.log(data)
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', data)
      console.log('Signup success', response.data)
      router.push('/signin')
    } catch (error: any) {
      console.log('Signup failed', error.message)
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
    <AuthContainer title="Sign Up">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('username', { required: true })}
          id="username"
          type="text"
          placeholder="username"
          error={errors.username?.message}
          label="Username"
          required
          disabled={loading}
        />
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
          Sign Up
        </Button>
      </form>
    </AuthContainer>
  )
}
