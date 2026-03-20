import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  worker_id: { type: String, ref: 'Worker', required: true },
  trigger_type: { type: String, required: true },
  zone_id: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['processing', 'flagged', 'approved', 'paid'], default: 'processing' },
  fraud_score: { type: Number, default: 0 },
  payout_time_mins: { type: Number },
  upi_ref: { type: String },
  paid_at: { type: Date }
}, { timestamps: true });

const Claim = mongoose.model('Claim', claimSchema);
export default Claim;
