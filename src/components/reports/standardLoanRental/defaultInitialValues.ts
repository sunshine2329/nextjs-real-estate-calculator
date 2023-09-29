import { TStandardLoanRental } from '@/types'

const defaultInitialValues: TStandardLoanRental = {
  _id: '',
  // Purchase Information
  purchase_price: 200000,
  use_loan: true,
  down_payment: 20,
  interest_rate: 6,
  loan_term: 30,
  closing_cost: 6000,
  need_repairs: false,
  repair_cost: 20000,
  value_after_repairs: 260000,

  // Income
  monthly_rent: 2000,
  annual_increase_monthly_rent: 3,
  other_monthly_income: 0,
  annual_increase_other_monthly_income: 3,
  vacancy_rate: 5,
  management_fee: 0,

  // Recurring Operating Expenses
  property_tax: 3000,
  annual_increase_property_tax: 3,
  total_insurance: 1200,
  annual_increase_total_insurance: 3,
  hoa_fee: 0,
  annual_increase_hoa_fee: 3,
  maintenance: 2000,
  annual_increase_maintenance: 3,
  other_costs: 500,
  annual_increase_other_costs: 3,

  // Sell
  know_sell_price: false,
  sell_price: 4000,
  value_appreciation: 3,
  holding_length: 20,
  cost_to_sell: 8
}

export default defaultInitialValues
