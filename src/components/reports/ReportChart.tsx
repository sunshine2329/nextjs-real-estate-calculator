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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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
  const getValuesForScenario = (scenario: TScenarioValues) => {
    const {
      name,
      purchase_price,
      closing_costs,
      finder_fee_cost,
      rehab_expense,
      gross_rental_income,
      maintenance,
      vacancy,
      management,
      capital_expenses,
      annual_taxes,
      annual_insurance
    } = scenario
    const totalCashIn = purchase_price + closing_costs + finder_fee_cost + rehab_expense

    const rentalExpenses =
      (gross_rental_income * (maintenance + vacancy + management + capital_expenses)) / 100

    const grossIncome = gross_rental_income * 12
    const netIncome = grossIncome - rentalExpenses * 12 - annual_taxes - annual_insurance

    const cocReturn = (netIncome / totalCashIn) * 100
    return { name, netIncome, purchase_price, vacancy, cocReturn }
  }
  const data = useMemo(() => {
    const values = scenarios.map(getValuesForScenario)
    return {
      labels: values.map(scenario => scenario.name),
      datasets: [
        {
          label: 'Net income over 30 years',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          data: values.map(scenario => scenario.netIncome * 30)
        },
        {
          label: 'Appreciation over 30 years',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          data: values.map(
            scenario => scenario.purchase_price * Math.pow(scenario.vacancy / 100 + 1, 30)
          )
        },
        {
          label: 'Rental rate increase over 30 years * rental income',
          backgroundColor: 'rgba(rgba(123, 135, 132, 0.5)',
          data: values.map(scenario => scenario.cocReturn * scenario.netIncome * 30)
        }
      ]
    }
  }, [scenarios])
  console.log(data)
  return <Bar options={options} data={data} />
}

export default ReportChart
