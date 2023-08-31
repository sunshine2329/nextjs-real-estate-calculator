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
import { TScenarioValues } from './types'
import { useMemo } from 'react'
import getFinancialCalculations from './getFinancialCalculations'
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

const ReportChart = ({ scenarios = [] }: { scenarios: TScenarioValues[] }) => {
  const data = useMemo(() => {
    if (colors.length < scenarios.length) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Array.from(Array(scenarios.length - colors.length).keys()).forEach(_ =>
        colors.push(generateRandomColor())
      )
    }
    const values = scenarios.map(scenario => ({
      ...getFinancialCalculations(scenario, 30),
      name: scenario.name
    }))
    console.log(values)
    return {
      labels: [
        'Net income over 30 years',
        'Appreciation over 30 years',
        'Rental Income over 30 years'
      ],
      datasets: values.map(({ name, netIncome, appreciation, rentalIncome }, index) => ({
        label: name,
        backgroundColor: colors[index],
        data: [netIncome, appreciation, rentalIncome]
      }))
    }
  }, [scenarios])
  console.log(data)
  return <Bar options={options} data={data} />
}

export default ReportChart
