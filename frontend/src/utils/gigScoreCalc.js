// GigScore Calculator — Client-side calculation engine
// Score range: 0-1000

export const GIGSCORE_TIERS = [
  { name: 'New', min: 0, max: 299, color: '#FF3D5A', icon: '🆕', premiumMultiplier: 1.3 },
  { name: 'Regular', min: 300, max: 499, color: '#FFB800', icon: '⭐', premiumMultiplier: 1.1 },
  { name: 'Trusted', min: 500, max: 699, color: '#00D4AA', icon: '🏆', premiumMultiplier: 1.0 },
  { name: 'Pro', min: 700, max: 849, color: '#FF6B2B', icon: '🔥', premiumMultiplier: 0.85 },
  { name: 'Elite', min: 850, max: 1000, color: '#8B5CF6', icon: '💎', premiumMultiplier: 0.7 },
];

export const getTier = (score) => {
  return GIGSCORE_TIERS.find(t => score >= t.min && score <= t.max) || GIGSCORE_TIERS[0];
};

export const calculateGigScore = ({
  tenureWeeks = 0,
  claimsApproved = 0,
  claimsRejected = 0,
  fraudFlags = 0,
  onTimeRenewals = 0,
  missedRenewals = 0,
  platformRating = 4.0,
  deliveriesThisMonth = 0,
  zoneRiskLevel = 'medium',
}) => {
  let score = 400; // Base score

  // Tenure bonus: +20 per week, max +200
  score += Math.min(tenureWeeks * 20, 200);

  // Claims history: +15 per approved, -30 per rejected
  score += claimsApproved * 15;
  score -= claimsRejected * 30;

  // Fraud penalty: -100 per flag
  score -= fraudFlags * 100;

  // Renewal consistency: +10 per on-time, -20 per missed
  score += onTimeRenewals * 10;
  score -= missedRenewals * 20;

  // Platform rating bonus: (rating - 3.0) * 60
  score += Math.max(0, (platformRating - 3.0) * 60);

  // Activity bonus: +2 per 10 deliveries, max +100
  score += Math.min(Math.floor(deliveriesThisMonth / 10) * 2, 100);

  // Zone risk adjustment
  const riskModifiers = { low: 20, medium: 0, high: -30 };
  score += riskModifiers[zoneRiskLevel] || 0;

  // Clamp 0-1000
  return Math.max(0, Math.min(1000, Math.round(score)));
};

export const getScoreBreakdown = (params) => {
  const score = calculateGigScore(params);
  const tier = getTier(score);
  const basePremium = 29;
  const weeklyPremium = Math.round(basePremium * tier.premiumMultiplier);

  return {
    score,
    tier,
    weeklyPremium,
    benefits: getBenefits(tier.name),
  };
};

const getBenefits = (tierName) => {
  const benefits = {
    New: [
      'Standard weekly coverage',
      'Auto-claim processing',
      'WhatsApp alerts',
    ],
    Regular: [
      'All New benefits',
      '10% premium discount',
      'Priority claim review',
    ],
    Trusted: [
      'All Regular benefits',
      'Standard premium (₹29/week)',
      'Instant claim approval for verified triggers',
      'Monthly income report',
    ],
    Pro: [
      'All Trusted benefits',
      '15% premium discount (₹25/week)',
      'Fastest payout processing',
      'Multi-zone coverage',
      'Microfinance eligibility',
    ],
    Elite: [
      'All Pro benefits',
      '30% premium discount (₹20/week)',
      'VIP support channel',
      'Extended coverage window',
      'Cross-platform portability',
      'Emergency micro-loan access',
    ],
  };
  return benefits[tierName] || benefits.New;
};
