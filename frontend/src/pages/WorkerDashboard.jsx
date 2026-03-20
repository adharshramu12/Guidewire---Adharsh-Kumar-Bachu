import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../hooks/useSocket';
import { workerApi, policyApi } from '../utils/api';
import LiveMap from '../components/LiveMap';
import GigScoreMeter from '../components/GigScoreMeter';
import AuroraBlobs from '../components/AuroraBlobs';

export default function WorkerDashboard() {
  const [worker, setWorker] = useState(null);
  const [activity, setActivity] = useState([]);
  const { socket } = useSocket();

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        const { data: w } = await workerApi.getProfile('RK001');
        setWorker(w);
        const { data: a } = await workerApi.getActivity('RK001');
        setActivity(a);
      } catch (err) {
        console.error('Fetch error, falling back to mock data:', err);
        import('../utils/mockData').then(({ CURRENT_WORKER, ACTIVE_CLAIMS }) => {
          setWorker(CURRENT_WORKER);
          setActivity(ACTIVE_CLAIMS.filter(c => c.workerId === CURRENT_WORKER.id));
        });
      }
    };
    fetchWorkerData();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('payout_processed', (data) => {
      if (data.riderId === 'RK001') {
         workerApi.getActivity('RK001').then(({ data: a }) => setActivity(a));
      }
    });
    return () => socket.off('payout_processed');
  }, [socket]);

  if (!worker) return (
    <div className="h-screen bg-[#0c1324] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full animate-spin" style={{
        border: '2px solid rgba(16,185,129,0.15)',
        borderTopColor: '#4edea3',
      }} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0c1324] text-white">
      
      {/* ── Header ────────────────────────────────────────────── */}
      <header className="py-12 px-6 md:px-12 relative overflow-hidden">
        <AuroraBlobs variant="subtle" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="hud-badge text-emerald-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                Secured Node
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                AP_S1 Cluster
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-fintech">Namaste, {worker.name.split(' ')[0]}</h1>
            <p className="text-slate-400 mt-3 font-medium">Your income is protected. Maintain high trust to unlock enterprise benefits.</p>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="text-right">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Coverage Status</p>
                <p className="text-sm font-bold text-emerald-400 flex items-center gap-2 justify-end">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  TOTAL SHIELD ACTIVE
                </p>
             </div>
             <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
               style={{
                 background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(6,182,212,0.04) 100%)',
                 border: '1px solid rgba(16,185,129,0.1)',
               }}
             >
                🛡️
             </div>
          </div>
        </div>
        {/* Bottom separator — gradient line instead of solid border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </header>

      {/* ── Main ────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Financials */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Active Policy Card */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-8 rounded-xl relative overflow-hidden group cursor-default"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
                color: '#020617',
                boxShadow: '0 20px 50px rgba(16,185,129,0.25)',
              }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 translate-x-10 -translate-y-10 rotate-45 group-hover:scale-125 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 -translate-x-6 translate-y-6 rounded-full group-hover:scale-150 transition-transform duration-700" />
              
              <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] opacity-40 mb-8 relative z-10">Active Guarantee</p>
              <div className="mb-10 relative z-10">
                <h3 className="text-4xl font-display font-extrabold tracking-tighter">₹400</h3>
                <p className="text-xs font-bold uppercase tracking-widest opacity-60 mt-1">Per Climatic Disruption</p>
              </div>
              <div className="pt-8 border-t border-black/10 flex flex-col gap-4 relative z-10">
                 <div className="flex justify-between text-[11px] font-bold uppercase">
                    <span className="opacity-40">Weekly Premium</span>
                    <span>₹29.00</span>
                 </div>
                 <div className="flex justify-between text-[11px] font-bold uppercase">
                    <span className="opacity-40">Next Renewal</span>
                    <span>In 4 Days</span>
                 </div>
              </div>
            </motion.div>

            {/* Trust Meter Card */}
            <div className="glass rounded-xl p-10 relative group">
               <GigScoreMeter score={worker.gigScore} />
               <div className="mt-10 p-6 rounded-2xl group-hover:border-emerald-500/10 transition-all"
                 style={{
                   background: 'rgba(255,255,255,0.02)',
                   border: '1px solid rgba(255,255,255,0.04)',
                 }}
               >
                  <p className="text-[11px] font-medium text-slate-400 leading-relaxed text-center">
                    Maintain an <span className="text-white font-bold">Elite</span> score to unlock instant Mudra credit up to ₹50,000.
                  </p>
               </div>
            </div>
          </div>

          {/* Right: Telemetry & Feed */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Live Visual Telemetry */}
            <div className="h-[460px] rounded-xl overflow-hidden relative group gradient-border">
               <div className="absolute top-6 left-6 z-10 glass-emerald px-5 py-2 rounded-2xl">
                  <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-[0.15em]">Live Hub: {worker.city}</p>
               </div>
               <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <LiveMap />
               </div>
            </div>

            {/* Financial Timeline */}
            <div className="glass p-10 rounded-xl">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-xl font-display font-extrabold text-white tracking-tight">Financial Timeline</h3>
                  <p className="text-[9px] text-slate-500 mt-1 uppercase tracking-[0.15em] font-bold">Verified Payout Events</p>
                </div>
                <button className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors">
                  Download Export (PDF)
                </button>
              </div>

              <div className="space-y-3">
                <AnimatePresence>
                  {activity.length > 0 ? activity.slice(0, 4).map((claim, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-5 rounded-2xl group cursor-default transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.01)',
                        border: '1px solid rgba(255,255,255,0.04)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(16,185,129,0.03)';
                        e.currentTarget.style.borderColor = 'rgba(16,185,129,0.08)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
                      }}
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform"
                          style={{
                            background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(6,182,212,0.04) 100%)',
                            border: '1px solid rgba(16,185,129,0.08)',
                          }}
                        >
                          💸
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white uppercase tracking-tight">{claim.trigger_type} PAYOUT</p>
                          <p className="text-[9px] text-slate-500 font-bold mt-1 uppercase tracking-[0.15em]">
                             {new Date(claim.createdAt).toLocaleDateString()} · TX_0x{idx + 104}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                         <span className="text-lg font-display font-extrabold text-emerald-400">+₹{claim.amount}</span>
                         <p className="text-[8px] text-emerald-500/40 font-bold uppercase tracking-widest mt-1">SUCCESS</p>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="py-20 text-center opacity-20">
                       <p className="text-[10px] font-bold uppercase tracking-[0.3em]">No recent activity observed</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>

        </div>
      </main>

      <footer className="py-16 opacity-20 text-center">
         <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />
         <p className="text-[10px] font-bold uppercase tracking-[0.4em]">GigShield Operational Network AP_S1</p>
      </footer>
    </div>
  );
}
