import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { VELLORE_COORDINATES } from '../../data/landmarks';

const defaultIcon = L.divIcon({
  className: 'mini-map-pin',
  html: `<div style="
    background-color: #0f766e;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  "></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export const MiniMap: React.FC = () => {
  return (
    <div className="h-48 w-full rounded-xl overflow-hidden relative border border-slate-200 dark:border-slate-800">
      <MapContainer
        center={[VELLORE_COORDINATES.lat, VELLORE_COORDINATES.lng]}
        zoom={12}
        scrollWheelZoom={false}
        attributionControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[12.9692, 79.1559]} icon={defaultIcon}>
          <Popup>
            <div className="text-xs font-semibold">VIT Vellore Campus</div>
          </Popup>
        </Marker>
        <Marker position={[12.9202, 79.1325]} icon={defaultIcon}>
          <Popup>
            <div className="text-xs font-semibold">Vellore Fort & City Center</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
