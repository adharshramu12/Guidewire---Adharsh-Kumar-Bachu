import express from 'express';
import Worker from '../models/worker.model.js';
import Claim from '../models/claim.model.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const worker = await Worker.findOne({ id: req.params.id });
    if (!worker) return res.status(404).json({ message: 'Worker not found' });
    res.json(worker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id/activity', async (req, res) => {
  try {
    const claims = await Claim.find({ worker_id: req.params.id }).sort({ createdAt: -1 }).limit(10);
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const worker = await Worker.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(worker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
