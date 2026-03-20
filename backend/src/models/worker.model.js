import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  platform: { type: String, enum: ['zomato', 'swiggy', 'porter', 'uber'], default: 'zomato' },
  city: { type: String, required: true },
  zoneId: { type: String, required: true },
  gigScore: { type: Number, default: 500 },
  upiId: { type: String },
  onboardedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'inactive', 'on_claim'], default: 'active' },
  coverageActive: { type: Boolean, default: true }
}, { timestamps: true });

const Worker = mongoose.model('Worker', workerSchema);
export default Worker;
