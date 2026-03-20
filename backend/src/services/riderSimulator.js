/**
 * ── GigShield Rider Simulator ──────────────────────────────────────────
 * Enterprise-grade service for simulating real-time worker movements
 * across the Andhra Pradesh delivery network.
 * 
 * Features:
 * - GPS path interpolation (simulating road-matched travel)
 * - Platform-specific status simulation (Zomato/Swiggy)
 * - Real-time Socket.io emission
 * - Multi-city support (Vijayawada, Anantapur, Guntur, Vizag, etc.)
 * ────────────────────────────────────────────────────────────────────────
 */

export const RIDERS = [
  { id:'RK001', name:'Ravi Kumar',       phone:'9849123456',
    platform:'zomato', zoneId:'VJA-GWTR', city:'vijayawada',
    gigScore:720, coverageActive:true, avgEarnings:780,
    path:[
      [16.5062,80.6480],[16.5078,80.6495],[16.5091,80.6510],
      [16.5105,80.6498],[16.5088,80.6472],[16.5062,80.6480]
    ]
  },
  { id:'LP002', name:'Lakshmi Prasad',   phone:'9876543210',
    platform:'swiggy', zoneId:'VJA-BENZ', city:'vijayawada',
    gigScore:810, coverageActive:true, avgEarnings:880,
    path:[
      [16.5193,80.6305],[16.5210,80.6320],[16.5225,80.6308],
      [16.5218,80.6290],[16.5200,80.6280],[16.5193,80.6305]
    ]
  },
  { id:'SN003', name:'Suresh Naidu',     phone:'9988776655',
    platform:'zomato', zoneId:'VJA-MGRM', city:'vijayawada',
    gigScore:580, coverageActive:true, avgEarnings:650,
    path:[
      [16.5045,80.6484],[16.5058,80.6498],[16.5070,80.6490],
      [16.5065,80.6475],[16.5050,80.6468],[16.5045,80.6484]
    ]
  },
  { id:'KR004', name:'Krishnaswamy Reddy',phone:'9654321987',
    platform:'zomato', zoneId:'ATP-MAIN', city:'anantapur',
    gigScore:620, coverageActive:true, avgEarnings:520,
    path:[
      [14.6819,77.6006],[14.6835,77.6018],[14.6848,77.6005],
      [14.6840,77.5992],[14.6825,77.5998],[14.6819,77.6006]
    ]
  },
  { id:'RB005', name:'Ramesh Babu',      phone:'9741852963',
    platform:'swiggy', zoneId:'ATP-SUBR', city:'anantapur',
    gigScore:455, coverageActive:true, avgEarnings:480,
    path:[
      [14.6750,77.5950],[14.6765,77.5962],[14.6778,77.5955],
      [14.6770,77.5940],[14.6755,77.5935],[14.6750,77.5950]
    ]
  },
  { id:'NY006', name:'Nagaraju Yadav',   phone:'9369258147',
    platform:'zomato', zoneId:'GNT-MAIN', city:'guntur',
    gigScore:700, coverageActive:true, avgEarnings:730,
    path:[
      [16.3067,80.4365],[16.3082,80.4378],[16.3095,80.4370],
      [16.3088,80.4355],[16.3073,80.4348],[16.3067,80.4365]
    ]
  },
  { id:'DP007', name:'Durga Prasad',     phone:'9258147036',
    platform:'swiggy', zoneId:'VSP-MVRD', city:'visakhapatnam',
    gigScore:638, coverageActive:true, avgEarnings:690,
    path:[
      [17.7384,83.3135],[17.7398,83.3148],[17.7412,83.3140],
      [17.7405,83.3122],[17.7390,83.3118],[17.7384,83.3135]
    ]
  },
  { id:'VR008', name:'Venkateswara Rao', phone:'9147036925',
    platform:'zomato', zoneId:'TPT-MAIN', city:'tirupati',
    gigScore:798, coverageActive:true, avgEarnings:840,
    path:[
      [13.6288,79.4192],[13.6302,79.4205],[13.6315,79.4198],
      [13.6308,79.4183],[13.6293,79.4177],[13.6288,79.4192]
    ]
  },
  { id:'MS009', name:'Mohammed Saleem',  phone:'9036925814',
    platform:'swiggy', zoneId:'KNL-MAIN', city:'kurnool',
    gigScore:540, coverageActive:true, avgEarnings:570,
    path:[
      [15.8281,78.0373],[15.8295,78.0386],[15.8308,78.0378],
      [15.8300,78.0363],[15.8285,78.0357],[15.8281,78.0373]
    ]
  },
  { id:'VN010', name:'Venkata Ramana',   phone:'9123456789',
    platform:'zomato', zoneId:'VJA-LAND', city:'vijayawada',
    gigScore:862, coverageActive:true, avgEarnings:920,
    path:[
      [16.5130,80.6320],[16.5145,80.6333],[16.5158,80.6325],
      [16.5150,80.6310],[16.5135,80.6305],[16.5130,80.6320]
    ]
  }
];

/**
 * Interpolates position along a multi-point path based on time
 */
export const getRiderPosition = (rider, timestamp) => {
  const cycleMs = 60000; // 60 second full loop for smoother experience
  const progress = (timestamp % cycleMs) / cycleMs;
  const path = rider.path;
  const totalPoints = path.length;
  
  const segmentProgress = progress * (totalPoints - 1);
  const currentIdx = Math.floor(segmentProgress);
  const nextIdx = (currentIdx + 1) % totalPoints;
  const frac = segmentProgress - currentIdx;
  
  const from = path[currentIdx];
  const to = path[nextIdx];
  
  return {
    lat: from[0] + (to[0] - from[0]) * frac,
    lng: from[1] + (to[1] - from[1]) * frac
  };
};

/**
 * Starts the real-time simulation broadcast
 */
export const startRiderSimulation = (io) => {
  setInterval(() => {
    const now = Date.now();
    const positions = RIDERS.map(rider => ({
      id: rider.id,
      name: rider.name,
      platform: rider.platform,
      zoneId: rider.zoneId,
      city: rider.city,
      gigScore: rider.gigScore,
      coverageActive: rider.coverageActive,
      position: getRiderPosition(rider, now),
      status: 'delivering', // status can be overridden by claim logic
      lastUpdate: new Date().toISOString()
    }));
    
    io.emit('rider_positions', positions);
  }, 3000);
  
  console.log('[RiderSim] ✅ Simulation online — 10 riders moving across AP');
};
