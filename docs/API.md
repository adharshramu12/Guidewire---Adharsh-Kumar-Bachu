# GigShield API Reference

## 1. Backend API (Node.js) - Port 3001

### 🔐 Authentication
- `POST /api/auth/send-otp`  
  - Body: `{ "phone": "9876543210" }`
- `POST /api/auth/verify-otp`  
  - Body: `{ "phone": "9876543210", "otp": "123456" }`

### 👤 Workers
- `GET /api/workers/:id` - Fetch profile
- `GET /api/workers/:id/activity` - Fetch claim/policy history

### 🛡️ Policies
- `GET /api/policies/active?workerId=...`
- `POST /api/policies/renew`
  - Body: `{ "workerId": "...", "planType": "standard" }`

### 💸 Claims
- `GET /api/claims?workerId=...`
- `POST /api/claims` - Force a claim (Demo override)
  - Body: `{ "workerId": "...", "triggerType": "HEAVY_RAIN", "zoneId": "HYD-KOND" }`

### 🎯 Triggers
- `GET /api/triggers/active` - List all current regional disruptions
- `POST /api/triggers/fire` - Force a system-wide trigger (Simulator)

---

## 2. ML Service API (Python) - Port 8000

### 🕵️ Fraud Detection
- `POST /api/v1/predict/fraud`
  - Body: `ClaimData` object
  - Returns: `{ "is_fraudulent": boolean, "fraud_probability": float, "risk_factors": [] }`

### 💰 Premium Optimization
- `POST /api/v1/predict/premium`
  - Body: `{ "worker_id": "...", "risk_score": 0.5, "tenure_months": 12, "rating": 4.8 }`
  - Returns: `{ "optimized_premium": float }`

### 📉 Loss Forecasting
- `POST /api/v1/predict/loss`
  - Body: `{ "historical_ratios": [85.0, 92.0, ...] }`
  - Returns: `{ "predicted_loss_ratio": float }`

---

## 3. Real-time Events (Socket.io)
- **Rooms**:
  - `admin_room`: Receives all platform triggers and fraud alerts.
  - `worker_{workerId}`: Receives personal claim status updates.
- **Events**:
  - `trigger_alert`: Disruption detected in region.
  - `claim_status_update`: Multistage progress (Approved -> Paid).
  - `new_claim`: (Admin only) Real-time fraud scoring notification.
