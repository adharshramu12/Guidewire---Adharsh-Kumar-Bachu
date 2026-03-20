# ── GigShield ML Training Pipeline ────────────────────
# Synthetic data generation and model 'training'

import pandas as pd
import numpy as np
import os

def generate_synthetic_claims(n=500):
    """Generates synthetic claim records for model training simulation"""
    data = {
        'worker_id': [f'WKR-{i}' for i in range(n)],
        'zone_id': np.random.choice(['HYD-KOND', 'HYD-OLD', 'HYD-BANJ'], n),
        'trigger': np.random.choice(['RAIN', 'HEAT', 'RAI'], n),
        'fraud_label': np.random.choice([0, 1], n, p=[0.95, 0.05])
    }
    df = pd.DataFrame(data)
    os.makedirs('data', exist_ok=True)
    df.to_csv('data/historical_claims.csv', index=False)
    print(f"[ML] Generated {n} synthetic training records.")

if __name__ == "__main__":
    generate_synthetic_claims()
