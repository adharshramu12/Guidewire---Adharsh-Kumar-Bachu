import mongoose from 'mongoose';

const gigScoreSchema = new mongoose.Schema({
  worker_id: { type: String, ref: 'Worker', required: true },
  score: { type: Number, required: true },
  change_reason: { type: String },
  recorded_at: { type: Date, default: Date.now }
});

const GigScore = mongoose.model('GigScore', gigScoreSchema);
export default GigScore;
