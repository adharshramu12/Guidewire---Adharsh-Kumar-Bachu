/**
 * ── GigShield Gas Shortage Simulator ──────────────────────────────────
 * Simulates localized restaurant closures due to LPG supply disruptions.
 * Operates on a multi-zone "contagion" model during scenarios.
 * ────────────────────────────────────────────────────────────────────────
 */

class GasShortageSimulator {
  constructor() {
    this.zoneStates = {};
    this.active = false;
    this.interval = null;
    
    // Static base restaurant data per zone
    this.registry = {
      'VJA-GWTR': { total: 280, online: 280, rate: 8 },
      'VJA-BENZ': { total: 520, online: 520, rate: 15 },
      'ATP-MAIN': { total: 195, online: 195, rate: 5 },
      'GNT-MAIN': { total: 310, online: 310, rate: 8 },
      'VSP-MVRD': { total: 380, online: 380, rate: 10 }
    };
  }

  /**
   * Starts a gas shortage scenario spreading across zones
   */
  start(io) {
    if (this.active) return;
    this.active = true;
    
    // Initialize zone states from registry
    Object.entries(this.registry).forEach(([id, data]) => {
      this.zoneStates[id] = { ...data, triggered: false };
    });

    console.log('[GasSim] ⛽ LPG Crisis started — Monitoring restaurant availability');

    this.interval = setInterval(() => {
      Object.entries(this.zoneStates).forEach(([zoneId, state]) => {
        // Restaurants go offline gradually
        const minOnlinePct = 0.35; // 35% floor
        const currentOnline = state.online;
        const targetMin = Math.floor(state.total * minOnlinePct);
        
        if (currentOnline > targetMin) {
          state.online = Math.max(targetMin, currentOnline - state.rate);
        }

        const offlinePct = ((state.total - state.online) / state.total) * 100;

        // Broadcast specific restaurant update
        io.emit('restaurant_update', {
          zoneId,
          totalRestaurants: state.total,
          onlineCount: state.online,
          offlineCount: state.total - state.online,
          offlinePct: offlinePct.toFixed(1),
          reason: 'LPG Supply Disruption — Regional Hub Delay'
        });

        // Threshold Triggers
        if (offlinePct >= 30 && offlinePct < 35) {
          io.emit('gas_shortage_warning', {
            zoneId,
            offlinePct: offlinePct.toFixed(1),
            message: `⚠️ Increasing restaurant closures: ${offlinePct.toFixed(0)}% offline`
          });
        }

        if (offlinePct >= 40 && !state.triggered) {
          state.triggered = true;
          io.emit('threshold_crossed', {
            zoneId,
            type: 'restaurant',
            value: offlinePct,
            threshold: 40,
            severity: offlinePct > 60 ? 'severe' : 'moderate',
            detail: `LPG Crisis — ${offlinePct.toFixed(0)}% Restaurants Offline`
          });
        }
      });
    }, 2000);
  }

  /**
   * Resets the simulation to baseline
   */
  stop(io) {
    if (this.interval) clearInterval(this.interval);
    this.active = false;
    this.zoneStates = {};
    io.emit('gas_shortage_reset');
    console.log('[GasSim] 🍽️ All restaurants back online');
  }
}

const gasShortageSimulator = new GasShortageSimulator();
export default gasShortageSimulator;
