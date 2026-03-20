import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertTriangle, CreditCard, Zap } from 'lucide-react';

const steps = [
  { key: 'detected', label: 'Disruption Detected', icon: Zap, desc: 'Trigger threshold breached' },
  { key: 'verified', label: 'Auto-Verified', icon: CheckCircle, desc: 'GPS + Zone + Platform validated' },
  { key: 'approved', label: 'Claim Approved', icon: CheckCircle, desc: 'Fraud check passed' },
  { key: 'payout', label: 'Payout Initiated', icon: CreditCard, desc: 'UPI transfer processing' },
  { key: 'completed', label: 'Completed', icon: CheckCircle, desc: 'Amount credited to UPI' },
];

const getActiveStep = (status) => {
  const map = { processing: 2, approved: 3, paid: 4, flagged: 1 };
  return map[status] || 0;
};

export default function ClaimTimeline({ claim }) {
  const activeStep = getActiveStep(claim?.status);

  return (
    <div className="gs-card" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontFamily: 'var(--fh)', fontSize: '14px', fontWeight: 600 }}>{claim?.triggerLabel || 'Claim Processing'}</span>
        <span style={{ fontFamily: 'var(--fh)', fontSize: '18px', fontWeight: 700, color: 'var(--gs-green)' }}>₹{claim?.amount || 400}</span>
      </div>

      <div style={{ position: 'relative', paddingLeft: '24px' }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute', left: '7px', top: '4px', bottom: '4px', width: '2px',
          background: 'var(--gs-border)',
        }} />

        {steps.map((step, i) => {
          const isCompleted = i <= activeStep;
          const isCurrent = i === activeStep;
          const Icon = step.icon;

          return (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                marginBottom: i < steps.length - 1 ? '16px' : 0,
                position: 'relative',
              }}
            >
              {/* Dot */}
              <div style={{
                width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                background: isCompleted ? 'var(--gs-green)' : 'var(--gs-surface)',
                border: `2px solid ${isCompleted ? 'var(--gs-green)' : 'var(--gs-border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1,
                ...(isCurrent ? { animation: 'pulseGreen 2s infinite' } : {}),
              }}>
                {isCompleted && <CheckCircle size={10} color="#080D1A" />}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: isCompleted ? 600 : 400, color: isCompleted ? 'var(--gs-t1)' : 'var(--gs-t3)' }}>
                  {step.label}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--gs-t3)' }}>{step.desc}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {claim?.payoutTime && (
        <div style={{
          marginTop: '16px', padding: '10px 14px', background: 'rgba(0,212,170,0.06)',
          borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px',
          fontSize: '13px', color: 'var(--gs-green)', fontWeight: 500,
        }}>
          <Clock size={14} /> Payout completed in {claim.payoutTime}
        </div>
      )}
    </div>
  );
}
