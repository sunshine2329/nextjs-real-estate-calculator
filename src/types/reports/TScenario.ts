import { TObject } from './TObject'
type TScenario = TObject & {
  name: string
  cash_buy: string
  standard_loan_rental: string
}

export default TScenario
