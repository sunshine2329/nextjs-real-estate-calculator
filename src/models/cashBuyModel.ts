import mongoose from 'mongoose'

// Net Operating Income = Revenue – Operating Expenses

export const CashBuySchema = new mongoose.Schema({
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

const CashBuy = mongoose.models.cashbuys || mongoose.model('cashbuys', CashBuySchema)

export default CashBuy
