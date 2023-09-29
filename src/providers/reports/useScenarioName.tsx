import { ADDED_SCENARIO, DELETED_SCENARIO, UPDATED_SCENARIO } from '@/types'
import api from '@/lib/api'
import { useCallback, useState, useTransition } from 'react'
import { useReportsDispatch } from './index'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { TScenarioParams } from '../../types/reports/index'
import { TReportParams } from '@/types/reports/TParams'

const useScenarioName = (params: TReportParams | TScenarioParams) => {
  const { reportId, scenarioId } = params as TScenarioParams
  const router = useRouter()
  const dispatch = useReportsDispatch()

  const [isSavePending, startSaveTransition] = useTransition()
  const [saving, setSaving] = useState(false)
  const saveScenarioName = useCallback(
    async (name: string) => {
      if (saving || isSavePending) return
      try {
        setSaving(true)
        if (scenarioId) {
          const response = await api.put(`/api/reports/${reportId}/scenarios/${scenarioId}`, {
            name
          })
          const data = response.data.data
          dispatch({
            type: UPDATED_SCENARIO,
            payload: { params: params as TScenarioParams, data }
          })
        } else {
          const response = await api.post(`/api/reports/${reportId}/scenarios`, { name })
          const data = response.data.data
          dispatch({
            type: ADDED_SCENARIO,
            payload: { params, data }
          })
          startSaveTransition(() => {
            router.refresh()
            router.push(`/reports/${reportId}/scenarios/${data.scenario._id}`)
          })
        }
      } catch (error: any) {
        console.log('saving', error.message)
        toast.error(error.message)
      } finally {
        setSaving(false)
      }
    },
    [dispatch, isSavePending, params, reportId, router, saving, scenarioId]
  )

  const [deleting, setDeleting] = useState(false)
  const [isDeletePending, startDeleteTransition] = useTransition()
  const deleteScenario = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      if (!scenarioId || deleting || isDeletePending) return

      try {
        setDeleting(true)
        await api.delete(`/api/reports/${reportId}/scenarios/${scenarioId}`)
        dispatch({
          type: DELETED_SCENARIO,
          payload: { params: params as TScenarioParams }
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
    [dispatch, params, reportId, router, scenarioId]
  )
  return {
    saving: saving || isSavePending,
    deleting: deleting || isDeletePending,
    saveScenarioName,
    deleteScenario
  }
}
export default useScenarioName
