import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Wallet, ArrowUpRight } from 'lucide-react';

export default function PayoutConfirmation({ amount = 400, worker = 'Ravi Kumar', upiId = 'ravi.kumar@paytm', time = '3.8 min' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="gs-card"
      style={{ textAlign: 'center', padding: '28px 20px', border: '1px solid rgba(0,212,170,0.2)', background: 'rgba(0,212,170,0.04)' }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
        style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'rgba(0,212,170,0.15)', margin: '0 auto 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <CheckCircle size={28} color="var(--gs-green)" />
      </motion.div>

      <div style={{ fontSize: '13px', color: 'var(--gs-green)', fontWeight: 600, marginBottom: '4px' }}>
        PAYOUT SUCCESSFUL
      </div>
      <div style={{ fontFamily: 'var(--fh)', fontSize: '36px', fontWeight: 800, color: 'var(--gs-green)', marginBottom: '4px' }}>
        ₹{amount}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--gs-t2)', marginBottom: '16px' }}>
        Credited to {worker}'s UPI
      </div>

      <div style={{ background: 'var(--gs-surface)', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
          <span style={{ color: 'var(--gs-t3)' }}>UPI ID</span>
          <span style={{ color: 'var(--gs-t2)' }}>{upiId}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
          <span style={{ color: 'var(--gs-t3)' }}>Processing Time</span>
          <span style={{ color: 'var(--gs-green)' }}>{time}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
          <span style={{ color: 'var(--gs-t3)' }}>Razorpay Ref</span>
          <span style={{ color: 'var(--gs-t2)' }}>PAY_{Date.now().toString(36).toUpperCase()}</span>
        </div>
      </div>
    </motion.div>
  );
}
