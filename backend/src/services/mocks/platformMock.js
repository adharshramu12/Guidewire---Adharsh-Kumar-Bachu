export const getPlatformData = async (zoneId) => {
  // Mock data for demo purposes, simulating Swiggy/Zomato API integrations
  const baseData = {
    'HYD-KOND': { 
      rai: 0.40, // 60% offline (RAI Drop trigger) 
      platformUptime: 100,
      activeRestaurants: 120,
      offlineRestaurants: 180 
    },
    'HYD-MADA': { rai: 0.85, platformUptime: 100 },
    'HYD-BANJ': { rai: 0.92, platformUptime: 100 },
    'HYD-JUNI': { rai: 0.88, platformUptime: 100 },
    'HYD-KUKA': { rai: 0.90, platformUptime: 100 },
    'HYD-CHIK': { rai: 0.95, platformUptime: 100 },
    'HYD-OLD':  { rai: 0.82, platformUptime: 100 },
    'HYD-MIYA': { rai: 0.89, platformUptime: 100 },
    'HYD-AMEEP':{ rai: 0.85, platformUptime: 0 }, // Platform Outage trigger
    'HYD-MASE': { rai: 0.91, platformUptime: 100 },
  };

  return baseData[zoneId] || { rai: 0.90, platformUptime: 100 };
};

export const getAdminData = async (zoneId) => {
  // Mock data for Curfew/Strike triggers usually sourced from local admin APIs
  const baseData = {
    'HYD-KOND': { curfewActive: false, strikeActive: false },
    'HYD-MADA': { curfewActive: false, strikeActive: false },
    'HYD-BANJ': { curfewActive: false, strikeActive: false },
    'HYD-JUNI': { curfewActive: false, strikeActive: false },
    'HYD-KUKA': { curfewActive: false, strikeActive: false },
    'HYD-CHIK': { curfewActive: false, strikeActive: true }, // Strike active
    'HYD-OLD':  { curfewActive: false, strikeActive: false },
    'HYD-MIYA': { curfewActive: false, strikeActive: false },
    'HYD-AMEEP':{ curfewActive: false, strikeActive: false },
    'HYD-MASE': { curfewActive: false, strikeActive: false },
  };

  return baseData[zoneId] || { curfewActive: false, strikeActive: false };
};
