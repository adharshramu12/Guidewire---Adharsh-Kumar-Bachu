/**
 * ── GigShield Server v5.0 ─────────────────────────────────────────────
 * Enterprise-grade entry point for the Live Visual Platform.
 * Orchestrates MongoDB, Socket.io, and Real-time Simulators.
 * ────────────────────────────────────────────────────────────────────────
 */

import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import { initSocket } from './config/socket.js';
import { startRiderSimulation } from './services/riderSimulator.js';
import weatherSimulator from './services/weatherSimulator.js';
import parametricEngine from './services/parametricEngine.js';
import { errorHandler } from './middleware/errorHandler.js';

// Route Imports
import authRoutes from './routes/auth.routes.js';
import workerRoutes from './routes/worker.routes.js';
import policyRoutes from './routes/policy.routes.js';
import adminRoutes from './routes/admin.routes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// 1. Initialize Database
connectDB();

// 2. Initialize Socket.io
const io = initSocket(server);

// 3. Middleware
app.use(cors());
app.use(express.json());

// 4. Start Simulators & Engine
// Rider movements every 3s
startRiderSimulation(io);

// Weather/Environment tick every 2s
setInterval(() => {
  weatherSimulator.tick(io);
}, 2000);

// Listen for Simulator Thresholds to trigger Parametric Engine
io.on('connection', (socket) => {
  // Simulator internal events bridge to Engine
  // (In production, this would be a message queue)
});

// Capture threshold events from simulators and pass to engine
const originalEmit = io.emit;
io.emit = function (event, data) {
  if (event === 'threshold_crossed') {
    parametricEngine.processThresholdBreach(data);
  }
  return originalEmit.apply(io, arguments);
};

// 5. Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/admin', adminRoutes);

// 6. Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`
  ╔═════════════════════════════════════════════════════╗
  ║ 🛡️  GigShield Live Visual Backend (v5.0)              ║
  ║ 🚀  Server running on port: ${PORT}                    ║
  ║ 🌐  Socket.io: Online                               ║
  ║ 🌩️  Simulators: Online                               ║
  ╚═════════════════════════════════════════════════════╝
  `);
});
