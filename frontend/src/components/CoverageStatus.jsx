import React from 'react';

export default function CoverageStatus({ active = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
      <div style={{
        width: 8, height: 8, borderRadius: '50%',
        background: active ? 'var(--gs-green)' : 'var(--gs-red)',
        animation: active ? 'pulseGreen 2s infinite' : 'pulseRed 2s infinite',
      }} />
      <span style={{ fontSize: '13px', fontWeight: 600, color: active ? 'var(--gs-green)' : 'var(--gs-red)' }}>
        {active ? 'Coverage ACTIVE — Week of 17–23 Mar 2026' : 'Coverage EXPIRED — Renew now'}
      </span>
    </div>
  );
}
