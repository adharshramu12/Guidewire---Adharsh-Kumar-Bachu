import React from 'react';
import { motion } from 'framer-motion';
import { AP_CITY_CENTERS } from '../utils/apZones';

export default function CityZonePicker({ selectedCity, onSelect }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        {Object.keys(AP_CITY_CENTERS).map((city) => (
          <motion.button
            key={city}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(city)}
            className={`p-5 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${
              selectedCity === city 
              ? 'bg-primary border-primary shadow-[0_0_20px_rgba(0,212,170,0.3)]' 
              : 'glass border-white/5 text-text-muted hover:border-white/10'
            }`}
          >
            <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedCity === city ? 'text-black' : 'text-text-muted'}`}>
              Region
            </span>
            <span className={`text-sm font-sora font-extrabold mt-1 capitalize ${selectedCity === city ? 'text-black' : 'text-white'}`}>
              {city}
            </span>
          </motion.button>
        ))}
      </div>
      
      {selectedCity && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl text-center"
        >
          <p className="text-[10px] text-text-muted uppercase font-bold tracking-tight">
            Protection active in 4 sub-zones across {selectedCity}
          </p>
        </motion.div>
      )}
    </div>
  );
}
