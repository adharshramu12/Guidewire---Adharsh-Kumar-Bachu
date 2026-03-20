import React from 'react';
import { motion } from 'framer-motion';

export default function GigScoreMeter({ score = 650 }) {
  const percentage = (score / 1000) * 100;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = (s) => {
    if (s < 400) return { main: '#ef4444', glow: 'rgba(239,68,68,0.2)' };
    if (s < 700) return { main: '#f59e0b', glow: 'rgba(245,158,11,0.2)' };
    return { main: '#4edea3', glow: 'rgba(78,222,163,0.2)' };
  };

  const status = score < 400 ? 'RISING' : score < 700 ? 'VALIDATED' : 'ELITE';
  const colors = getColor(score);

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-64 h-64">
        {/* Ambient glow ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full opacity-30 blur-xl" style={{ background: colors.glow }} />
        </div>

        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
          {/* Outer faint ring */}
          <circle
            cx="128" cy="128" r={radius + 8}
            stroke="rgba(255,255,255,0.02)"
            strokeWidth="1"
            fill="transparent"
          />
          {/* Background ring */}
          <circle
            cx="128" cy="128" r={radius}
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4edea3" />
              <stop offset="50%" stopColor="#4cd7f6" />
              <stop offset="100%" stopColor="#c0c1ff" />
            </linearGradient>
          </defs>
          {/* Progress Ring with gradient */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.8, ease: "circOut" }}
            cx="128" cy="128" r={radius}
            stroke={score >= 700 ? "url(#scoreGradient)" : colors.main}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeLinecap="round"
            fill="transparent"
            style={{ filter: `drop-shadow(0 0 10px ${colors.glow})` }}
          />
        </svg>

        {/* Inner Hub */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-center">
              <p className="text-[9px] font-bold tracking-[0.25em] text-slate-500 uppercase mb-2">Trust Index</p>
              <h3 className="text-6xl font-display font-extrabold text-white tracking-tighter">{score}</h3>
              <div className="mt-4 flex flex-col items-center">
                <span className="text-[10px] font-bold tracking-widest px-3 py-1 rounded-full"
                  style={{ 
                    color: colors.main,
                    background: `${colors.main}10`,
                    border: `1px solid ${colors.main}20`,
                  }}
                >
                  {status}
                </span>
                <p className="text-[8px] text-slate-600 font-bold uppercase tracking-widest mt-2">Verified v5.0</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
