import React from 'react';
import { motion } from 'framer-motion';

const PLANS = [
  { id: 'lite', name: 'Lite', price: 19, cover: 250, color: '#94A3B8' },
  { id: 'standard', name: 'Standard', price: 29, cover: 400, color: '#00D4AA' },
  { id: 'pro', name: 'Pro', price: 49, cover: 650, color: '#FFB800' }
];

export default function WeeklyPremiumCard({ selectedPlan, onSelect }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {PLANS.map((plan) => (
        <motion.div
          key={plan.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(plan.id)}
          className={`relative p-5 rounded-2xl border cursor-pointer transition-all ${
            selectedPlan === plan.id 
            ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(0,212,170,0.1)]' 
            : 'bg-white/[0.03] border-white/5 hover:border-white/10'
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-sora font-extrabold text-white text-lg">{plan.name}</h4>
              <p className="text-[10px] text-text-muted uppercase tracking-widest mt-1">
                ₹{plan.cover} Pay-per-disruption
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-sora font-extrabold text-white">₹{plan.price}</p>
              <p className="text-[9px] text-text-muted uppercase font-bold">/ week</p>
            </div>
          </div>
          
          {selectedPlan === plan.id && (
            <motion.div 
              layoutId="active-dot"
              className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-black text-xs font-bold shadow-lg"
            >
              ✓
            </motion.div>
          )}

          <div className="mt-4 flex gap-2">
            <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-text-muted">Rain OK</span>
            <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-text-muted">Heat OK</span>
            {plan.id === 'pro' && <span className="text-[10px] bg-primary/20 px-2 py-0.5 rounded text-primary font-bold">Cyclone+</span>}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
