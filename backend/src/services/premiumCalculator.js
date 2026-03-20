// ── GigShield Premium Calculator ──────────────────────
// Rule engine for personalized parametric premiums

const BASE_PREMIUM = 29; // Weekly base

export const calculateWeeklyPremium = (worker, gigScore) => {
  let premium = BASE_PREMIUM;

  // 1. GigScore Multipliers
  // 800+ = Elite (-20%)
  // 700+ = Trusted (-10%)
  // <400 = High Risk (+30%)
  if (gigScore >= 800) premium *= 0.8;
  else if (gigScore >= 700) premium *= 0.9;
  else if (gigScore < 400) premium *= 1.3;

  // 2. Zone Risk Multiplier
  const zoneRisks = { 'high': 1.15, 'medium': 1.05, 'low': 0.95 };
  const zoneRisk = zoneRisks[worker.zoneRisk] || 1.0;
  premium *= zoneRisk;

  // 3. Round to nearest Rupee
  return Math.round(premium);
};
