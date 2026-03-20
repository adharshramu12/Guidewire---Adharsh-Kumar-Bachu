import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AP_CITY_CENTERS } from '../utils/apZones';
import ParticleCanvas from '../components/ParticleCanvas';
import AuroraBlobs from '../components/AuroraBlobs';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleNext = () => setStep(prev => prev + 1);

  return (
    <div className="min-h-screen bg-[#0c1324] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      <ParticleCanvas particleCount={80} />
      <AuroraBlobs variant="subtle" />
      
      <div className="w-full max-w-lg relative z-10">
        
        {/* Progress System — glowing emerald bar */}
        <div className="flex gap-3 mb-20">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: step >= s ? '100%' : '0%' }}
                 transition={{ duration: 0.5, ease: 'easeOut' }}
                 className="h-full rounded-full"
                 style={{
                   background: 'linear-gradient(90deg, #4edea3 0%, #4cd7f6 100%)',
                   boxShadow: step >= s ? '0 0 12px rgba(78,222,163,0.4)' : 'none',
                 }}
               />
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1" 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <h2 className="text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
                  Protect your <br/><span className="text-aurora">Daily Income.</span>
                </h2>
                <p className="text-slate-400 text-lg font-medium">Verify your delivery ID to activate coverage.</p>
              </div>

              <div className="space-y-6">
                 <div className="glass rounded-xl p-2 flex items-center gap-4 transition-all focus-within:border-emerald-500/20"
                   style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                 >
                    <span className="pl-6 font-extrabold text-slate-500 text-lg">+91</span>
                    <input 
                      type="tel" placeholder="Mobile Number" 
                      className="flex-1 bg-transparent p-5 text-white text-xl font-display font-extrabold focus:outline-none placeholder:text-white/10"
                      value={phone} onChange={e => setPhone(e.target.value)}
                    />
                 </div>
                 <button 
                   onClick={handleNext}
                   disabled={phone.length < 10}
                   className="btn-primary w-full disabled:opacity-30 disabled:cursor-not-allowed"
                 >
                   Verify Identity
                 </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2" 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-display font-extrabold text-white tracking-tight">Verification</h2>
                <p className="text-slate-400 text-lg font-medium">Enter the 6-digit code for <b className="text-white">+91 {phone}</b></p>
              </div>

              <div className="space-y-8">
                <div className="glass rounded-xl p-3 focus-within:border-emerald-500/20"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <input 
                    type="text" maxLength={6} placeholder="0 0 0 0 0 0" 
                    className="w-full bg-transparent p-5 text-center text-4xl font-display font-extrabold text-emerald-400 tracking-[0.5em] focus:outline-none placeholder:text-white/10"
                    value={otp} onChange={e => setOtp(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleNext}
                  disabled={otp.length < 6}
                  className="btn-primary w-full disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Confirm Code
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3" 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-display font-extrabold text-white tracking-tight leading-tight">Operating Hub</h2>
                <p className="text-slate-400 text-lg font-medium">Localization ensures correct parametric triggering.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {Object.keys(AP_CITY_CENTERS).map(c => (
                  <button 
                    key={c}
                    onClick={() => setCity(c)}
                    className="p-6 rounded-xl transition-all duration-300 text-left relative overflow-hidden group"
                    style={city === c ? {
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#020617',
                      boxShadow: '0 12px 30px rgba(16,185,129,0.3)',
                      border: '1px solid rgba(16,185,129,0.5)',
                    } : {
                      background: 'var(--glass-bg)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.04)',
                      color: '#94a3b8',
                    }}
                  >
                    <span className={`text-[8px] font-bold uppercase tracking-widest block mb-1 ${city === c ? 'opacity-40' : 'text-emerald-400'}`}>AP_Cluster</span>
                    <span className="text-lg font-display font-extrabold tracking-tight capitalize">{c}</span>
                  </button>
                ))}
              </div>

              <button 
                onClick={handleNext}
                disabled={!city}
                className="btn-primary w-full mt-4 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Confirm Deployment Zone
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4" 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="text-center space-y-12"
            >
              <div className="w-24 h-24 rounded-xl flex items-center justify-center text-5xl mx-auto animate-float relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(6,182,212,0.05) 100%)',
                  border: '1px solid rgba(16,185,129,0.15)',
                  boxShadow: '0 0 40px rgba(16,185,129,0.15)',
                }}
              >
                🛡️
              </div>
              
              <div className="space-y-4">
                <h2 className="text-5xl font-display font-extrabold text-white tracking-tight">
                  Final <span className="text-aurora">Step.</span>
                </h2>
                <p className="text-slate-400 text-lg font-medium px-10">
                  GigShield is a community-driven infrastructure. We require one final commitment.
                </p>
              </div>

              <button 
                onClick={() => navigate('/nanna-promise')}
                className="btn-primary w-full"
              >
                Seal the Bond
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
