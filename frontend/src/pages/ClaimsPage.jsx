import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertTriangle, ArrowUpRight, IndianRupee } from 'lucide-react';
import { ACTIVE_CLAIMS } from '../utils/mockData';
import { useAuth } from '../hooks/useAuth';
import BottomNav from '../components/BottomNav';
import ClaimTimeline from '../components/ClaimTimeline';

const statusConfig = {
  approved: { label: 'Auto-Approved', badge: 'gs-badge-green', icon: <CheckCircle size={14} /> },
  paid: { label: 'Paid', badge: 'gs-badge-green', icon: <CheckCircle size={14} /> },
  processing: { label: 'Processing', badge: 'gs-badge-amber', icon: <Clock size={14} /> },
  flagged: { label: 'Under Review', badge: 'gs-badge-red', icon: <AlertTriangle size={14} /> },
};

export default function ClaimsPage() {
  const { worker } = useAuth();
  const workerClaims = ACTIVE_CLAIMS.filter(c => c.workerId === 'WKR-001');
  const allClaims = workerClaims.length > 0 ? workerClaims : ACTIVE_CLAIMS.slice(0, 3);

  const stats = {
    total: allClaims.length,
    totalPaid: allClaims.filter(c => c.status === 'approved' || c.status === 'paid').reduce((a, c) => a + c.amount, 0),
    avgTime: '3.8 min',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gs-bg)', paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--gs-border)' }}>
        <h1 style={{ fontFamily: 'var(--fh)', fontSize: '24px', fontWeight: 700 }}>My Claims</h1>
        <p style={{ color: 'var(--gs-t2)', fontSize: '13px' }}>Auto-filed claims and payout status</p>
      </div>

      <div style={{ padding: '20px' }}>
        {/* Stats Row */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: 'Total Claims', value: stats.total, color: 'var(--gs-t1)' },
            { label: 'Amount Paid', value: `₹${stats.totalPaid.toLocaleString('en-IN')}`, color: 'var(--gs-green)' },
            { label: 'Avg Payout', value: stats.avgTime, color: 'var(--gs-orange)' },
          ].map((s, i) => (
            <div key={i} className="gs-card" style={{ flex: 1, textAlign: 'center', padding: '16px 12px' }}>
              <div style={{ fontFamily: 'var(--fh)', fontSize: '20px', fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '11px', color: 'var(--gs-t3)', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Active Claim Timeline */}
        {allClaims.some(c => c.status === 'processing' || c.status === 'approved') && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h3 style={{ fontFamily: 'var(--fh)', fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Active Claim</h3>
            <ClaimTimeline claim={allClaims.find(c => c.status === 'processing') || allClaims[0]} />
          </motion.div>
        )}

        {/* All Claims */}
        <h3 style={{ fontFamily: 'var(--fh)', fontSize: '16px', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>All Claims</h3>
        {allClaims.map((claim, i) => {
          const config = statusConfig[claim.status] || statusConfig.processing;
          return (
            <motion.div
              key={claim.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="gs-card"
              style={{ marginBottom: '10px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{claim.triggerLabel}</div>
                  <div style={{ fontSize: '12px', color: 'var(--gs-t3)', marginTop: '2px' }}>
                    {claim.id} · {new Date(claim.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <span className={`gs-badge ${config.badge}`} style={{ fontSize: '11px' }}>
                  {config.icon} {config.label}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '13px', color: 'var(--gs-t2)' }}>Zone: {claim.zone}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontFamily: 'var(--fh)', fontSize: '18px', fontWeight: 700, color: 'var(--gs-green)' }}>₹{claim.amount}</span>
                  {claim.payoutTime && <span style={{ fontSize: '11px', color: 'var(--gs-t3)' }}>({claim.payoutTime})</span>}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <BottomNav active="claims" />
    </div>
  );
}
