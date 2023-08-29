'use client'

import { CalculatorSection, ContainerWithPageTitle, Address } from '@/components'

const CalculatorPage = () => {
  return (
    <ContainerWithPageTitle title="New Calculation" toRedirect="/calculations">
      <CalculatorSection title="" className="bg-transparent">
        <Address />
      </CalculatorSection>
    </ContainerWithPageTitle>
  )
}

export default CalculatorPage
