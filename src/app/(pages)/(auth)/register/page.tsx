'use client'

import { AuthContainer, Button, Input } from '@/components'
import useAuth from '@/context/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm, Resolver, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast/headless'
import { password } from '@/lib'
import { capitalizeFirstLetter } from '@/helpers'
import api from '@/lib/api'

type TFormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const resolver: Resolver<TFormValues> = async values => {
  const errors: { [key: string]: any } = {}
  if (!values.name) {
    errors['name'] = { type: 'required', message: 'This is required.' }
  }
  if (!values.email) {
    errors['email'] = { type: 'required', message: 'This is required.' }
  }
  if (!values.password || values.password.length < password.min) {
    errors['password'] = { type: 'required', message: 'This is required.' }
  }
  if (values.password !== values.confirmPassword) {
    errors['confirmPassword'] = {
      type: 'invalid',
      message: 'Passwords do not match.'
    }
  }
  return {
    values,
    errors
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
    try {
      setLoading(true)
      await api.post('/api/auth/register', data)
      router.push('/login')
    } catch (error: any) {
      console.log('Register failed: ', error)
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

  const renderInput = (id: keyof TFormValues, type: string, required: boolean, label?: string) => (
    <Input
      {...register(id, { required })}
      id={id}
      type={type}
      placeholder={capitalizeFirstLetter(id)}
      error={errors[id]?.message}
      label={label || capitalizeFirstLetter(id)}
      required={required}
      disabled={loading}
      className="mb-4"
    />
  )

  return (
    <AuthContainer title="Register">
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderInput('name', 'text', true)}
        {renderInput('email', 'email', true)}
        {renderInput('password', 'password', true)}
        {renderInput('confirmPassword', 'password', true, 'Confirm Password')}
        <Button type="submit" loading={loading} className="w-full mb-4">
          Register
        </Button>
      </form>
    </AuthContainer>
  )
}
