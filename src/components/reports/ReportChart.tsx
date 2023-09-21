'use client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { TScenarioCalculations } from './types'
import { useMemo } from 'react'
import { generateRandomColor } from '@/helpers'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const colors: string[] = []

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Comparing Real State by Scenarios'
    }
  }
}

const ReportChart = ({ values = [] }: { values: (TScenarioCalculations & { name: string })[] }) => {
  const data = useMemo(() => {
    if (colors.length < values.length) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Array.from(Array(values.length - colors.length).keys()).forEach(_ =>
        colors.push(generateRandomColor())
      )
    }
    return {
      labels: [
        'Net income over 30 years',
        'Appreciation over 30 years',
        'Rental Rate Increase over 30 years'
      ],
      datasets: values.map(({ name, netIncome, appreciation, rentalRateIncrease }, index) => ({
        label: name,
        backgroundColor: colors[index],
        data: [netIncome, appreciation, rentalRateIncrease]
      }))
    }
  }, [values])

  return <Bar options={options} data={data} />
}

export default ReportChart
