import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { LOSS_RATIO_DATA } from '../utils/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background: 'var(--gs-card)', border: '1px solid var(--gs-border)',
      borderRadius: '10px', padding: '10px 14px', fontSize: '12px',
    }}>
      <div style={{ fontWeight: 600, marginBottom: '4px' }}>{d.date}</div>
      <div style={{ color: 'var(--gs-orange)' }}>Loss Ratio: {d.ratio.toFixed(1)}%</div>
      <div style={{ color: 'var(--gs-t2)' }}>Claims: {d.claims}</div>
      <div style={{ color: 'var(--gs-t2)' }}>Payout: ₹{d.payout.toLocaleString('en-IN')}</div>
    </div>
  );
};

export default function LossRatioChart() {
  return (
    <div className="gs-card" style={{ padding: '20px' }}>
      <h3 style={{ fontFamily: 'var(--fh)', fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>
        Loss Ratio — Last 30 Days
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={LOSS_RATIO_DATA} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
          <defs>
            <linearGradient id="lrGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF6B2B" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FF6B2B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#3D4F6B' }} axisLine={false} tickLine={false} interval={6} />
          <YAxis domain={[60, 120]} tick={{ fontSize: 10, fill: '#3D4F6B' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={95} stroke="#FF6B2B" strokeDasharray="4 4" strokeOpacity={0.5} label={{ value: 'Target 95%', position: 'right', fontSize: 10, fill: '#FF6B2B' }} />
          <ReferenceLine y={100} stroke="#FF3D5A" strokeDasharray="2 2" strokeOpacity={0.3} />
          <Area type="monotone" dataKey="ratio" stroke="#FF6B2B" strokeWidth={2} fill="url(#lrGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
