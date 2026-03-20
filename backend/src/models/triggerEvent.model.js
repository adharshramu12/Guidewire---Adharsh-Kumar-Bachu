import mongoose from 'mongoose';

const triggerEventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true }, // rain, heat, aqi, restaurant, cyclone, curfew
  zone_id: { type: String, required: true },
  threshold_value: { type: Number, required: true },
  actual_value: { type: Number, required: true },
  severity: { type: String, enum: ['moderate', 'severe', 'hazardous'], default: 'moderate' },
  status: { type: String, enum: ['active', 'resolved'], default: 'active' }
}, { timestamps: true });

const TriggerEvent = mongoose.model('TriggerEvent', triggerEventSchema);
export default TriggerEvent;
