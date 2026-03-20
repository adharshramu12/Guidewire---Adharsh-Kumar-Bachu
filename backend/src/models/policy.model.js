import mongoose from 'mongoose';

const policySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  worker_id: { type: String, ref: 'Worker', required: true },
  plan_type: { type: String, enum: ['lite', 'standard', 'elite'], default: 'standard' },
  status: { type: String, enum: ['active', 'expired', 'cancelled'], default: 'active' },
  weekly_premium: { type: Number, required: true },
  coverage_start: { type: Date, required: true },
  coverage_end: { type: Date, required: true },
  auto_renew: { type: Boolean, default: true }
}, { timestamps: true });

const Policy = mongoose.model('Policy', policySchema);
export default Policy;
