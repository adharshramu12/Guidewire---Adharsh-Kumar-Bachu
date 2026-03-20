import { Server } from 'socket.io';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log(`[Socket] 🌐 Client connected: ${socket.id}`);

    socket.on('subscribe_zone', (data) => {
      socket.join(`zone_${data.zoneId}`);
      console.log(`[Socket] Client joined zone: ${data.zoneId}`);
    });

    socket.on('subscribe_city', (data) => {
      socket.join(`city_${data.city}`);
      console.log(`[Socket] Client joined city: ${data.city}`);
    });

    socket.on('disconnect', () => {
      console.log(`[Socket] 🔌 Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
