import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, useMap } from 'react-leaflet';
import { ZONES } from '../utils/mockData';
import 'leaflet/dist/leaflet.css';

const zonePolygons = {
  'HYD-KOND': [[17.468,78.338],[17.468,78.356],[17.454,78.356],[17.454,78.338]],
  'HYD-MADA': [[17.455,78.382],[17.455,78.400],[17.441,78.400],[17.441,78.382]],
  'HYD-BANJ': [[17.420,78.430],[17.420,78.448],[17.406,78.448],[17.406,78.430]],
  'HYD-JUNI': [[17.438,78.399],[17.438,78.417],[17.424,78.417],[17.424,78.399]],
  'HYD-KUKA': [[17.492,78.361],[17.492,78.379],[17.478,78.379],[17.478,78.361]],
  'HYD-CHIK': [[17.393,78.467],[17.393,78.485],[17.379,78.485],[17.379,78.467]],
  'HYD-OLD':  [[17.368,78.466],[17.368,78.484],[17.354,78.484],[17.354,78.466]],
  'HYD-MIYA': [[17.504,78.345],[17.504,78.363],[17.490,78.363],[17.490,78.345]],
  'HYD-AMEEP':[[17.444,78.440],[17.444,78.458],[17.430,78.458],[17.430,78.440]],
  'HYD-MASE': [[17.404,78.451],[17.404,78.469],[17.390,78.469],[17.390,78.451]],
};

const riskColors = {
  low: '#00D4AA',
  medium: '#FFB800',
  high: '#FF3D5A',
};

const zonePolicies = {
  'HYD-KOND': 187, 'HYD-MADA': 156, 'HYD-BANJ': 89, 'HYD-JUNI': 95,
  'HYD-KUKA': 134, 'HYD-CHIK': 112, 'HYD-OLD': 78, 'HYD-MIYA': 98,
  'HYD-AMEEP': 67, 'HYD-MASE': 53,
};

const zoneClaims = {
  'HYD-KOND': { approved: 12, processing: 3 },
  'HYD-MADA': { approved: 5, processing: 1 },
  'HYD-OLD': { approved: 4, processing: 2 },
};

export default function ZoneMap({ height = '400px' }) {
  return (
    <div style={{ borderRadius: '12px', overflow: 'hidden', height }}>
      <MapContainer
        center={[17.44, 78.42]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />
        {ZONES.map(zone => {
          const coords = zonePolygons[zone.id];
          if (!coords) return null;
          const color = riskColors[zone.risk];
          const claims = zoneClaims[zone.id];
          return (
            <Polygon
              key={zone.id}
              positions={coords}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: zone.risk === 'high' ? 0.35 : 0.15,
                weight: 2,
              }}
            >
              <Popup>
                <div style={{ fontFamily: 'DM Sans, sans-serif', minWidth: '180px' }}>
                  <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px', color: '#1a1a2e' }}>{zone.name}</div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Pin Code: {zone.pinCode}</div>
                  <div style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>Active Policies:</span>
                    <strong>{zonePolicies[zone.id] || 0}</strong>
                  </div>
                  {claims && (
                    <div style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>Claims Today:</span>
                      <strong>{claims.approved} approved, {claims.processing} processing</strong>
                    </div>
                  )}
                  <div style={{
                    marginTop: '8px', padding: '6px 10px', borderRadius: '6px',
                    background: zone.risk === 'high' ? '#FFE5E5' : zone.risk === 'medium' ? '#FFF3CD' : '#D4EDDA',
                    fontSize: '11px', fontWeight: 600,
                    color: zone.risk === 'high' ? '#CC0000' : zone.risk === 'medium' ? '#856404' : '#155724',
                  }}>
                    Risk Level: {zone.risk.toUpperCase()}
                    {zone.risk === 'high' && ' — ACTIVE TRIGGER'}
                  </div>
                </div>
              </Popup>
            </Polygon>
          );
        })}
      </MapContainer>
    </div>
  );
}
