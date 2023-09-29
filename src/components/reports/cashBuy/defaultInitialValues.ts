import { TCashBuy } from '@/types'

const defaultInitialValues: TCashBuy = {
  _id: '',
  purchase_price: 100000,
  gross_annual_income: 12000,
  rental_increase: 2,
  expenses_increase: 3,
  tax_rate: 3,
  insurance_rate: 0.5,
  maintenance_rate: 10,
  management_rate: 10,
  vacancy_rate: 10,
  capital_rate: 5,
  appreciation_rate: 3
}

export default defaultInitialValues
