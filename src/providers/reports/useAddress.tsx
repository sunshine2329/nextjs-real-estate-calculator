import { DELETED_SCENARIO, TAddressValues } from '@/types'
import api from '@/lib/api'
import { useCallback, useState, useTransition } from 'react'
import { useReportsDispatch } from './index'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { ADDED_REPORT, DELETED_REPORT, UPDATED_REPORT } from '../../types/reports/index'

const useAddress = ({ reportId }: { reportId?: string }) => {
  const router = useRouter()
  const dispatch = useReportsDispatch()

  const [isSavePending, startSaveTransition] = useTransition()
  const [saving, setSaving] = useState(false)
  const saveAddress = useCallback(
    async (address: TAddressValues) => {
      if (saving || isSavePending) return
      try {
        setSaving(true)
        if (reportId) {
          const response = await api.put(`/api/reports/${reportId}`, {
            address
          })
          const data = response.data.data
          dispatch({
            type: UPDATED_REPORT,
            payload: { params: { reportId }, data }
          })
        } else {
          const response = await api.post(`/api/reports`, { address })
          const data = response.data.data
          dispatch({
            type: ADDED_REPORT,
            payload: { data }
          })
          startSaveTransition(() => {
            router.refresh()
            router.push(`/reports/${data.report._id}`)
          })
        }
      } catch (error: any) {
        console.log('saving', error.message)
        toast.error(error.message)
      } finally {
        setSaving(false)
      }
    },
    [dispatch, reportId, router, saving]
  )

  const [deleting, setDeleting] = useState(false)
  const [isDeletePending, startDeleteTransition] = useTransition()
  const deleteReport = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      if (!reportId || deleting || isDeletePending) return

      try {
        setDeleting(true)
        await api.delete(`/api/reports/${reportId}`)
        dispatch({
          type: DELETED_REPORT,
          payload: { params: { reportId } }
        })
        startDeleteTransition(() => {
          router.refresh()
          router.back()
        })
      } catch (error: any) {
        console.log(DELETED_SCENARIO, error.message)
        toast.error(error.message)
      } finally {
        setDeleting(false)
      }
    },
    [deleting, dispatch, reportId, router]
  )
  return {
    saving: saving || isSavePending,
    deleting: deleting || isDeletePending,
    saveAddress,
    deleteReport
  }
}
export default useAddress
