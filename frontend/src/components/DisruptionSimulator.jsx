import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { adminApi } from '../utils/api';

const SCENARIOS = [
  { id: 'rain', label: 'Monsoon', icon: '🌧️', zones: ['VJA-GWTR'], color: '#3B82F6' },
  { id: 'heat', label: 'Heat Surge', icon: '🔥', zones: ['ATP-MAIN'], color: '#FF6B2B' },
  { id: 'aqi', label: 'AQI Alert', icon: '🌫️', zones: ['VSP-MVRD'], color: '#6B7280' },
  { id: 'cyclone', label: 'Cyclone', icon: '🌀', zones: ['VSP-MVRD'], color: '#8B5CF6' },
  { id: 'curfew', label: 'Curfew', icon: '🚨', zones: ['GNT-MAIN'], color: '#FFB800' }
];

export default function DisruptionSimulator() {
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSimulate = async (scenario, zoneId) => {
    setLoading(true);
    setActive(scenario);
    try {
      await adminApi.simulate(scenario, zoneId);
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setLoading(true);
    try {
      await adminApi.simulate('reset');
      setActive(null);
    } catch (err) {
      console.error('Reset error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#070d1f] px-2 py-2 rounded-xl flex items-center gap-2 max-w-full h-full relative overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.04)' }}
    >
      
      <div className="px-5 border-r border-white/[0.06] hidden xl:flex items-center">
        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 whitespace-nowrap">Environmental Overrides</p>
      </div>

      <div className="flex-1 flex gap-1.5 overflow-x-auto no-scrollbar px-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            disabled={loading}
            onClick={() => handleSimulate(s.id, s.zones[0])}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl transition-all duration-300 relative border shrink-0"
            style={active === s.id ? {
              background: `${s.color}12`,
              borderColor: `${s.color}30`,
              boxShadow: `0 0 16px ${s.color}15`,
            } : {
              borderColor: 'transparent',
            }}
            onMouseEnter={e => { if (active !== s.id) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
            onMouseLeave={e => { if (active !== s.id) e.currentTarget.style.background = 'transparent'; }}
          >
            <span className="text-sm">{s.icon}</span>
            <span className={`text-[10px] font-bold uppercase tracking-tight transition-colors ${active === s.id ? 'text-white' : 'text-slate-500'}`}>
              {s.label}
            </span>
          </button>
        ))}
      </div>

      <div className="h-8 w-px bg-white/[0.06] mx-1" />

      <button
        disabled={loading}
        onClick={() => handleSimulate('lpg_crisis', null)}
        className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl transition-all shrink-0"
        style={{
          background: 'rgba(255,61,90,0.08)',
          border: '1px solid rgba(255,61,90,0.15)',
        }}
      >
        <span className="text-sm">🏭</span>
        <span className="text-[10px] font-bold text-red-400 uppercase tracking-tight">LPG Shortfall</span>
      </button>

      <button
        onClick={handleReset}
        className="px-5 text-[9px] font-bold text-slate-600 hover:text-emerald-400 uppercase tracking-widest transition-colors shrink-0"
      >
        Reset
      </button>
    </div>
  );
}
