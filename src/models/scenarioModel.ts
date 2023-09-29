import mongoose from 'mongoose'

export const ScenarioSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please provide a Scenario Name'] },
  cash_buy: { type: mongoose.Types.ObjectId, ref: 'cashbuys' },
  standard_loan_rental: { type: mongoose.Types.ObjectId, ref: 'standardloanrentals' }
})

const Scenario = mongoose.models.scenarios || mongoose.model('scenarios', ScenarioSchema)

export default Scenario
