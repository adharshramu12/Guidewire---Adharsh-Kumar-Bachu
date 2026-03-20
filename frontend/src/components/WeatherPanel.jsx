import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function WeatherPanel({ zoneData }) {
  if (!zoneData) return (
    <div className="h-full flex items-center justify-center text-text-muted opacity-40 text-xs italic">
      Select a zone on the map to view live conditions.
    </div>
  );

  const { zoneId, weather, rest } = zoneData;
  
  // Mock trend data for the sparkline
  const trendData = Array.from({ length: 12 }, (_, i) => ({
    time: i,
    val: (weather?.rainfall_mmhr || 0) + Math.random() * 5
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass p-5 rounded-3xl border-white/5 h-full flex flex-col"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-sora font-extrabold text-white text-lg tracking-tight">
            {zoneId.split('-')[1]}
          </h3>
          <p className="text-[10px] text-primary uppercase font-bold tracking-widest mt-1">
            Live Telemetry
          </p>
        </div>
        <div className="bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          <span className="text-[10px] font-bold text-primary">REAL-TIME</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
          <p className="text-[9px] text-text-muted uppercase mb-1">Temperature</p>
          <p className="text-xl font-sora font-bold text-white">{weather?.temp_c?.toFixed(1) || '0.0'}°C</p>
        </div>
        <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
          <p className="text-[9px] text-text-muted uppercase mb-1">Precipitation</p>
          <p className="text-xl font-sora font-bold text-blue-400">{weather?.rainfall_mmhr?.toFixed(1) || '0.0'} mm</p>
        </div>
      </div>

      <div className="flex-1 min-h-[120px] mb-4">
        <p className="text-[9px] text-text-muted uppercase mb-3">Rainfall Trend (60m)</p>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="val" stroke="#3B82F6" fillOpacity={1} fill="url(#colorVal)" strokeWidth={2} />
            <Tooltip content={<></>} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {rest && (
        <div className="pt-4 border-t border-white/5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-text-muted uppercase">Merchant Activity</span>
            <span className={`text-[10px] font-bold ${rest.offlinePct > 40 ? 'text-danger' : 'text-primary'}`}>
              {rest.onlineCount} / {rest.totalRestaurants} Online
            </span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full mt-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${rest.offlinePct > 40 ? 'bg-danger' : 'bg-primary'}`}
              style={{ width: `${(rest.onlineCount / rest.totalRestaurants) * 100}%` }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
