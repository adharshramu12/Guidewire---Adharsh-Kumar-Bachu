import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GigScoreMeter from '../components/GigScoreMeter';
import { workerApi } from '../utils/api';
import AuroraBlobs from '../components/AuroraBlobs';

export default function GigScorePage() {
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await workerApi.getProfile('RK001');
        setWorker(data);
      } catch (err) {
        console.error('Fetch error, falling back to mock data:', err);
        import('../utils/mockData').then(({ CURRENT_WORKER }) => {
          setWorker(CURRENT_WORKER);
        });
      }
    };
    fetch();
  }, []);

  if (!worker) return (
    <div className="h-screen bg-[#0c1324] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full animate-spin" style={{ border: '2px solid rgba(16,185,129,0.15)', borderTopColor: '#4edea3' }} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0c1324] p-6 lg:p-12 flex flex-col items-center relative overflow-hidden">
      
      <AuroraBlobs variant="default" />

      <div className="w-full max-w-6xl relative z-10">
        
        <header className="mb-20 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-extrabold"
              style={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(6,182,212,0.05) 100%)',
                color: '#4edea3',
                border: '1px solid rgba(16,185,129,0.1)',
              }}
            >
              G
            </div>
            <div>
              <h1 className="font-display font-extrabold text-4xl text-fintech tracking-tight">Portable GigScore</h1>
              <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-[0.2em] font-bold opacity-60">
                 Inter-Platform Reputation Asset v5.0
              </p>
            </div>
          </div>
          <button className="btn-secondary px-8 py-3.5 text-xs uppercase tracking-widest text-emerald-400 hover:text-white transition-all">
            Export Financial Certificate
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="gradient-border p-12 relative group overflow-hidden"
              style={{ borderRadius: '48px' }}
            >
              <div className="relative z-10">
                <GigScoreMeter score={worker.gigScore} />
                
                <div className="mt-12 pt-12 space-y-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-tight">
                    <span className="text-slate-500">Premium Discount</span>
                    <span className="text-emerald-400 px-3 py-1 rounded-lg"
                      style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.12)' }}
                    >15.0% APPLIED</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-tight">
                    <span className="text-slate-500">Settlement Priority</span>
                    <span className="text-emerald-400 flex items-center gap-2">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                      </span>
                      TIER 1 ELITE
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
               <h2 className="text-5xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
                 The universal standard for <span className="text-aurora italic">Giger Credit.</span>
               </h2>
               <p className="text-slate-400 text-lg leading-relaxed font-medium opacity-80">
                 Your GigScore is a multi-dimensional reputation asset. It tracks your behavioral integrity across all platforms, creating a financial signal that banks and insurers trust.
               </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { label: 'Network Reliability', value: '99.4%', icon: '🚀' },
                { label: 'Community Trust', value: 'Verified', icon: '🛡️' },
                { label: 'Settlement Integrity', value: 'High', icon: '💎' },
                { label: 'Activity Baseline', value: '2.4 yrs', icon: '📈' }
              ].map((item, i) => (
                <div key={i} className="glass rounded-xl p-6 flex gap-5 items-center group cursor-default transition-all hover:border-emerald-500/10"
                  style={{ border: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform"
                    style={{
                      background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(6,182,212,0.04) 100%)',
                      border: '1px solid rgba(16,185,129,0.08)',
                    }}
                  >{item.icon}</div>
                  <div>
                    <p className="text-[9px] text-slate-500 uppercase tracking-[0.15em] font-bold opacity-60">{item.label}</p>
                    <p className="text-base font-display font-extrabold text-white mt-1">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-xl relative overflow-hidden group glass-emerald">
              <div className="absolute top-[-20%] right-[-20%] w-32 h-32 rounded-full group-hover:scale-150 transition-transform duration-1000 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)', filter: 'blur(30px)' }}
              />
              <p className="text-sm font-display font-bold text-white flex items-center gap-4 relative z-10 leading-relaxed">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" style={{ boxShadow: '0 0 10px #10b981' }} />
                </span>
                Mudra Micro-Credit: You are eligible for an instant bridge loan of ₹25,000 based on your current score.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
