import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authApi = {
  sendOtp: (phone) => api.post('/auth/send-otp', { phone }),
  verifyOtp: (phone, otp) => api.post('/auth/verify-otp', { phone, otp })
};

export const workerApi = {
  getProfile: (id) => api.get(`/workers/${id}`),
  getActivity: (id) => api.get(`/workers/${id}/activity`),
  updateProfile: (id, data) => api.put(`/workers/${id}`, data)
};

export const policyApi = {
  getActive: (workerId) => api.get('/policies/active', { params: { workerId } }),
  renew: (workerId, planType) => api.post('/policies/renew', { workerId, planType })
};

export const adminApi = {
  simulate: (scenario, zoneId) => api.post('/admin/simulate', { scenario, zoneId }),
  getStats: () => api.get('/admin/stats')
};

export default api;
