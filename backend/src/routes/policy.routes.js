import express from 'express';
import Policy from '../models/policy.model.js';
import Worker from '../models/worker.model.js';

const router = express.Router();

router.get('/active', async (req, res) => {
  try {
    const policy = await Policy.findOne({ worker_id: req.query.workerId, status: 'active' });
    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/renew', async (req, res) => {
  const { workerId, planType } = req.body;
  try {
    const worker = await Worker.findOne({ id: workerId });
    if (!worker) return res.status(404).json({ message: 'Worker not found' });

    const policyId = `POL-${workerId.split('-')[1]}-${Date.now().toString().slice(-4)}`;
    const newPolicy = await Policy.create({
      id: policyId,
      worker_id: workerId,
      plan_type: planType || 'standard',
      weekly_premium: 29,
      coverage_start: new Date(),
      coverage_end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    
    res.json({ success: true, policy: newPolicy });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
