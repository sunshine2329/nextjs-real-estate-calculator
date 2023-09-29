import mongoose from 'mongoose'

export const ReportSchema = new mongoose.Schema({
  address: {
    street: { type: String, required: [true, 'Please provide a address'], unique: true },
    city: { type: String, required: [true, 'Please provide a city'], unique: true },
    state: { type: String, required: [true, 'Please provide a state'], unique: true },
    postal_code: { type: String, required: [true, 'Please provide a ZIP code'], unique: true }
  },
  scenarios: [{ type: mongoose.Types.ObjectId, ref: 'scenarios' }],
  created: { type: Date, default: Date.now },
  updated: { type: Date }
})

const Report = mongoose.models.reports || mongoose.model('reports', ReportSchema)

export default Report
