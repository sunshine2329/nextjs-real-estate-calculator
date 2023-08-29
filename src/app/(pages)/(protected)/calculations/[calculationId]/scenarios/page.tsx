'use client'

import { useRouter } from 'next/navigation'

const ScenariosPage = ({ params: { calculationId } }: { params: { calculationId: string } }) => {
  const router = useRouter()
  router.push(`/calculations/${calculationId}`)
  return <div></div>
}

export default ScenariosPage
