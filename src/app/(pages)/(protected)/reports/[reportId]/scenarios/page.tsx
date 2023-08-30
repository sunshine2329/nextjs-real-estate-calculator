'use client'

import { useRouter } from 'next/navigation'

const ScenariosPage = ({ params: { reportId } }: { params: { reportId: string } }) => {
  const router = useRouter()
  router.push(`/reports/${reportId}`)
  return <div></div>
}

export default ScenariosPage
