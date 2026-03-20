from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import random
from typing import List, Optional, Dict
from models.loss_predictor import predict_7day_loss
from models.premium_model import optimize_premium

app = FastAPI(title="GigShield ML Service", version="1.0.0")

# --- Mock ML Models ---
# In production, these would be loaded from .pkl files trained on historical claims data

class ClaimData(BaseModel):
    worker_id: str
    zone_id: str
    trigger_type: str
    amount: float
    time_of_day: int # 0-23
    recent_claims_count: int
    velocity_kmh: Optional[float] = None
    gig_score: int

class FraudResult(BaseModel):
    fraud_probability: float
    is_fraudulent: bool
    risk_factors: List[str]
    confidence: float

@app.post("/api/v1/predict/fraud", response_model=FraudResult)
async def predict_fraud(claim: ClaimData):
    """
    Evaluates a new claim for potential fraud based on spatial-temporal anomalies
    and worker GigScore history.
    """
    risk_factors = []
    base_prob = 0.05
    
    # Heuristic 1: Velocity vs Trigger Type
    if claim.trigger_type == "HEAVY_RAIN" and claim.velocity_kmh and claim.velocity_kmh > 40:
        base_prob += 0.35
        risk_factors.append("High velocity during Heavy Rain trigger (Impossible Physics)")
        
    if claim.trigger_type == "EXTREME_HEAT" and claim.velocity_kmh and claim.velocity_kmh > 60:
         base_prob += 0.20
         risk_factors.append("Unusually high sustained velocity during Extreme Heat")

    # Heuristic 2: Claim frequency
    if claim.recent_claims_count > 3:
        base_prob += 0.25
        risk_factors.append(f"High claim frequency ({claim.recent_claims_count} in 7 days)")

    # Heuristic 3: GigScore Inverse correlation
    if claim.gig_score < 400:
        base_prob += 0.15
        risk_factors.append(f"Low GigScore trust tier ({claim.gig_score})")
    elif claim.gig_score > 800:
        base_prob -= 0.10 # Good behavior discount

    # Heuristic 4: Time anomalies (claiming peak restaurant outage at 4 AM)
    if claim.trigger_type == "RAI_DROP" and (claim.time_of_day < 7 or claim.time_of_day > 23):
         base_prob += 0.40
         risk_factors.append("Restaurant availability drop claimed during off-hours")

    # Final Probability calculation with some noise
    final_prob = min(0.99, max(0.01, base_prob + random.uniform(-0.02, 0.05)))
    
    # Threshold for automatic flag
    threshold = 0.70
    is_fraudulent = final_prob >= threshold

    return FraudResult(
        fraud_probability=round(final_prob, 3),
        is_fraudulent=is_fraudulent,
        risk_factors=risk_factors if is_fraudulent else [],
        confidence=round(random.uniform(0.85, 0.98), 2)
    )

class PremiumRequest(BaseModel):
    worker_id: str
    risk_score: float
    tenure_months: int
    rating: float

@app.post("/api/v1/predict/premium")
async def predict_premium(request: PremiumRequest):
    """
    Optimizes weekly premium based on worker risk profile and tenure.
    """
    optimized_value = optimize_premium(request.dict())
    return {"optimized_premium": optimized_value, "currency": "INR"}

class LossRequest(BaseModel):
    historical_ratios: List[float]

@app.post("/api/v1/predict/loss")
async def predict_loss(request: LossRequest):
    """
    Forecasts upcoming 7-day loss ratio based on trailing 30-day activity.
    """
    prediction = predict_7day_loss(request.historical_ratios)
    return {"predicted_loss_ratio": prediction, "confidence": 0.88}

@app.get("/api/v1/health")
async def health_check():
    return {"status": "healthy", "service": "GigShield ML Engine"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
