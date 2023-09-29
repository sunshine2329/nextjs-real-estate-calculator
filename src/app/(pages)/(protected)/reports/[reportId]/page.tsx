'use client'
import {
  CalculatorSection,
  ContainerWithPageTitle,
  Address,
  Button,
  CalculatorTypes
} from '@/components'
import CashBuyReport from '@/components/reports/cashBuy/CashBuyReport'
import StandardLoanRentalReport from '@/components/reports/standardLoanRental/StandardLoanRentalReport'
import useReport from '@/providers/reports/useReport'
import Link from 'next/link'
import { useEffect } from 'react'

const ReportPage = ({ params: { reportId } }: { params: { reportId: string } }) => {
  const {
    report,
    type,
    scenarios,
    cashBuys,
    standardLoanRentals,
    changeCalculator,
    loading,
    mutate
  } = useReport({ reportId })
  useEffect(() => {
    mutate()
  }, [])

  const renderActions = () => (
    <Link href={`/reports/${reportId}/scenarios/create`}>
      <Button color="default">Add Scenario</Button>
    </Link>
  )
  return (
    <ContainerWithPageTitle title="Report" actions={renderActions()} toRedirect="/reports">
      {loading && !report && <p>Loading...</p>}
      {!loading && report && (
        <>
          <CalculatorSection title="Property Information" className="bg-transparent">
            <Address reportId={reportId} initialValues={report.address} />
          </CalculatorSection>
          <CalculatorTypes type={type} changeCalculator={changeCalculator} />
          {type === 'cash_buy' && (
            <CashBuyReport reportId={reportId} scenarios={scenarios} cashBuys={cashBuys} />
          )}
          {type === 'standard_loan_rental' && (
            <StandardLoanRentalReport
              reportId={reportId}
              scenarios={scenarios}
              standardLoanRentals={standardLoanRentals}
            />
          )}
        </>
      )}
      {!loading && !report && <p>Not Found Data.</p>}
    </ContainerWithPageTitle>
  )
}

export default ReportPage
