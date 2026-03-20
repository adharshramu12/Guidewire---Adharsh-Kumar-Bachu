-- Seed Data for GigShield Demo

-- Seed Zones (Hyderabad Clusters)
INSERT INTO zones (id, name, pin_code, risk_level, lat, lng) VALUES
('HYD-KOND', 'Kondapur', '500084', 'high', 17.4611, 78.3474),
('HYD-MADA', 'Madhapur', '500081', 'medium', 17.4485, 78.3908),
('HYD-BANJ', 'Banjara Hills', '500034', 'low', 17.4165, 78.4367),
('HYD-OLD', 'Old City', '500002', 'high', 17.3616, 78.4747);

-- Seed Workers
INSERT INTO workers (id, name, phone, platform, zone_id, gig_score, upi_id) VALUES
('WKR-001', 'Ravi Kumar', '9876543210', 'Swiggy', 'HYD-KOND', 720, 'ravi.kumar@paytm'),
('WKR-002', 'Sameer J.', '9876543211', 'Zomato', 'HYD-OLD', 410, 'sam.j@ybl'),
('WKR-003', 'Priya S.', '9876543212', 'Uber Eats', 'HYD-BANJ', 850, 'priya.s@apl');

-- Seed Policies
INSERT INTO policies (id, worker_id, plan_type, weekly_premium, coverage_start, coverage_end) VALUES
('POL-001', 'WKR-001', 'standard', 29.00, '2026-03-17 00:00:00', '2026-03-23 23:59:59'),
('POL-002', 'WKR-002', 'lite', 19.00, '2026-03-17 00:00:00', '2026-03-23 23:59:59');

-- Seed History
INSERT INTO gigscore_history (worker_id, score, change_reason) VALUES
('WKR-001', 705, 'Weekly renewal'),
('WKR-001', 720, 'No-fraud claim history');
