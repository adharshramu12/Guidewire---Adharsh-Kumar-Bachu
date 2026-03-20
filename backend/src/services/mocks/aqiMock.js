export const getAqiData = async (zoneId) => {
  // Mock data for demo purposes, simulating AQI provider
  const baseData = {
    'HYD-KOND': { aqi: 120, pm25: 65 },
    'HYD-MADA': { aqi: 135, pm25: 70 },
    'HYD-BANJ': { aqi: 95,  pm25: 45 },
    'HYD-JUNI': { aqi: 110, pm25: 55 },
    'HYD-KUKA': { aqi: 145, pm25: 75 },
    'HYD-CHIK': { aqi: 130, pm25: 68 },
    'HYD-OLD':  { aqi: 310, pm25: 180 }, // Severe AQI trigger
    'HYD-MIYA': { aqi: 115, pm25: 60 },
    'HYD-AMEEP':{ aqi: 105, pm25: 52 },
    'HYD-MASE': { aqi: 90,  pm25: 40 },
  };

  return baseData[zoneId] || { aqi: 100, pm25: 50 };
};
