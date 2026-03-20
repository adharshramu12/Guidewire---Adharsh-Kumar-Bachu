import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AuroraBlobs from '../components/AuroraBlobs';

export default function NannaPromise() {
  const [pledged, setPledged] = useState(false);
  const navigate = useNavigate();

  const handlePledge = () => {
    setPledged(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#0c1324] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      <AuroraBlobs variant="hero" />

      <AnimatePresence mode="wait">
        {!pledged ? (
          <motion.div 
            key="pledge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-2xl w-full p-12 md:p-20 rounded-xl relative z-10 text-center gradient-border"
          >
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-12"
                style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(6,182,212,0.05) 100%)',
                  border: '1px solid rgba(16,185,129,0.15)',
                  boxShadow: '0 0 30px rgba(16,185,129,0.1)',
                }}
              >
                 🤝
              </div>

              <h2 className="text-5xl font-display font-extrabold text-white tracking-tight mb-10 leading-tight">
                The <span className="text-aurora italic">Nanna Promise.</span>
              </h2>

              <div className="space-y-8 text-slate-300 text-xl mb-16 font-medium leading-relaxed italic opacity-80">
                <p className="underline decoration-emerald-500/20 underline-offset-8">"నేను, నా తోటి రైడర్ల కోసం మరియు నా కుటుంబం కోసం నిజాయితీగా పని చేస్తానని ప్రమాణం చేస్తున్నాను."</p>
                <p className="text-sm opacity-40 not-italic uppercase tracking-[0.2em] font-bold">
                  A Compact of Integrity & Honor
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                 {[
                   { t: 'Integrity', d: 'No Data Fraud' },
                   { t: 'Fraternity', d: 'Support Peers' },
                   { t: 'Honesty', d: 'Zero GPS Spoofing' },
                   { t: 'Legacy', d: 'Family First' }
                 ].map(item => (
                   <div key={item.t} className="p-6 rounded-2xl text-left"
                     style={{
                       background: 'rgba(255,255,255,0.01)',
                       border: '1px solid rgba(255,255,255,0.04)',
                     }}
                   >
                      <p className="text-[10px] font-bold uppercase text-emerald-400 tracking-widest mb-1">{item.t}</p>
                      <p className="text-white font-bold">{item.d}</p>
                   </div>
                 ))}
              </div>

              <button 
                onClick={handlePledge}
                className="btn-primary w-full py-6 rounded-xl"
              >
                I Accept the Brotherhood Bond
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center relative z-10"
          >
            <div className="w-32 h-32 rounded-full flex items-center justify-center text-5xl mx-auto mb-10 relative"
              style={{
                background: 'linear-gradient(135deg, #4edea3 0%, #10b981 100%)',
                boxShadow: '0 0 80px rgba(16,185,129,0.4), 0 0 40px rgba(16,185,129,0.2)',
              }}
            >
               {/* Aurora ripple rings */}
               <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ border: '3px solid #4edea3' }} />
               <div className="absolute -inset-4 rounded-full animate-ping opacity-10" style={{ border: '2px solid #4cd7f6', animationDelay: '0.5s' }} />
               ✓
            </div>
            <h2 className="text-5xl font-display font-extrabold text-white tracking-tight mb-4">Contract Bonded.</h2>
            <p className="text-slate-500 font-bold tracking-[0.3em] uppercase text-xs">Activating Parametric Shield v5.0</p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
