import { REPORTS } from '@/types'
import { useReportsState } from '.'
import useReportsData from './useReportsData'
import api from '@/lib/api'

const useReports = () => {
  const { ids, reports } = useReportsState()
  return {
    ids,
    reports,
    ...useReportsData({
      action: REPORTS,
      params: {},
      fetchData: () => api.get('/api/reports')
    })
  }
}
export default useReports
