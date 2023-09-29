'use client'

import { useReportsDispatch } from '.'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

const useReportsData = ({ action, params, fetchData }: any) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useReportsDispatch()

  const mutate = useCallback(async () => {
    if (loading) return
    try {
      setLoading(true)
      setError(null)
      const response = await fetchData()
      dispatch({ type: action, payload: { params, data: response.data.data } })
    } catch (error: any) {
      console.log(action, error.message)
      toast.error(error.message)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [action, dispatch, fetchData, loading, params])

  return { mutate, loading, error }
}

export default useReportsData
