import Image from 'next/image'
import Link from 'next/link'

type THouseCardProps = {
  property_id?: string
  primary_photo?: any
  location?: { address: any }
  status?: string
  description?: { beds: number; baths: number; sqft: number; lot_sqft: number }
  list_price?: number
}

const HouseCard = ({
  property_id,
  primary_photo,
  location,
  status,
  description,
  list_price
}: THouseCardProps) => {
  const { beds, baths, sqft, lot_sqft } = description || {}
  const { line, city, state_code, postal_code } = location?.address || {}

  return (
    <Link href={`/properties/${property_id}`}>
      <div className="flex-col w-full h-full rounded overflow-hidden shadow bg-gray-50 cursor-pointer hover:bg-gray-100 hover:shadow-lg">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto bg-slate-600 object-contain"
          src={primary_photo.href}
          alt="photo"
        />
        <div className="px-6 py-4">
          <div>{status}</div>
          <div>${list_price}</div>
          <div className="flex flex-wrap space-x-4">
            <div>{`${beds} beds`}</div>
            <div>{`${baths} baths`}</div>
            {sqft && <div>{`${sqft} sqft`}</div>}
            {lot_sqft && <div>{`${lot_sqft} sqft lot`}</div>}
          </div>
          <div>{`${line}, ${city}, ${state_code}, ${postal_code}`}</div>
        </div>
      </div>
    </Link>
  )
}

export default HouseCard
