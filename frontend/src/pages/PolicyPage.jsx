import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Calendar, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { usePremium } from '../hooks/usePremium';
import { TRIGGER_THRESHOLDS } from '../utils/triggerConfig';
import BottomNav from '../components/BottomNav';

export default function PolicyPage() {
  const { worker } = useAuth();
  const { premiumDetails } = usePremium(worker);

  const paymentHistory = [
    { date: '10 Mar 2026', amount: 29, status: 'paid', method: 'UPI Auto-pay' },
    { date: '3 Mar 2026', amount: 29, status: 'paid', method: 'WhatsApp' },
    { date: '24 Feb 2026', amount: 29, status: 'paid', method: 'UPI Auto-pay' },
    { date: '17 Feb 2026', amount: 29, status: 'paid', method: 'UPI Auto-pay' },
    { date: '10 Feb 2026', amount: 29, status: 'paid', method: 'WhatsApp' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gs-bg)', paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--gs-border)' }}>
        <h1 style={{ fontFamily: 'var(--fh)', fontSize: '24px', fontWeight: 700 }}>My Policy</h1>
        <p style={{ color: 'var(--gs-t2)', fontSize: '13px' }}>Weekly income protection coverage</p>
      </div>

      <div style={{ padding: '20px' }}>
        {/* Active Policy Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="gs-card" style={{ borderTop: '4px solid var(--gs-green)', marginBottom: '20px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield size={20} color="var(--gs-green)" />
              <span style={{ fontFamily: 'var(--fh)', fontWeight: 600 }}>Standard Plan</span>
            </div>
            <span className="gs-badge gs-badge-green" style={{ animation: 'pulseGreen 2s infinite' }}>● Active</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ color: 'var(--gs-t3)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Policy ID</div>
              <div style={{ fontWeight: 600, fontSize: '14px', marginTop: '2px' }}>POL-2026-HYD-0089</div>
            </div>
            <div>
              <div style={{ color: 'var(--gs-t3)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Weekly Premium</div>
              <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--gs-orange)', marginTop: '2px' }}>₹{premiumDetails.weeklyPremium}</div>
            </div>
            <div>
              <div style={{ color: 'var(--gs-t3)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Week</div>
              <div style={{ fontWeight: 500, fontSize: '14px', marginTop: '2px' }}>17–23 Mar 2026</div>
            </div>
            <div>
              <div style={{ color: 'var(--gs-t3)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Zone</div>
              <div style={{ fontWeight: 500, fontSize: '14px', marginTop: '2px' }}>Kondapur (500084)</div>
            </div>
          </div>

          <div style={{ marginTop: '16px', padding: '12px', background: 'var(--gs-surface)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gs-green)', fontSize: '13px', fontWeight: 500 }}>
              <RefreshCw size={14} /> Auto-renewal: Sunday 23 Mar, 9 PM via WhatsApp
            </div>
          </div>
        </motion.div>

        {/* Coverage Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 style={{ fontFamily: 'var(--fh)', fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Coverage Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            {Object.entries(TRIGGER_THRESHOLDS).map(([key, trigger]) => (
              <div key={key} className="gs-card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px' }}>
                <span style={{ fontSize: '20px' }}>{trigger.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>{trigger.label}</div>
                  <div style={{ fontSize: '11px', color: 'var(--gs-t3)' }}>
                    {trigger.metric} {trigger.threshold > 1 ? `> ${trigger.threshold}${trigger.unit}` : 'Active'}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--fh)', fontWeight: 700, color: 'var(--gs-green)', fontSize: '15px' }}>₹{trigger.payoutBase}</div>
                  <div style={{ fontSize: '10px', color: 'var(--gs-t3)' }}>per event</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Payment History */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 style={{ fontFamily: 'var(--fh)', fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Payment History</h3>
          {paymentHistory.map((p, i) => (
            <div key={i} className="gs-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '12px 16px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500 }}>{p.date}</div>
                <div style={{ fontSize: '11px', color: 'var(--gs-t3)' }}>{p.method}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--fh)', fontWeight: 600 }}>₹{p.amount}</span>
                <CheckCircle size={14} color="var(--gs-green)" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <BottomNav active="policy" />
    </div>
  );
}
