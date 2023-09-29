import { useMemo } from 'react'
import getCashBuyCalculations from './getCashBuyCalculations'
import { TCashBuy, TCashBuyCalculations } from '@/types'

type TCashBuyData = TCashBuyCalculations & {
  chartData: any
}
const useCashBuyData = (values: TCashBuy): TCashBuyData =>
  useMemo(() => {
    const currentYear = new Date().getFullYear()
    const arr = Array.from(Array(30).keys())
    const data = arr.map(i => getCashBuyCalculations({ ...values }, i))
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
    return { chartData, ...getCashBuyCalculations(values) }
  }, [values])

export default useCashBuyData
