'use client'
import { Button, ContainerWithPageTitle, HouseCard, Input } from '@/components'
import { useState } from 'react'
import { getProperties } from '../../lib/properties'

type TProperty = {
  property_id: string
  primary_photo: any
  short_price: string
  prop_type: string
  beds: string
  baths_full: string
  address: string
  href: string
}
const HomePage = () => {
  const [keyword, setKeyword] = useState<string | null>(null) // Stores input location keyword eg: "New York"
  const [loading, setLoading] = useState<boolean>(false)
  // const [sort, setSort] = useState<string | null>(null) // Stores the sort preference
  // const [beds, setBeds] = useState<string | null>(null) // Stores the minimum beds
  const [response, setResponse] = useState<TProperty[] | null>(null) // Stores the properties returned in the API response
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Store value in state
    setKeyword(e.target.value)
    setResponse(null)
    setLoading(false)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Allow enter key to submit the form
    e.stopPropagation()
    try {
      setLoading(true)
      const data = await getProperties(keyword) // Trigger the API call on submit
      setResponse(data)
    } catch (error: any) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <ContainerWithPageTitle title="Real Estate App">
      <div className="flex flex-col md:px-12 px-0 relative bg-background font-poppins items-center">
        <h2 className="text-active text-2xl mt-6">
          Discover latest properties for sale anywhere in USA.
        </h2>
        <form
          className="sm:mx-auto mt-20 md:max-w-4xl justify-center flex flex-col sm:w-full sm:flex"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="Enter the location for properties eg: New York"
            onChange={handleChange}
          />
          <Button type="submit" loading={loading}>
            Search
          </Button>
        </form>
        {response && (
          <div className="mt-10">
            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {response
                .filter(
                  (property: TProperty) => property.primary_photo && property.primary_photo.href
                )
                .map((property: TProperty) => (
                  <HouseCard key={property.property_id} {...property} />
                ))}
            </div>
          </div>
        )}
      </div>
    </ContainerWithPageTitle>
  )
}

export default HomePage
