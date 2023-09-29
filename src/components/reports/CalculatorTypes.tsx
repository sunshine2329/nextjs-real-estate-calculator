import { TCalculator } from '@/types'

const CalculatorTypes = ({
  type,
  changeCalculator
}: {
  type: TCalculator
  changeCalculator: (type: TCalculator) => void
}) => {
  const calculatorTab = (calculator: TCalculator, label: string) => (
    <a
      className={`tab tab-lifted ${type === calculator ? 'tab-active' : ''}`}
      onClick={() => changeCalculator(calculator)}
    >
      {label}
    </a>
  )
  return (
    <div className="tabs">
      {calculatorTab('cash_buy', 'Cash Buy')}
      {calculatorTab('standard_loan_rental', 'Standard Loan Rental')}
    </div>
  )
}

export default CalculatorTypes
