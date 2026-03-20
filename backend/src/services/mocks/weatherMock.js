export const getWeatherData = async (zoneId) => {
  // Mock data for demo purposes, simulating OpenWeatherMap API
  const baseData = {
    'HYD-KOND': { temp: 34, rain: 0, humidity: 45 },
    'HYD-MADA': { temp: 35, rain: 2.1, humidity: 50 },
    'HYD-BANJ': { temp: 32, rain: 0, humidity: 40 },
    'HYD-JUNI': { temp: 33, rain: 0, humidity: 42 },
    'HYD-KUKA': { temp: 44, rain: 0, humidity: 30 }, // Extreme Heat trigger
    'HYD-CHIK': { temp: 31, rain: 18.5, humidity: 85 }, // Heavy Rain trigger
    'HYD-OLD':  { temp: 35, rain: 0, humidity: 48 },
    'HYD-MIYA': { temp: 34, rain: 0, humidity: 45 },
    'HYD-AMEEP':{ temp: 33, rain: 0, humidity: 44 },
    'HYD-MASE': { temp: 32, rain: 0, humidity: 41 },
  };

  return baseData[zoneId] || { temp: 30, rain: 0, humidity: 50 };
};
