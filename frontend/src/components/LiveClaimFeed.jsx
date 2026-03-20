import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../hooks/useSocket';

export default function LiveClaimFeed() {
  const [claims, setClaims] = useState([]);
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleNewClaim = (claim) => {
      setClaims(prev => [
        { ...claim, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), id: Math.random(), isNew: true },
        ...prev.slice(0, 19)
      ]);
      // Remove isNew flag after animation
      setTimeout(() => {
        setClaims(prev => prev.map(c => ({ ...c, isNew: false })));
      }, 600);
    };

    socket.on('claim_created', handleNewClaim);
    socket.on('payout_processed', (data) => {
      setClaims(prev => prev.map(c => 
        c.riderId === data.riderId ? { ...c, approved: true } : c
      ));
    });

    return () => {
      socket.off('claim_created');
      socket.off('payout_processed');
    };
  }, [socket]);

  return (
    <div className="flex flex-col h-full bg-[#070d1f] rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="p-5 bg-white/[0.01]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-extrabold text-white text-xs tracking-tight flex items-center gap-2">
              Claims Ledger
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
              </span>
            </h2>
            <p className="text-[9px] text-slate-500 mt-1 uppercase tracking-[0.15em] font-bold">Parametric Events</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
        <AnimatePresence initial={false}>
          {claims.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20">
               <div className="text-2xl mb-4">🔍</div>
               <p className="text-[9px] font-bold uppercase tracking-[0.2em]">Monitoring Network...</p>
            </div>
          ) : (
            claims.map((claim) => (
              <motion.div
                layout
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                key={claim.id}
                className={`p-3 rounded-2xl transition-all duration-300 ${
                  claim.isNew ? 'animate-entry-flash' : ''
                } ${
                  claim.approved 
                  ? 'bg-emerald-500/[0.04]' 
                  : 'bg-white/[0.01]'
                }`}
                style={{
                  border: claim.approved 
                    ? '1px solid rgba(78,222,163,0.1)' 
                    : '1px solid rgba(255,255,255,0.03)',
                }}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${claim.approved ? 'bg-emerald-500' : 'bg-yellow-500 animate-pulse'}`} />
                    <span className={`text-[8px] font-bold uppercase tracking-widest ${claim.approved ? 'text-emerald-400' : 'text-yellow-500'}`}>
                      {claim.approved ? 'SETTLED' : 'AUDITING'}
                    </span>
                  </div>
                  <span className="text-[8px] text-slate-600 font-mono">
                    {claim.timestamp}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-200 truncate">
                      {claim.workerName}
                    </p>
                    <p className="text-[8px] text-slate-600 font-bold mt-0.5 uppercase tracking-tight">
                       {claim.type} · Hub_{claim.claimId?.split('-')[1]}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-display font-extrabold ${claim.approved ? 'text-emerald-400' : 'text-white'}`}>
                      ₹{claim.amount}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
