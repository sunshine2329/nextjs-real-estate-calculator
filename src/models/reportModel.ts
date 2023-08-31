import mongoose from 'mongoose'

// Net Operating Income = Revenue – Operating Expenses

export const ScenarioSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please provide a address'] },

  purchase_price: { type: Number, default: 0 },
  gross_annual_income: { type: Number, default: 0 },
  rental_increase: { type: Number, default: 0 },
  expenses_increase: { type: Number, default: 0 },
  tax_rate: { type: Number, default: 0 },
  insurance_rate: { type: Number, default: 0 },
  maintenance_rate: { type: Number, default: 0 },
  management_rate: { type: Number, default: 0 },
  vacancy_rate: { type: Number, default: 0 },
  capital_rate: { type: Number, default: 0 },
  appreciation_rate: { type: Number, default: 0 },
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
