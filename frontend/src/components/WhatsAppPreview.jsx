import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../hooks/useSocket';

export default function WhatsAppPreview() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to GigShield Enterprise Security. ✅ Your account is protected.", time: "09:41", type: 'incoming' }
  ]);
  const { socket } = useSocket();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!socket) return;
    
    const handleNewMessage = (data) => {
      setMessages(prev => [
        ...prev,
        { 
          id: Date.now(), 
          text: `✅ GIGSHIELD ALERT: ₹${data.amount} disbursed for disruption in ${data.zone || 'your zone'}. Funds available via UPI.`, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'incoming',
          isNew: true
        }
      ]);
    };

    socket.on('whatsapp_alert', handleNewMessage);
    return () => socket.off('whatsapp_alert');
  }, [socket]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-[#0b141a] rounded-xl overflow-hidden" 
      style={{ border: '1px solid rgba(255,255,255,0.04)' }}
    >
      {/* Header */}
      <div className="h-13 bg-[#1a2530] flex items-center px-4 gap-3 py-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-extrabold"
          style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(6,182,212,0.1) 100%)',
            color: '#4edea3',
            border: '1px solid rgba(16,185,129,0.15)',
          }}
        >GS</div>
        <div className="flex-1">
          <p className="text-[11px] font-bold text-white">GigShield Support</p>
          <p className="text-[8px] text-emerald-400 mt-0.5 font-bold uppercase tracking-widest">Verified Business</p>
        </div>
      </div>

      {/* Chat */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
        <AnimatePresence>
          {messages.map((m) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={m.id}
              className="max-w-[85%] p-3 rounded-2xl rounded-tl-none relative"
              style={{
                background: m.isNew ? 'rgba(16,185,129,0.06)' : '#1a2530',
                border: m.isNew ? '1px solid rgba(16,185,129,0.1)' : '1px solid rgba(255,255,255,0.03)',
                boxShadow: m.isNew ? '0 0 12px rgba(16,185,129,0.08)' : 'none',
              }}
            >
              <p className="text-[10px] text-white leading-relaxed font-medium">
                {m.text}
              </p>
              <p className="text-[7px] text-white/25 text-right mt-1 font-bold">{m.time} · Delivered</p>
              <div className="absolute top-0 left-[-5px] w-0 h-0 border-t-[8px] border-l-[6px] border-l-transparent"
                style={{ borderTopColor: m.isNew ? 'rgba(16,185,129,0.06)' : '#1a2530' }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="h-10 bg-[#1a2530] flex items-center px-4 text-[8px] text-white/15 font-bold uppercase tracking-widest"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        End-to-end encrypted
      </div>
    </div>
  );
}
