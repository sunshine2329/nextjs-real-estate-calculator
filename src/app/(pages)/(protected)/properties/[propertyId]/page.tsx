// 'use client'
import { getPropertyDetails } from '@/lib/properties'
import { ContainerWithPageTitle } from '@/components'

type TPropertyDetails = {
  propertyId: string
}
export default async function PropertyDetailsPage({ params }: { params: TPropertyDetails }) {
  const data = await getPropertyDetails(params.propertyId)
  return (
    <ContainerWithPageTitle title="Property Details">{JSON.stringify(data)}</ContainerWithPageTitle>
  )
}
