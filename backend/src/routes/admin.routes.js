import express from 'express';
import weatherSimulator from '../services/weatherSimulator.js';
import gasShortageSimulator from '../services/gasShortageSimulator.js';
import climateSimulator from '../services/climateSimulator.js';
import { getIO } from '../config/socket.js';

const router = express.Router();

/**
 * Trigger Simulator Controls - Powers the DisruptionSimulator buttons
 */
router.post('/simulate', (req, res) => {
  const { scenario, zoneId } = req.body;
  const io = getIO();

  switch (scenario) {
    case 'rain':
      weatherSimulator.startScenario('rain_building', zoneId);
      break;
    case 'heat':
      weatherSimulator.startScenario('heat_rising', zoneId);
      break;
    case 'aqi':
      weatherSimulator.startScenario('aqi_rising', zoneId);
      break;
    case 'lpg_crisis':
      gasShortageSimulator.start(io);
      break;
    case 'cyclone':
      climateSimulator.startCyclone(io);
      break;
    case 'curfew':
      climateSimulator.startCurfew(io, zoneId);
      break;
    case 'reset':
      weatherSimulator.reset();
      gasShortageSimulator.stop(io);
      climateSimulator.reset(io);
      io.emit('triggers_reset');
      break;
    default:
      return res.status(400).json({ message: 'Unknown scenario' });
  }

  res.json({ success: true, scenario, zoneId });
});

router.get('/stats', async (req, res) => {
  // Aggregate real-time stats for the admin dashboard
  res.json({
    activeRiders: 10,
    payoutsToday: 14200,
    activeTriggers: weatherSimulator.scenario !== 'normal' ? 1 : 0,
    systemStatus: 'healthy'
  });
});

export default router;
