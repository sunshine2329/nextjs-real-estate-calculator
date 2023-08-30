import mongoose from 'mongoose'

export const ScenarioSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please provide a address'] },
  loanPrincipal: { type: Number },
  annualPercentageRate: { type: Number },
  loanTerm: { type: Number },
  netOperatingIncome: { type: Number },
  purchasePrice: { type: Number },
  rehabCosts: { type: Number },
  monthlyRentalIncome: { type: Number },
  annualDebtService: { type: Number },
  cashOutlay: { type: Number },
  operatingIncome: { type: Number },
  renovationValue: { type: Number },
  estimatedRepairCosts: { type: Number },
  length: { type: Number },
  width: { type: Number },
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
