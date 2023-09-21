import mongoose from 'mongoose'

// Net Operating Income = Revenue – Operating Expenses

export const ScenarioSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please provide a address'] },

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

const ReportSchema = new mongoose.Schema({
  address: {
    street: { type: String, required: [true, 'Please provide a address'], unique: true },
    city: { type: String, required: [true, 'Please provide a city'], unique: true },
    state: { type: String, required: [true, 'Please provide a state'], unique: true },
    postal_code: { type: String, required: [true, 'Please provide a ZIP code'], unique: true }
  },
  scenarios: [ScenarioSchema],
  created: { type: Date, default: Date.now },
  updated: { type: Date }
})

const Report = mongoose.models.reports || mongoose.model('reports', ReportSchema)

export default Report
