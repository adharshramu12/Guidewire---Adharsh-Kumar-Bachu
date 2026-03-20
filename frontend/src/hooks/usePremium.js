import { useState, useCallback, useMemo } from 'react';
import { ZONES } from '../utils/mockData';
import { getTier } from '../utils/gigScoreCalc';

export const usePremium = (worker) => {
  const [loading, setLoading] = useState(false);

  const calculate = useCallback((params = {}) => {
    const {
      zone = worker?.zone || 'HYD-KOND',
      gigScore = worker?.gigScore || 720,
      platform = worker?.platform || 'Zomato',
      planType = 'standard',
    } = params;

    const basePremium = 29; // ₹29/week standard
    const tier = getTier(gigScore);
    const zoneData = ZONES.find(z => z.id === zone);
    
    // Zone risk modifier
    const riskModifiers = { low: 0.9, medium: 1.0, high: 1.15 };
    const zoneModifier = riskModifiers[zoneData?.risk || 'medium'];

    // GigScore tier modifier
    const tierModifier = tier.premiumMultiplier;

    // Platform modifier (slight variance)
    const platformModifier = platform === 'Swiggy' ? 0.98 : 1.0;

    // Plan type modifier
    const planModifiers = { basic: 0.7, standard: 1.0, premium: 1.4 };
    const planModifier = planModifiers[planType] || 1.0;

    const rawPremium = basePremium * zoneModifier * tierModifier * platformModifier * planModifier;
    const weeklyPremium = Math.round(rawPremium);

    // Coverage amounts
    const coverageMap = {
      basic: { perEvent: 250, weekly: 1000 },
      standard: { perEvent: 400, weekly: 2000 },
      premium: { perEvent: 600, weekly: 3500 },
    };

    return {
      weeklyPremium,
      basePremium,
      tier,
      zone: zoneData,
      coverage: coverageMap[planType] || coverageMap.standard,
      breakdown: {
        base: basePremium,
        zoneAdjustment: Math.round((zoneModifier - 1) * basePremium),
        tierDiscount: Math.round((tierModifier - 1) * basePremium),
        platformAdjustment: Math.round((platformModifier - 1) * basePremium),
        planAdjustment: Math.round((planModifier - 1) * basePremium),
      },
    };
  }, [worker]);

  const premiumDetails = useMemo(() => calculate(), [calculate]);

  return { premiumDetails, calculate, loading };
};
