'use client'
import { Input, Button } from '@/components'
import { StringKeys, capitalizeFirstLetter } from '@/helpers'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

export type TAddressValues = {
  street: string
  city: string
  state: string
  postal_code: string
}

type TAddressProps = {
  reportId?: string
  initialValues?: TAddressValues
}

const keysOfFormValues: StringKeys<TAddressValues>[] = ['street', 'city', 'state', 'postal_code']

const resolver: Resolver<TAddressValues> = async values => {
  const errors: { [key: string]: any } = {}
  if (!values.street) {
    errors['street'] = { type: 'required', message: 'This is required.' }
  }
  if (!values.city) {
    errors['city'] = { type: 'required', message: 'This is required.' }
  }
  if (!values.state) {
    errors['state'] = { type: 'required', message: 'This is required.' }
  }
  if (!values.postal_code) {
    errors['postal_code'] = { type: 'required', message: 'This is required.' }
  }
  return {
    values,
    errors
  }
}

const Address = ({ reportId, initialValues }: TAddressProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TAddressValues>({ resolver, defaultValues: { ...initialValues } })
  const onSubmit: SubmitHandler<TAddressValues> = async data => {
    try {
      setLoading(true)

      let response: any
      if (reportId) response = await api.put(`/api/reports/${reportId}`, { address: data })
      else response = await api.post(`/api/reports`, { address: data })
      !reportId && router.push(`/reports/${response.data.data._id}`)
    } catch (error: any) {
      console.log('Save failed', error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const renderInput = (id: keyof TAddressValues) => (
    <Input
      id={id}
      key={id}
      className="w-full flex-grow mb-0"
      {...register(id, { required: true })}
      type="text"
      error={errors[id]?.message}
      required
      placeholder={capitalizeFirstLetter(id)}
      disabled={loading}
    />
  )

  return (
    <form
      className="flex space-x-4 justify-center items-center mb-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="whitespace-nowrap">Property Address</h3>
      {keysOfFormValues.map(key => renderInput(key))}
      <Button type="submit" loading={loading}>
        Save
      </Button>
    </form>
  )
}

export default Address
