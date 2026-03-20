import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import NannaPromise from './pages/NannaPromise';
import AdminDashboard from './pages/AdminDashboard';
import WorkerDashboard from './pages/WorkerDashboard';
import GigScorePage from './pages/GigScorePage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0c1324] text-[#dce1fb]">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/nanna-promise" element={<NannaPromise />} />
          <Route path="/dashboard" element={<WorkerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/gigscore" element={<GigScorePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#191f31',
              color: '#dce1fb',
              border: '1px solid rgba(255,255,255,0.06)',
              fontFamily: 'Inter',
              borderRadius: '16px',
              backdropFilter: 'blur(20px)',
            }
          }}
        />
      </div>
    </Router>
  );
}

export default App;
