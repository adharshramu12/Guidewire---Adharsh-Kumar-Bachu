-- GigShield Database Schema
-- Optimized for Parametric Income Guarantee Platform

-- Workers (The Gig Economy Workforce)
CREATE TABLE workers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    platform VARCHAR(50), -- Swiggy, Zomato, Porter, etc.
    zone_id VARCHAR(50), -- References zone
    gig_score INTEGER DEFAULT 500,
    upi_id VARCHAR(100),
    onboarded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active'
);

-- Zones (Pin-code based risk monitoring)
CREATE TABLE zones (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100),
    pin_code VARCHAR(10) UNIQUE,
    risk_level VARCHAR(10) CHECK (risk_level IN ('low', 'medium', 'high')),
    lat DECIMAL(9,6),
    lng DECIMAL(9,6)
);

-- Policies (Parametric Coverage)
CREATE TABLE policies (
    id VARCHAR(50) PRIMARY KEY,
    worker_id VARCHAR(50) REFERENCES workers(id),
    plan_type VARCHAR(20) DEFAULT 'standard',
    status VARCHAR(20) DEFAULT 'active',
    weekly_premium DECIMAL(10,2),
    coverage_start TIMESTAMP,
    coverage_end TIMESTAMP,
    auto_renew BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Triggers (Disruption Events)
CREATE TABLE triggers (
    id VARCHAR(50) PRIMARY KEY,
    type VARCHAR(30), -- heavy_rain, extreme_heat, aqi_severe, etc.
    zone_id VARCHAR(50) REFERENCES zones(id),
    threshold_value DECIMAL(10,2),
    actual_value DECIMAL(10,2),
    metric VARCHAR(20), -- mm/hr, °C, AQI
    status VARCHAR(20) DEFAULT 'active',
    verified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Claims (Parametric Auto-Claims)
CREATE TABLE claims (
    id VARCHAR(50) PRIMARY KEY,
    worker_id VARCHAR(50) REFERENCES workers(id),
    trigger_id VARCHAR(50) REFERENCES triggers(id),
    amount DECIMAL(10,2),
    status VARCHAR(20) CHECK (status IN ('processing', 'flagged', 'approved', 'paid')),
    fraud_score DECIMAL(5,4),
    payout_time_mins DECIMAL(5,2),
    upi_ref VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP
);

-- GigScore History (Portable Credit)
CREATE TABLE gigscore_history (
    id SERIAL PRIMARY KEY,
    worker_id VARCHAR(50) REFERENCES workers(id),
    score INTEGER,
    change_reason TEXT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fraud Logs
CREATE TABLE fraud_logs (
    id SERIAL PRIMARY KEY,
    claim_id VARCHAR(50) REFERENCES claims(id),
    risk_probability DECIMAL(5,4),
    risk_factors TEXT[],
    ml_confidence DECIMAL(5,4),
    action_taken VARCHAR(50)
);
