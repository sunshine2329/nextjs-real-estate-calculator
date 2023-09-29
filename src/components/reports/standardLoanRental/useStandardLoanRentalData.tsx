import { useMemo } from 'react'
import getStandardLoanRentalCalculations from './getStandardLoanRentalCalculations'
import { TStandardLoanRental, TStandardLoanRentalCalculations } from '@/types'

type TStandardLoanRentalData = TStandardLoanRentalCalculations & {
  chartData: any
}
const useReportData = (values: TStandardLoanRental): TStandardLoanRentalData =>
  useMemo(() => {
    const currentYear = new Date().getFullYear()
    const arr = Array.from(Array(30).keys())
    const data = arr.map(i => getStandardLoanRentalCalculations({ ...values, holding_length: i }))
    const chartOptions = (title: string) => ({
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const
        },
        title: {
          display: true,
          text: title
        }
      }
    })
    const labels = arr.map(i => currentYear + i)
    const chartData = [
      {
        options: chartOptions('Real estate calculation over 30 years'),
        data: {
          labels,
          datasets: [
            {
              label: 'Net income over 30 years',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              data: data.map(({ netIncome }) => netIncome)
            },
            {
              label: 'Appreciation over 30 years',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
              data: data.map(({ appreciation }) => appreciation)
            },
            {
              label: 'Rental Rate Increase over 30 years',
              backgroundColor: 'rgba(rgba(123, 135, 132, 0.5)',
              data: data.map(({ rentalRateIncrease }) => rentalRateIncrease)
            }
          ]
        }
      }
    ]
    return { chartData, ...getStandardLoanRentalCalculations(values) }
  }, [values])

export default useReportData
