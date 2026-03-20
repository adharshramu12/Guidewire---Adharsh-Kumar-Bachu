import express from 'express';
import Worker from '../models/worker.model.js';

const router = express.Router();

/**
 * Enterprise-grade Auth: Mock OTP validation with Mongoose persistence
 */
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  console.log(`[Auth] OTP 123456 sent to ${phone}`);
  res.json({ success: true, message: 'OTP sent successfully' });
});

router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  
  if (otp !== '123456') {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }

  try {
    const worker = await Worker.findOne({ phone });
    if (!worker) {
      return res.status(404).json({ success: false, message: 'Worker not found' });
    }
    
    // In production, sign JWT here
    res.json({ success: true, worker, token: 'mock_enterprise_jwt_token' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
