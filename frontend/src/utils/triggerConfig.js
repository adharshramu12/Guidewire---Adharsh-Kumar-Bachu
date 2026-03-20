// GigShield Trigger Configuration
// All parametric trigger thresholds for income protection

export const TRIGGER_TYPES = {
  HEAVY_RAIN: 'heavy_rain',
  EXTREME_HEAT: 'extreme_heat',
  FLOOD: 'flood',
  SEVERE_AQI: 'severe_aqi',
  CURFEW: 'curfew',
  RAI_DROP: 'rai_drop',          // Restaurant Availability Index
  PLATFORM_OUTAGE: 'platform_outage',
};

export const TRIGGER_THRESHOLDS = {
  [TRIGGER_TYPES.HEAVY_RAIN]: {
    label: 'Heavy Rain',
    icon: '🌧️',
    metric: 'Rainfall',
    unit: 'mm/hr',
    threshold: 15,
    description: 'Rainfall exceeds 15mm/hr in delivery zone',
    color: '#3B82F6',
    payoutBase: 400,
  },
  [TRIGGER_TYPES.EXTREME_HEAT]: {
    label: 'Extreme Heat',
    icon: '🔥',
    metric: 'Temperature',
    unit: '°C',
    threshold: 42,
    description: 'Temperature exceeds 42°C in delivery zone',
    color: '#EF4444',
    payoutBase: 350,
  },
  [TRIGGER_TYPES.FLOOD]: {
    label: 'Flood Warning',
    icon: '🌊',
    metric: 'Water Level',
    unit: 'cm',
    threshold: 30,
    description: 'Flood water level exceeds 30cm in zone roads',
    color: '#06B6D4',
    payoutBase: 600,
  },
  [TRIGGER_TYPES.SEVERE_AQI]: {
    label: 'Severe AQI',
    icon: '😷',
    metric: 'AQI',
    unit: '',
    threshold: 300,
    description: 'Air Quality Index exceeds 300 (Hazardous)',
    color: '#A855F7',
    payoutBase: 300,
  },
  [TRIGGER_TYPES.CURFEW]: {
    label: 'Curfew / Strike',
    icon: '🚫',
    metric: 'Status',
    unit: '',
    threshold: 1,
    description: 'Unplanned curfew, bandh, or strike in delivery zone',
    color: '#F97316',
    payoutBase: 500,
  },
  [TRIGGER_TYPES.RAI_DROP]: {
    label: 'Restaurant Closure',
    icon: '🍽️',
    metric: 'RAI',
    unit: '%',
    threshold: 40,
    description: 'Over 40% restaurants offline (LPG crisis, power cuts)',
    color: '#FF6B2B',
    payoutBase: 400,
  },
  [TRIGGER_TYPES.PLATFORM_OUTAGE]: {
    label: 'Platform Outage',
    icon: '📱',
    metric: 'Status',
    unit: '',
    threshold: 1,
    description: 'Zomato/Swiggy platform experiencing major outage',
    color: '#EC4899',
    payoutBase: 450,
  },
};

export const TRIGGER_SEVERITY = {
  LOW: { label: 'Watch', color: '#FFB800' },
  MEDIUM: { label: 'Alert', color: '#F97316' },
  HIGH: { label: 'Critical', color: '#FF3D5A' },
};

export const getPayoutAmount = (triggerType, severity = 'MEDIUM') => {
  const base = TRIGGER_THRESHOLDS[triggerType]?.payoutBase || 400;
  const multipliers = { LOW: 0.6, MEDIUM: 1.0, HIGH: 1.5 };
  return Math.round(base * (multipliers[severity] || 1));
};
