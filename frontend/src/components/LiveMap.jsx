import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useSocket } from '../hooks/useSocket';
import { ZONE_POLYGONS } from '../utils/apZones';
import 'leaflet/dist/leaflet.css';

// ── Status Styles ──────────────────────────────────────────────────
const STATUS_STYLES = {
  safe:      { color:'#00D4AA', fillColor:'rgba(0,212,170,0.15)',     fillOpacity:0.15 },
  watch:     { color:'#FFB800', fillColor:'rgba(255,184,0,0.25)',     fillOpacity:0.25 },
  rain:      { color:'#3B82F6', fillColor:'rgba(59,130,246,0.35)',    fillOpacity:0.35 },
  heat:      { color:'#FF6B2B', fillColor:'rgba(255,107,43,0.40)',    fillOpacity:0.40 },
  aqi:       { color:'#6B7280', fillColor:'rgba(107,114,128,0.50)',   fillOpacity:0.50 },
  gas:       { color:'#FF3D5A', fillColor:'rgba(255,61,90,0.45)',     fillOpacity:0.45 },
  cyclone:   { color:'#8B5CF6', fillColor:'rgba(139,92,246,0.50)',    fillOpacity:0.50 },
  triggered: { color:'#FF3D5A', fillColor:'rgba(255,61,90,0.65)',     fillOpacity:0.65 }
};

// ── Rider Marker Icon ──────────────────────────────────────────────
function createRiderIcon(status, platform) {
  const color = status==='claim_processing' ? '#FF3D5A'
              : status==='paid' ? '#00D4AA' : '#FF6B2B';
  const platformIcon = platform === 'zomato' ? '🔴' : '🟠';
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width:32px; height:32px; border-radius:50%;
        background:${color}; border:2px solid white;
        display:flex; align-items:center; justify-content:center;
        font-size:12px; box-shadow:0 0 8px ${color};
        animation: ${status==='claim_processing' ? 'pulseRed' : 'pulseOrange'} 1s infinite;
        position:relative;
      ">
        ${platformIcon}
        ${status==='claim_processing' ? '<div style="position:absolute;top:-8px;right:-8px;background:#FF3D5A;color:white;font-size:8px;padding:1px 3px;border-radius:4px;white-space:nowrap;">⚡ CLAIM</div>' : ''}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
}

// ── Canvas Rain Overlay ────────────────────────────────────────────
function RainOverlay({ triggeredZones }) {
  const canvasRef = useRef(null);
  const map = useMap();
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      const size = map.getSize();
      canvas.width = size.x;
      canvas.height = size.y;
    };
    handleResize();
    map.on('resize', handleResize);

    const drops = Array.from({ length: 300 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 4 + Math.random() * 6,
      length: 8 + Math.random() * 12,
      opacity: 0.2 + Math.random() * 0.5
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const hasRain = Object.values(triggeredZones).some(t => t === 'rain' || t === 'rainfall');
      if (!hasRain) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.strokeStyle = 'rgba(174, 214, 241, 0.6)';
      ctx.lineWidth = 1;

      drops.forEach(drop => {
        drop.y += drop.speed;
        drop.x -= drop.speed * 0.15;
        if (drop.y > canvas.height + 20) {
          drop.y = -20;
          drop.x = Math.random() * canvas.width;
        }
        ctx.globalAlpha = drop.opacity;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 2, drop.y + drop.length);
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      map.off('resize', handleResize);
    };
  }, [map, triggeredZones]);

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', top: 0, left: 0,
      pointerEvents: 'none', zIndex: 400,
      width: '100%', height: '100%'
    }} />
  );
}

