import mongoose from 'mongoose'

export const StandardLoanRentalSchema = new mongoose.Schema({
  purchase_price: { type: Number, default: 0 },
  use_loan: { type: Boolean, default: true },
  down_payment: { type: Number, default: 0 },
  interest_rate: { type: Number, default: 0 },
  loan_term: { type: Number, default: 0 },
  closing_cost: { type: Number, default: 0 },
  need_repairs: { type: Boolean, default: false },
  repair_cost: { type: Number, default: 0 },
  value_after_repairs: { type: Number, default: 0 },
  monthly_rent: { type: Number, default: 0 },
  annual_increase_monthly_rent: { type: Number, default: 0 },
  other_monthly_income: { type: Number, default: 0 },
  annual_increase_other_monthly_income: { type: Number, default: 0 },
  vacancy_rate: { type: Number, default: 0 },
  management_fee: { type: Number, default: 0 },
  property_tax: { type: Number, default: 0 },
  annual_increase_property_tax: { type: Number, default: 0 },
  total_insurance: { type: Number, default: 0 },
  annual_increase_total_insurance: { type: Number, default: 0 },
  hoa_fee: { type: Number, default: 0 },
  annual_increase_hoa_fee: { type: Number, default: 0 },
  maintenance: { type: Number, default: 0 },
  annual_increase_maintenance: { type: Number, default: 0 },
  other_costs: { type: Number, default: 0 },
  annual_increase_other_costs: { type: Number, default: 0 },
  know_sell_price: { type: Boolean, default: false },
  sell_price: { type: Number, default: 0 },
  value_appreciation: { type: Number, default: 0 },
  holding_length: { type: Number, default: 0 },
  cost_to_sell: { type: Number, default: 0 },
  created: { type: Date, default: Date.now },
  updated: { type: Date }
})

const StandardLoanRental =
  mongoose.models.standardloanrentals ||
  mongoose.model('standardloanrentals', StandardLoanRentalSchema)

export default StandardLoanRental
