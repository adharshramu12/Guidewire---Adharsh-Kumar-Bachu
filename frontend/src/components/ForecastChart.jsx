import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FORECAST_DATA } from '../utils/mockData';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background: 'var(--gs-card)', border: '1px solid var(--gs-border)',
      borderRadius: '10px', padding: '10px 14px', fontSize: '12px',
    }}>
      <div style={{ fontWeight: 600, marginBottom: '4px' }}>{d.day}</div>
      <div style={{ color: 'var(--gs-green)' }}>Expected: ₹{d.amount.toLocaleString('en-IN')}</div>
      <div style={{ color: 'var(--gs-t2)' }}>Rain chance: {d.rain}%</div>
      <div style={{ color: 'var(--gs-t2)' }}>Confidence: {(d.confidence * 100).toFixed(0)}%</div>
    </div>
  );
};

export default function ForecastChart() {
  return (
    <div className="gs-card" style={{ padding: '20px' }}>
      <h3 style={{ fontFamily: 'var(--fh)', fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>
        Predicted Payouts — Next 7 Days
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={FORECAST_DATA} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
          <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#3D4F6B' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#3D4F6B' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
            {FORECAST_DATA.map((entry, i) => (
              <Cell key={i} fill={entry.rain > 60 ? '#00D4AA' : entry.rain > 30 ? '#00D4AAAA' : '#00D4AA66'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
