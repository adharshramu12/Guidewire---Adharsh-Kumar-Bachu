import React from 'react';
import { motion } from 'framer-motion';
import { FRAUD_ALERTS } from '../utils/mockData';
import { AlertTriangle, Eye, XCircle, Search } from 'lucide-react';

const statusIcons = {
  manual_review: { icon: <Eye size={14} />, badge: 'gs-badge-amber', label: 'Manual Review' },
  auto_rejected: { icon: <XCircle size={14} />, badge: 'gs-badge-red', label: 'Auto-Rejected' },
  cleared: { icon: <Search size={14} />, badge: 'gs-badge-green', label: 'Cleared' },
};

export default function FraudFeed() {
  return (
    <div>
      {/* Stats row */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {[
          { label: 'Flagged Today', value: '3', color: 'var(--gs-amber)' },
          { label: 'Auto-Rejected', value: '2', color: 'var(--gs-red)' },
          { label: 'Manual Review', value: '1', color: 'var(--gs-amber)' },
        ].map((s, i) => (
          <div key={i} className="gs-card" style={{ flex: 1, textAlign: 'center', padding: '14px' }}>
            <div style={{ fontFamily: 'var(--fh)', fontSize: '24px', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: 'var(--gs-t3)', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Fraud alerts list */}
      {FRAUD_ALERTS.map((alert, i) => {
        const config = statusIcons[alert.status] || statusIcons.manual_review;
        return (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="gs-card"
            style={{
              marginBottom: '10px', borderLeft: `3px solid var(--gs-red)`,
              display: 'flex', flexDirection: 'column', gap: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,61,90,0.1)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <AlertTriangle size={16} color="var(--gs-red)" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{alert.workerName}</div>
                  <div style={{ fontSize: '11px', color: 'var(--gs-t3)' }}>
                    {alert.workerId} • {new Date(alert.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: 'var(--fh)', fontSize: '18px', fontWeight: 800,
                  color: alert.score > 0.9 ? 'var(--gs-red)' : 'var(--gs-amber)',
                }}>
                  {alert.score.toFixed(2)}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--gs-t3)' }}>Fraud Score</div>
              </div>
            </div>

            <div style={{
              fontSize: '13px', color: 'var(--gs-t2)', padding: '8px 12px',
              background: 'var(--gs-surface)', borderRadius: '8px',
            }}>
              {alert.reason}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className={`gs-badge ${config.badge}`} style={{ fontSize: '11px' }}>
                {config.icon} {config.label}
              </span>
              {alert.status === 'manual_review' && (
                <button className="gs-btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>
                  Review
                </button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
