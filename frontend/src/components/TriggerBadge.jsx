import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function TriggerBadge({ active = false, type = 'heavy_rain', message = '' }) {
  if (!active) {
    return (
      <div style={{
        background: 'rgba(0,212,170,0.06)', border: '1px solid rgba(0,212,170,0.15)',
        borderRadius: '12px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gs-green)' }} />
        <span style={{ fontSize: '13px', color: 'var(--gs-green)', fontWeight: 500 }}>
          ✓ All clear — No disruptions in your zone
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      style={{
        background: 'rgba(255,61,90,0.08)', border: '1px solid rgba(255,61,90,0.2)',
        borderRadius: '12px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px',
        animation: 'pulseRed 2.5s infinite',
      }}
    >
      <Zap size={18} color="var(--gs-red)" style={{ flexShrink: 0 }} />
      <span style={{ fontSize: '13px', color: 'var(--gs-red)', fontWeight: 500 }}>
        {message || 'ACTIVE: Disruption detected in your zone — claim processing'}
      </span>
    </motion.div>
  );
}
