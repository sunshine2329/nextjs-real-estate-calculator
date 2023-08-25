// 'use client'
import { getPropertyDetails } from '@/lib/properties'
import { ContainerWithPageTitle } from '@/components'

type TPropertyDetails = {
  propertyId: string
}
// export const getServerSideProps: GetServerSideProps<TPropertyDetails> = async (
//   context: GetServerSidePropsContext
// ) => {
//   const { id } = context.query
//   console.log(id)
//   const data = await getPropertyDetails(id as string)
//   return { props: { data } }
// }
export default async function PropertyDetailsPage({ params }: { params: TPropertyDetails }) {
  const data = await getPropertyDetails(params.propertyId)
  return (
    <ContainerWithPageTitle title="Property Details">{JSON.stringify(data)}</ContainerWithPageTitle>
  )
}
