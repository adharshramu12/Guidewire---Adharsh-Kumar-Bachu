import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LiveMap from '../components/LiveMap';
import RiderPanel from '../components/RiderPanel';
import LiveClaimFeed from '../components/LiveClaimFeed';
import DisruptionSimulator from '../components/DisruptionSimulator';
import WhatsAppPreview from '../components/WhatsAppPreview';
import PayoutTracker from '../components/PayoutTracker';
import { useSocket } from '../hooks/useSocket';

export default function AdminDashboard() {
  const [selectedRider, setSelectedRider] = useState(null);
  const [riders, setRiders] = useState([]);
  const [activeTab, setActiveTab] = useState('Network');
  const { socket, connected } = useSocket();

  React.useEffect(() => {
    if (!socket) return;
    socket.on('rider_positions', setRiders);
    return () => socket.off('rider_positions');
  }, [socket]);

  return (
    <div className="h-screen w-screen flex bg-[#0c1324] overflow-hidden text-white">
      
      {/* ── Navigation Rail ────────────────────────────────────────── */}
      <aside className="w-20 hidden md:flex flex-col items-center py-8 border-r border-white/[0.04] bg-[#070d1f] z-50">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#020617] font-display font-extrabold text-xl mb-12 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #6ffbbe 0%, #10b981 50%, #059669 100%)',
            boxShadow: '0 0 24px rgba(16,185,129,0.25)',
          }}
        >
          G
        </div>
        <nav className="flex-1 flex flex-col gap-6">
          {[
            { id: 'Network', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
            { id: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
            { id: 'Registry', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                activeTab === item.id 
                  ? 'text-emerald-400 font-black relative' 
                  : 'text-slate-600 hover:text-slate-300'
              }`}
              style={activeTab === item.id ? {
                background: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(6,182,212,0.06) 100%)',
                boxShadow: '0 0 20px rgba(16,185,129,0.1), inset 0 0 0 1px rgba(16,185,129,0.15)',
              } : {}}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === item.id ? 2.5 : 1.5} d={item.icon} />
              </svg>
            </button>
          ))}
        </nav>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-white/[0.04]" />
      </aside>

      {/* ── Main Viewport ──────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 border-b border-white/[0.04] flex items-center justify-between px-10 bg-[#0c1324]/80 backdrop-blur-xl relative overflow-hidden">
          {/* Subtle aurora in header */}
          <div className="absolute top-0 left-0 w-64 h-32 bg-emerald-500/[0.03] blur-[60px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <h1 className="text-xl font-display font-extrabold text-white tracking-tight">{activeTab} Dispatch Hub</h1>
            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-[0.2em] font-bold">Cluster: ANDHRA_PRADESH_SOUTH_1</p>
          </div>

          <div className="flex items-center gap-8 relative z-10">
             <div className="text-right flex flex-col">
               <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Global Status</span>
               <span className="text-sm font-bold text-emerald-400 flex items-center gap-2 justify-end">
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${connected ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${connected ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  </span>
                  PLATFORM NOMINAL
               </span>
             </div>
             <div className="h-10 w-px bg-white/[0.04]" />
             <div className="flex flex-col">
                <span className="text-[14px] font-display font-extrabold text-aurora">DEVTrails 2026</span>
                <span className="text-[9px] text-slate-500 uppercase font-bold">Infrastructure v5.0</span>
             </div>
          </div>
        </header>

        {/* Dashboard Layout */}
        <main className="flex-1 flex overflow-hidden p-5 gap-5 relative">
          
          {/* Dot grid background */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          {/* Left Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-[340px] flex flex-col gap-5"
          >
            <div className="flex-1 overflow-hidden rounded-xl">
              <RiderPanel 
                riders={riders} 
                onRiderClick={setSelectedRider} 
                selectedRiderId={selectedRider?.id} 
              />
            </div>
            <div className="h-60 rounded-xl overflow-hidden">
              <WhatsAppPreview />
            </div>
          </motion.div>

          {/* Center Panel: Map */}
          <div className="flex-1 flex flex-col gap-5">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 rounded-xl overflow-hidden relative gradient-border"
            >
              <div className="absolute inset-0">
                <LiveMap 
                  onRiderClick={setSelectedRider}
                  onZoneClick={(zone) => console.log('Zone:', zone)}
                />
              </div>
              <div className="absolute top-6 left-6 glass-emerald px-4 py-2 rounded-2xl z-10 pointer-events-none">
                 <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-[0.15em]">Real-time Telemetry</p>
              </div>
            </motion.div>
            
            <div className="h-24">
              <DisruptionSimulator />
            </div>
          </div>

          {/* Right Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-[360px] flex flex-col gap-5"
          >
            <div className="h-[210px] rounded-xl overflow-hidden">
              <PayoutTracker />
            </div>
            <div className="flex-1 rounded-xl overflow-hidden">
              <LiveClaimFeed />
            </div>
          </motion.div>

        </main>

        {/* System Bar */}
        <footer className="h-8 border-t border-white/[0.04] bg-[#070d1f] flex items-center justify-between px-10 text-[9px] text-slate-600 font-bold uppercase tracking-[0.15em] z-50">
           <div className="flex gap-10">
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-40"/>REGION: AP_S1</span>
              <span>NETWORK_UID: GS_HUB_0x42A</span>
              <span>ENC: AES-256-GCM</span>
           </div>
           <div>© 2026 GIGSHIELD PARAMETRIC · MISSION CRITICAL INFRASTRUCTURE</div>
        </footer>
      </div>
    </div>
  );
}
