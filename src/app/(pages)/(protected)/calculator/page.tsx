'use client'

import {
  CalculatorSection,
  ContainerWithPageTitle,
  FinancialReport,
  TFinancialReportFormValues
} from '@/components'

const scenarios: TFinancialReportFormValues[] = [
  {
    // name: 'Current Analysis',
    marketValue: 1000000,
    rentalIncome: 50000,
    maintenanceCosts: 5000,
    propertyTaxes: 8000,
    insurance: 2000,
    vacancyRate: 5
  },
  {
    // name: 'Low Pro Forma Analysis',
    marketValue: 900000,
    rentalIncome: 45000,
    maintenanceCosts: 6000,
    propertyTaxes: 8500,
    insurance: 2500,
    vacancyRate: 10
  },
  {
    // name: 'High Pro Forma Analysis',
    marketValue: 1100000,
    rentalIncome: 55000,
    maintenanceCosts: 4000,
    propertyTaxes: 7500,
    insurance: 1800,
    vacancyRate: 3
  }
]

const CalculatorPage = () => {
  return (
    <ContainerWithPageTitle title="Calculator">
      <CalculatorSection title="Property Information" className="bg-transparent">
        <div className="flex space-x-4 mb-4">
          <h3>Property Address</h3>
          <span>123 Main St, Orange California 92911</span>
        </div>
      </CalculatorSection>
      <div className="flex flex-wrap items-stretch mx-auto">
        <FinancialReport
          title="Scenario 1: Current Analysis"
          initialValues={scenarios[0]}
          className="flex-1"
        />
        <FinancialReport
          title="Scenario 2: Low Pro Forma Analysis"
          initialValues={scenarios[1]}
          className="flex-1"
        />
        <FinancialReport
          title="Scenario 3: High Pro Forma Analysis"
          initialValues={scenarios[2]}
          className="flex-1"
        />
      </div>
    </ContainerWithPageTitle>
  )
}

export default CalculatorPage
