import express from 'express';

const router = express.Router();

// Get active triggers across platforms
router.get('/active', (req, res) => {
  // In a real app this pulls from Redis/DB
  // Mocking an active heatwave in Kukatpally
  res.json({
    success: true,
    activeTriggers: [
      {
        id: 'TRG-HEAT-001',
        type: 'extreme_heat',
        zone: 'HYD-KUKA',
        value: 44,
        threshold: 43,
        metric: '°C',
        timestamp: new Date().toISOString()
      }
    ]
  });
});

// Demo: Manually fire a trigger (used by the simulator)
router.post('/fire', (req, res) => {
  const { type, zone, overrideValue } = req.body;
  
  const triggerEvent = {
    id: `TRG-SIM-${Date.now()}`,
    type,
    zone: zone || 'HYD-KOND',
    value: overrideValue || 999, // Threshold breached
    isSimulation: true,
    timestamp: new Date().toISOString()
  };

  const io = req.app.get('io');
  if (io) {
    io.emit('trigger_alert', triggerEvent);
    console.log(`[API] Trigger fired: ${type} in ${triggerEvent.zone}`);
  }

  res.json({ success: true, event: triggerEvent });
});

export default router;
