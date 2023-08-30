import mongoose from 'mongoose'

// Net Operating Income = Revenue – Operating Expenses

export const ScenarioSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please provide a address'] },

  purchase_price: { type: Number, default: 0 },
  closing_costs: { type: Number, default: 0 },
  finder_fee_cost: { type: Number, default: 0 },
  rehab_expense: { type: Number, default: 0 },
  gross_rental_income: { type: Number, default: 0 },
  maintenance: { type: Number, default: 0 },
  vacancy: { type: Number, default: 0 },
  management: { type: Number, default: 0 },
  capital_expenses: { type: Number, default: 0 },
  annual_taxes: { type: Number, default: 0 },
  annual_insurance: { type: Number, default: 0 },
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
