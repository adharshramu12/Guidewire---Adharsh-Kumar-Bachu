import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RiderPanel({ riders, onRiderClick, selectedRiderId }) {
  const cities = ['All Clusters', ...new Set(riders.map(r => r.city))];
  const [filter, setFilter] = React.useState('All Clusters');

  const filteredRiders = filter === 'All Clusters' 
    ? riders 
    : riders.filter(r => r.city === filter);

  return (
    <div className="flex flex-col h-full bg-[#070d1f] rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="p-5 bg-white/[0.01]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display font-extrabold text-white text-xs tracking-tight flex items-center gap-2">
              Network Pulse
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
            </h2>
            <p className="text-[9px] text-slate-500 mt-1 uppercase tracking-[0.15em] font-bold">Active Hub Nodes</p>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-lg font-bold"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(6,182,212,0.05) 100%)',
              color: '#4edea3',
              border: '1px solid rgba(16,185,129,0.15)',
            }}
          >
            {riders.length} LIVE
          </span>
        </div>
        
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {cities.map(city => (
            <button
              key={city}
              onClick={() => setFilter(city)}
              className="text-[9px] px-3 py-1.5 rounded-lg transition-all capitalize whitespace-nowrap font-bold tracking-tight"
              style={filter === city ? {
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#020617',
                boxShadow: '0 4px 12px rgba(16,185,129,0.25)',
              } : {
                background: 'rgba(255,255,255,0.03)',
                color: '#94a3b8',
              }}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
        <AnimatePresence>
          {filteredRiders.map((rider) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              key={rider.id}
              onClick={() => onRiderClick(rider)}
              className="p-3 rounded-2xl cursor-pointer transition-all duration-200 relative group"
              style={{
                background: selectedRiderId === rider.id ? 'rgba(16,185,129,0.06)' : 'transparent',
                border: selectedRiderId === rider.id 
                  ? '1px solid rgba(16,185,129,0.15)' 
                  : '1px solid transparent',
              }}
              onMouseEnter={e => { if (selectedRiderId !== rider.id) { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; }}}
              onMouseLeave={e => { if (selectedRiderId !== rider.id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-extrabold ${
                  rider.status === 'claim_processing' 
                    ? 'bg-red-500/15 text-red-400' 
                    : 'text-emerald-400'
                }`}
                  style={rider.status !== 'claim_processing' ? {
                    background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(6,182,212,0.05) 100%)',
                  } : {}}
                >
                  {rider.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className={`text-xs font-bold truncate ${selectedRiderId === rider.id ? 'text-emerald-400' : 'text-slate-200'}`}>
                      {rider.name}
                    </p>
                    <span className={`text-[7px] px-1.5 py-0.5 rounded font-bold tracking-widest ${
                      rider.platform === 'zomato' ? 'bg-red-500/10 text-red-400' : 'bg-orange-500/10 text-orange-400'
                    }`}
                      style={{ border: `1px solid ${rider.platform === 'zomato' ? 'rgba(239,68,68,0.1)' : 'rgba(249,115,22,0.1)'}` }}
                    >
                      {rider.platform.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-1 h-1 rounded-full ${
                      rider.status === 'delivering' ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'
                    }`} />
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tight">{rider.status.replace('_', ' ')}</span>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-extrabold text-slate-300">{rider.gigScore}</p>
                   <p className="text-[7px] text-slate-600 font-bold uppercase tracking-widest">SCORE</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
