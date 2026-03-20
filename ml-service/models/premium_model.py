# ── Premium XGBoost Model Mock ────────────────────────
# Personalized premium optimization based on risk and intent

def optimize_premium(worker_base_data):
    """
    Calculates optimized weekly premium using feature coefficients:
    - Geo Risk
    - Historical Loss
    - Platform Rating
    - Renewal Loyalty
    """
    base = 29.0
    
    # Feature weights (Mock Coefficients)
    weights = {
        'geo_risk': 0.25,      # High weight for location
        'rating_bonus': -0.10, # Discount for high platform ratings
        'loyalty': -0.05,      # Tenure discount
        'fraud_risk': 0.40     # Penalty for anomaly flags
    }
    
    # Calculation
    risk_factor = worker_base_data.get('risk_score', 0.5) # 0 to 1
    loyalty = worker_base_data.get('tenure_months', 0) / 24.0 # max 2 years
    
    score = (
        (risk_factor * weights['geo_risk']) +
        (weights['rating_bonus'] if worker_base_data.get('rating', 0) > 4.5 else 0) +
        (loyalty * weights['loyalty'])
    )
    
    optimized = base * (1 + score)
    return max(15.0, round(float(optimized), 2))
