'use client'

import { CalculatorTypes, ContainerWithPageTitle, ScenarioName } from '@/components'
import CashBuyCalculator from '@/components/reports/cashBuy/CashBuyCalculator'
import StandardLoanRentalCalculator from '@/components/reports/standardLoanRental/StandardLoanRentalCalculator'
import useScenario from '@/providers/reports/useScenario'
import { TCalculator, TScenarioParams } from '@/types'
import { useEffect, useState } from 'react'

const ScenarioPage = ({ params }: { params: TScenarioParams }) => {
  const { scenario, cashBuy, standardLoanRental, loading, mutate } = useScenario(params)
  const [type, setType] = useState<TCalculator>('cash_buy')
  useEffect(() => {
    mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (loading && !scenario) {
    return <p>loading...</p>
  }
  return (
    <ContainerWithPageTitle title={'Scenario'} toRedirect={`/reports/${params.reportId}`}>
      {!loading && !scenario && <p>No Data</p>}
      {!loading && scenario && <ScenarioName params={params} scenario={scenario} />}
      {scenario && (
        <>
          <CalculatorTypes type={type} changeCalculator={setType} />
          {type === 'cash_buy' && (
            <CashBuyCalculator
              reportId={params.reportId}
              scenarioId={params.scenarioId}
              calculatorId={cashBuy ? cashBuy._id : null}
              initialValues={cashBuy}
            />
          )}
          {type === 'standard_loan_rental' && (
            <StandardLoanRentalCalculator
              reportId={params.reportId}
              scenarioId={params.scenarioId}
              calculatorId={standardLoanRental ? standardLoanRental._id : null}
              initialValues={standardLoanRental}
            />
          )}
        </>
      )}
    </ContainerWithPageTitle>
  )
}

export default ScenarioPage
