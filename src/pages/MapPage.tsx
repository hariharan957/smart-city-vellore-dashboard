import React from 'react';
import { VelloreMap } from '../components/map/VelloreMap';
import { Badge } from '../components/common/Badge';

export const MapPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Interactive GIS Map of Vellore
            </h1>
            <Badge variant="live">Leaflet + OpenStreetMap</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Explore bus terminals, hospitals, colleges, police booths, EV chargers, Wi-Fi spots and heritage attractions
          </p>
        </div>
      </div>

      <VelloreMap />
    </div>
  );
};
