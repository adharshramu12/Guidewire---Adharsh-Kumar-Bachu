/**
 * ── GigShield Climate & Crisis Simulator ──────────────────────────────
 * High-impact event simulator for Cyclones and Curfews.
 * Specialized for the Vizag coastline and urban AP centers.
 * ────────────────────────────────────────────────────────────────────────
 */

class ClimateSimulator {
  constructor() {
    this.activeEvents = new Set();
    this.vizagCyclone = { intensity: 0, active: false };
    this.urbanCurfew = { active: false, zoneId: null };
  }

  /**
   * Starts a Cyclone simulation for Visakhapatnam zones
   */
  startCyclone(io) {
    if (this.vizagCyclone.active) return;
    this.vizagCyclone.active = true;
    this.vizagCyclone.intensity = 0;
    
    console.log('[ClimateSim] 🌀 Cyclone ' + (Math.random() > 0.5 ? 'Phethai' : 'Hudhud') + ' moving towards Vizag coast');

    const interval = setInterval(() => {
      this.vizagCyclone.intensity += 0.05;
      
      const impact = {
        intensity: this.vizagCyclone.intensity.toFixed(2),
        affectedZones: ['VSP-MVRD', 'VSP-BPTN'],
        windSpeed: (80 + this.vizagCyclone.intensity * 120).toFixed(0), // km/h
        status: this.vizagCyclone.intensity > 0.7 ? 'severe' : 'forming'
      };

      io.emit('climate_event', { type: 'cyclone', ...impact });

      if (this.vizagCyclone.intensity >= 1.0) {
        io.emit('threshold_crossed', {
          zoneId: 'VSP-MVRD',
          type: 'cyclone',
          value: impact.windSpeed,
          threshold: 120,
          severity: 'severe',
          detail: 'Super Cyclone Impact — Vizag MVP Colony'
        });
        clearInterval(interval);
      }
    }, 2000);
  }

  /**
   * Triggers a localized curfew (Section 144) impact
   */
  startCurfew(io, zoneId) {
    console.log(`[ClimateSim] 🚔 Section 144 imposed in ${zoneId}`);
    
    io.emit('threshold_crossed', {
      zoneId,
      type: 'curfew',
      value: 1,
      threshold: 0.5,
      severity: 'high',
      detail: 'Public Safety Curfew — Mobile Deliveries Suspended'
    });
  }

  reset(io) {
    this.vizagCyclone = { intensity: 0, active: false };
    this.urbanCurfew = { active: false, zoneId: null };
    io.emit('climate_reset');
    console.log('[ClimateSim] ☀️ All climate scenarios cleared');
  }
}

const climateSimulator = new ClimateSimulator();
export default climateSimulator;
