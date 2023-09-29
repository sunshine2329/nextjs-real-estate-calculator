'use client'
import { Input, Button } from '@/components'
import { StringKeys, capitalizeFirstLetter } from '@/helpers'
import useAddress from '@/providers/reports/useAddress'
import { TAddressValues } from '@/types'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'

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
  const { saving, saveAddress } = useAddress({ reportId })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TAddressValues>({ resolver, defaultValues: { ...initialValues } })

  const onSubmit: SubmitHandler<TAddressValues> = async data => await saveAddress(data)

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
      disabled={saving}
    />
  )

  return (
    <form
      className="flex space-x-4 justify-center items-center mb-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="whitespace-nowrap">Property Address</h3>
      {keysOfFormValues.map(key => renderInput(key))}
      <Button type="submit" loading={saving}>
        Save
      </Button>
    </form>
  )
}

export default Address
