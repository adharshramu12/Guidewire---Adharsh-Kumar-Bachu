import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const s = io(SOCKET_URL);
    
    s.on('connect', () => {
      console.log('[Socket] Connected to backend Engine');
      setConnected(true);
    });

    s.on('disconnect', () => {
      setConnected(false);
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  return { socket, connected };
};
