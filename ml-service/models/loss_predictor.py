# ── Loss Predictor Models ─────────────────────────────
# Simple trend analysis for loss ratio forecasting

import numpy as np
from datetime import datetime, timedelta

def predict_7day_loss(historical_ratios):
    """
    Predicts average loss ratio for the next 7 days based on 
    the last 30 days of data.
    """
    if len(historical_ratios) < 7:
        return 85.0 # Default baseline
        
    # Simple linear extrapolation
    x = np.arange(len(historical_ratios))
    y = np.array(historical_ratios)
    
    z = np.polyfit(x, y, 1)
    p = np.poly1d(z)
    
    # Predict next 7 days average
    next_7 = [p(len(historical_ratios) + i) for i in range(1, 8)]
    return round(float(np.mean(next_7)), 1)
