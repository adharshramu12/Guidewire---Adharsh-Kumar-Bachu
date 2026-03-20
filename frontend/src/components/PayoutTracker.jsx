import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useSocket } from '../hooks/useSocket';

export default function PayoutTracker() {
  const [total, setTotal] = useState(0);
  const { socket } = useSocket();

  const spring = useSpring(0, { stiffness: 45, damping: 25 });
  const displayTotal = useTransform(spring, (current) => 
    Math.floor(current).toLocaleString('en-IN')
  );

  useEffect(() => {
    if (!socket) return;
    socket.on('payout_processed', (data) => {
      setTotal(prev => prev + (data.amount || 400));
    });
    return () => socket.off('payout_processed');
  }, [socket]);

  useEffect(() => {
    spring.set(total);
  }, [total, spring]);

  return (
    <div className="bg-[#070d1f] p-7 h-full rounded-xl flex flex-col justify-between relative overflow-hidden group"
      style={{ border: '1px solid rgba(255,255,255,0.04)' }}
    >
      {/* Aurora blob background */}
      <div className="absolute top-[-30%] right-[-20%] w-40 h-40 rounded-full pointer-events-none aurora-blob"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />
      <div className="absolute bottom-[-20%] left-[-10%] w-32 h-32 rounded-full pointer-events-none aurora-blob"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', filter: 'blur(30px)', animationDelay: '3s' }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-[9px] text-emerald-400 uppercase tracking-[0.15em] font-bold">Settled Capital</p>
            <p className="text-[8px] text-slate-600 uppercase tracking-widest font-bold mt-1">Operational Reserve v5</p>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-emerald-400 text-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(6,182,212,0.04) 100%)',
              border: '1px solid rgba(16,185,129,0.1)',
            }}
          >
            ₹
          </div>
        </div>

        <div className="flex items-baseline gap-2 mt-5">
          <motion.span className="text-5xl font-display font-extrabold text-white tracking-tighter">
            {displayTotal}
          </motion.span>
          <span className="text-lg font-display font-extrabold text-slate-700">INR</span>
        </div>
      </div>
      
      <div className="space-y-3 relative z-10">
        <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Efficiency</span>
            <span className="text-[10px] font-bold text-emerald-400">62.8%</span>
        </div>
        <div className="h-1.5 w-full bg-[#151b2d] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: '0%' }}
            animate={{ width: '62.8%' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #4edea3 0%, #4cd7f6 60%, #6366f1 100%)' }}
          />
        </div>
      </div>
    </div>
  );
}
