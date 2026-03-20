import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const workerId = req.query.workerId;
  res.json([
    { id: 'CLM-001', workerId, triggerLabel: 'Heavy Rain', amount: 400, status: 'paid', timestamp: '2026-03-15T16:15:00Z', payoutTime: '3.8 min' },
    { id: 'CLM-002', workerId, triggerLabel: 'Extreme Heat', amount: 350, status: 'paid', timestamp: '2026-03-12T13:00:00Z', payoutTime: '4.2 min' },
  ]);
});

router.post('/', (req, res) => {
  const { workerId, triggerType, zoneId } = req.body;
  // This is where ML fraud check would happen
  
  const claim = {
    id: `CLM-${Math.floor(Math.random() * 10000)}`,
    workerId,
    triggerType,
    zoneId,
    amount: 400,
    status: 'processing', // fraud check pending
    timestamp: new Date().toISOString()
  };

  const io = req.app.get('io');
  if (io) {
    // Notify admin
    io.to('admin_room').emit('new_claim', claim);
    // Notify worker
    io.to(`worker_${workerId}`).emit('claim_status_update', claim);
  }

  // Auto-approve after 2 seconds (mocking ML service response)
  setTimeout(() => {
    claim.status = 'approved';
    if (io) io.to(`worker_${workerId}`).emit('claim_status_update', claim);
    
    // Auto-pay after another 1.5 seconds (mocking UPI transfer)
    setTimeout(() => {
      claim.status = 'paid';
      claim.payoutTime = '3.5 min'; // mock fast payout
      if (io) io.to(`worker_${workerId}`).emit('claim_status_update', claim);
    }, 1500);
  }, 2000);

  res.json({ success: true, claim });
});

export default router;