// ── main LiveMap Component ─────────────────────────────────────────
export default function LiveMap({ onRiderClick, onZoneClick }) {
  const [riderPositions, setRiderPositions] = useState([]);
  const [zoneStatuses, setZoneStatuses] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [restaurantData, setRestaurantData] = useState({});
  const [triggeredZones, setTriggeredZones] = useState({});
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('rider_positions', setRiderPositions);
    
    socket.on('weather_update', (data) => {
      setWeatherData(data);
      const newStatuses = {};
      Object.entries(data).forEach(([zoneId, w]) => {
        if (w.rainfall_mmhr > 15) newStatuses[zoneId] = 'rain';
        else if (w.temp_c > 42) newStatuses[zoneId] = 'heat';
        else if (w.aqi > 300) newStatuses[zoneId] = 'aqi';
        else newStatuses[zoneId] = 'safe';
      });
      setZoneStatuses(prev => ({ ...prev, ...newStatuses }));
    });

    socket.on('restaurant_update', (data) => {
      setRestaurantData(prev => ({ ...prev, [data.zoneId]: data }));
      if (data.offlinePct >= 40) setZoneStatuses(prev => ({ ...prev, [data.zoneId]: 'gas' }));
    });

    socket.on('threshold_crossed', (data) => {
      setZoneStatuses(prev => ({ ...prev, [data.zoneId]: 'triggered' }));
      setTriggeredZones(prev => ({ ...prev, [data.zoneId]: data.type }));
      setRiderPositions(prev => prev.map(r => r.zoneId === data.zoneId 
        ? { ...r, status: 'claim_processing' } : r));
    });

    socket.on('payout_processed', (data) => {
      setRiderPositions(prev => prev.map(r => r.id === data.riderId 
        ? { ...r, status: 'paid' } : r));
      setTimeout(() => {
        setRiderPositions(prev => prev.map(r => r.id === data.riderId 
          ? { ...r, status: 'delivering' } : r));
      }, 3000);
    });

    socket.on('triggers_reset', () => {
      setZoneStatuses({});
      setTriggeredZones({});
      setRestaurantData({});
    });

    return () => {
      socket.off('rider_positions');
      socket.off('weather_update');
      socket.off('restaurant_update');
      socket.off('threshold_crossed');
      socket.off('payout_processed');
      socket.off('triggers_reset');
    };
  }, [socket]);

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[16.0, 80.0]}
        zoom={7}
        className="w-full h-full bg-[#0A0F1E]"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap"
        />

        {Object.entries(ZONE_POLYGONS).map(([zoneId, coords]) => {
          const status = zoneStatuses[zoneId] || 'safe';
          const style = STATUS_STYLES[status];
          const weather = weatherData[zoneId];
          const rest = restaurantData[zoneId];

          return (
            <Polygon
              key={zoneId}
              positions={coords}
              pathOptions={{
                color: style.color,
                fillColor: style.fillColor,
                fillOpacity: style.fillOpacity,
                weight: status === 'triggered' ? 3 : 1.5,
              }}
              eventHandlers={{
                click: () => onZoneClick && onZoneClick({ zoneId, status, weather, rest })
              }}
            >
              <Popup className="gs-popup">
                <div className="p-4 min-w-[220px]">
                  <h3 className="font-sora font-semibold text-sm mb-2">{zoneId.replace('-',' → ')}</h3>
                  {weather && (
                    <div className="text-xs space-y-1 text-text-muted">
                      <div>🌡 {weather.temp_c.toFixed(1)}°C</div>
                      <div>💧 {weather.rainfall_mmhr.toFixed(1)} mm/hr</div>
                      <div>🌫 AQI: {weather.aqi}</div>
                    </div>
                  )}
                  {rest && (
                    <div className={`text-xs mt-2 ${rest.offlinePct >= 40 ? 'text-danger' : 'text-primary'}`}>
                      🍽 {rest.onlineCount}/{rest.totalRestaurants} online ({rest.offlinePct}%)
                    </div>
                  )}
                  <div className={`mt-3 text-[10px] px-2 py-1 rounded-full inline-block font-bold tracking-wider`}
                    style={{ background: `${style.color}22`, color: style.color }}>
                    ● {status.toUpperCase()}
                  </div>
                </div>
              </Popup>
            </Polygon>
          );
        })}

        {riderPositions.map(rider => (
          <Marker
            key={rider.id}
            position={[rider.position.lat, rider.position.lng]}
            icon={createRiderIcon(rider.status, rider.platform)}
            eventHandlers={{ click: () => onRiderClick && onRiderClick(rider) }}
          >
            <Popup className="gs-popup">
              <div className="p-3 text-xs w-[180px]">
                <h4 className="font-sora font-bold text-white mb-1">{rider.name}</h4>
                <div className="text-text-muted mb-2">
                  {rider.platform === 'zomato' ? '🔴 Zomato' : '🟠 Swiggy'} · {rider.city}
                </div>
                <div className={`mb-1 font-semibold ${rider.coverageActive ? 'text-primary' : 'text-danger'}`}>
                  {rider.coverageActive ? '✅ ACTIVE COVER' : '❌ NO COVERAGE'}
                </div>
                <div className="text-[10px] text-text-muted">GigScore: {rider.gigScore}/1000</div>
                {rider.status === 'claim_processing' && <div className="mt-2 text-danger font-bold animate-pulse">⚡ AUTO-CLAIMING...</div>}
                {rider.status === 'paid' && <div className="mt-2 text-primary font-bold">✅ SETTLED (₹400)</div>}
              </div>
            </Popup>
          </Marker>
        ))}

        <RainOverlay triggeredZones={triggeredZones} />
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-6 left-6 z-[500] glass p-4 rounded-xl border-white/5 pointer-events-none">
        <h4 className="text-xs font-sora font-bold mb-3 text-white uppercase tracking-wider">AP Operations Center</h4>
        <div className="space-y-2">
          {Object.entries(STATUS_STYLES).slice(0, 6).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: value.color }} />
              <span className="text-[10px] capitalize text-text-muted">{key}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
