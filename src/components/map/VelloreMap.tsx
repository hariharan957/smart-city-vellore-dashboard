import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { landmarks, Landmark, VELLORE_COORDINATES } from '../../data/landmarks';
import { Locate, Search } from 'lucide-react';
import { Badge } from '../common/Badge';

// Create clean, category-colored SVG pin markers
const createCustomIcon = (category: Landmark['category']) => {
  const colors: Record<string, string> = {
    transit: '#3b82f6',
    hospital: '#ef4444',
    college: '#8b5cf6',
    police: '#1e293b',
    park: '#10b981',
    ev: '#06b6d4',
    wifi: '#f59e0b',
    tourist: '#ec4899',
  };

  const bg = colors[category] || '#0f766e';

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `<div style="
      background-color: ${bg};
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    "><div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

function ChangeMapView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export const VelloreMap: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [center, setCenter] = useState<[number, number]>([
    VELLORE_COORDINATES.lat,
    VELLORE_COORDINATES.lng,
  ]);
  const [zoom, setZoom] = useState(13);

  const categories = [
    { id: 'all', label: 'All POIs' },
    { id: 'transit', label: 'Bus & Rail' },
    { id: 'hospital', label: 'Hospitals' },
    { id: 'college', label: 'Colleges' },
    { id: 'police', label: 'Police' },
    { id: 'tourist', label: 'Attractions' },
    { id: 'ev', label: 'EV Charging' },
    { id: 'wifi', label: 'Public Wi-Fi' },
    { id: 'park', label: 'Parks' },
  ];

  const filteredLandmarks = landmarks.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCenter([pos.coords.latitude, pos.coords.longitude]);
          setZoom(15);
        },
        () => {
          alert('Could not access current location. Centering on Vellore city center.');
          setCenter([VELLORE_COORDINATES.lat, VELLORE_COORDINATES.lng]);
        }
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Controls & Filter bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search landmarks, Fort, VIT, CMC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-transparent focus:border-teal-500 focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedCategory === c.id
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleLocateMe}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 hover:bg-teal-100 transition-colors"
        >
          <Locate className="w-3.5 h-3.5" />
          Locate Me
        </button>
      </div>

      {/* Map Container */}
      <div className="h-[550px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative shadow-sm">
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <ChangeMapView center={center} zoom={zoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredLandmarks.map((point) => (
            <Marker
              key={point.id}
              position={[point.lat, point.lng]}
              icon={createCustomIcon(point.category)}
            >
              <Popup>
                <div className="p-1">
                  <Badge variant="sample" className="mb-1 uppercase text-[10px]">
                    {point.category}
                  </Badge>
                  <h3 className="font-bold text-sm text-slate-900">{point.name}</h3>
                  <p className="text-xs text-slate-600 mt-1">{point.address}</p>
                  <p className="text-xs text-slate-500 mt-1.5">{point.description}</p>
                  {point.contact && (
                    <p className="text-xs font-semibold text-teal-700 mt-2">
                      Tel: {point.contact}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
