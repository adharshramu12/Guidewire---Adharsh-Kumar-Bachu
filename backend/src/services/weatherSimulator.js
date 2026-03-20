/**
 * ── GigShield Weather Simulator ────────────────────────────────────────
 * Simulates gradual environmental changes across AP zones.
 * Powers the "Live Map" animations (rain, heat, smog).
 * ────────────────────────────────────────────────────────────────────────
 */

import { EventEmitter } from 'events';

class WeatherSimulator extends EventEmitter {
  constructor() {
    super();
    // Default baseline state for AP zones (8 cities)
    this.state = {
      'VJA-GWTR': { rainfall_mmhr: 2.4, temp_c: 32.1, humidity: 68, aqi: 142 },
      'VJA-BENZ': { rainfall_mmhr: 1.8, temp_c: 32.5, humidity: 65, aqi: 128 },
      'ATP-MAIN': { rainfall_mmhr: 0.2, temp_c: 41.8, humidity: 35, aqi: 168 },
      'ATP-SUBR': { rainfall_mmhr: 0.1, temp_c: 42.1, humidity: 33, aqi: 172 },
      'GNT-MAIN': { rainfall_mmhr: 1.9, temp_c: 33.4, humidity: 70, aqi: 145 },
      'TPT-MAIN': { rainfall_mmhr: 1.5, temp_c: 30.2, humidity: 63, aqi: 118 },
      'VSP-MVRD': { rainfall_mmhr: 1.4, temp_c: 28.8, humidity: 76, aqi: 125 },
      'VSP-BPTN': { rainfall_mmhr: 1.8, temp_c: 27.9, humidity: 80, aqi: 98  },
      'NLR-MAIN': { rainfall_mmhr: 1.9, temp_c: 34.8, humidity: 68, aqi: 138 },
      'KNL-MAIN': { rainfall_mmhr: 0.8, temp_c: 38.1, humidity: 42, aqi: 162 }
    };

    this.scenario = 'normal'; // normal | rain_building | heat_rising | aqi_rising
    this.targetZone = null;
    this.progress = 0;
  }

  /**
   * Starts a gradual transition scenario
   */
  startScenario(type, zoneId) {
    this.scenario = type;
    this.targetZone = zoneId;
    this.progress = 0;
    console.log(`[WeatherSim] 🌩️ Starting scenario: ${type} in ${zoneId}`);
  }

  /**
   * Simulation Tick (Called by server loop)
   */
  tick(io) {
    // Add natural variance to all zones
    Object.keys(this.state).forEach(zoneId => {
      this.state[zoneId].rainfall_mmhr += (Math.random() - 0.5) * 0.1;
      this.state[zoneId].temp_c += (Math.random() - 0.5) * 0.05;
      this.state[zoneId].rainfall_mmhr = Math.max(0, this.state[zoneId].rainfall_mmhr);
    });

    // Handle active scenarios
    if (this.scenario !== 'normal' && this.targetZone) {
      const zone = this.state[this.targetZone];
      if (zone) {
        this.progress += 0.05;

        if (this.scenario === 'rain_building') {
          zone.rainfall_mmhr = 2.4 + (this.progress * 35); // 0 to 37.4
          zone.humidity = Math.min(100, 68 + (this.progress * 30));
          zone.temp_c -= this.progress * 0.5; // temp drops with rain
        } 
        else if (this.scenario === 'heat_rising') {
          zone.temp_c = 41.8 + (this.progress * 7); // up to 48.8°C
          zone.humidity -= this.progress * 5;
        }
        else if (this.scenario === 'aqi_rising') {
          zone.aqi = 168 + (this.progress * 250); // up to 418
        }

        // Trigger threshold events
        this.checkThresholds(io, this.targetZone, zone);
      }
    }

    // Broadcast state
    io.emit('weather_update', this.state);
  }

  checkThresholds(io, zoneId, zone) {
    // Rainfall Trigger (Threshold: 15mm/hr)
    if (zone.rainfall_mmhr > 15 && this.progress >= 0.4) {
      io.emit('threshold_crossed', {
        zoneId,
        type: 'rainfall',
        value: zone.rainfall_mmhr,
        threshold: 15,
        severity: zone.rainfall_mmhr > 30 ? 'severe' : 'moderate'
      });
    }

    // Heat Trigger (Threshold: 45°C)
    if (zone.temp_c > 45 && this.progress >= 0.5) {
      io.emit('threshold_crossed', {
        zoneId,
        type: 'heat',
        value: zone.temp_c,
        threshold: 45,
        severity: 'severe'
      });
    }

    // AQI Trigger (Threshold: 300)
    if (zone.aqi > 300 && this.progress >= 0.6) {
      io.emit('threshold_crossed', {
        zoneId,
        type: 'aqi',
        value: zone.aqi,
        threshold: 300,
        severity: 'hazardous'
      });
    }
  }

  reset() {
    this.scenario = 'normal';
    this.targetZone = null;
    this.progress = 0;
    console.log('[WeatherSim] ☀️ Reset to normal conditions');
  }
}

const weatherSimulator = new WeatherSimulator();
export default weatherSimulator;
