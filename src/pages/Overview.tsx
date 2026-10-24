import React, { useState } from 'react';
import { Line, Pie, Bar, Doughnut } from 'react-chartjs-2';
import '../components/charts/ChartRegistry';
import { useWeather } from '../hooks/useWeather';
import { useAirQuality } from '../hooks/useAirQuality';
import { useLiveClock } from '../hooks/useLiveClock';
import { useLanguageStore } from '../store/languageStore';
import { Badge } from '../components/common/Badge';
import { MiniMap } from '../components/map/MiniMap';
import {
  citizensAnalyticsData,
  infrastructurePieData,
  powerConsumptionBarData,
  accidentRiskGaugeData,
  civicAlertsTicker,
} from '../data/mockAnalytics';
import {
  Thermometer,
  Wind,
  Car,
  Zap,
  Droplets,
  MessageSquareWarning,
  Clock,
  Calendar,
  RefreshCw,
  Bell,
} from 'lucide-react';

export const Overview: React.FC = () => {
  const { weather } = useWeather();
  const { airQuality } = useAirQuality();
  const { timeString, dateString } = useLiveClock();
  const { t } = useLanguageStore();

  // Live power usage interactive state (from original report)
  const [livePower, setLivePower] = useState(2100);
  const handleUpdatePower = () => {
    const newVal = Math.floor(Math.random() * 500) + 1800;
    setLivePower(newVal);
  };

  const powerPercent = Math.min(100, Math.max(10, ((livePower - 1800) / 500) * 100));

  return (
    <div className="space-y-6">
      {/* City Banner & Live Clock */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              Vellore Metropolitan City Center
            </h1>
            <Badge variant="live">Live Monitoring</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Coordinates: 12.9165° N, 79.1325° E • Elevation: 216m • Tamil Nadu, India
          </p>
        </div>

        {/* Live Clock Card */}
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400">
            <Clock className="w-4 h-4 shrink-0" />
            <span className="font-mono font-bold text-sm">{timeString}</span>
          </div>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-xs">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="font-medium">{dateString}</span>
          </div>
        </div>
      </div>

      {/* Alerts Ticker */}
      <div className="flex items-center gap-3 bg-teal-50 dark:bg-teal-950/30 border border-teal-200/60 dark:border-teal-900/50 px-4 py-2.5 rounded-xl text-xs text-teal-900 dark:text-teal-200">
        <Bell className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
        <div className="overflow-hidden whitespace-nowrap w-full">
          <div className="animate-marquee inline-block font-medium">
            {civicAlertsTicker.join(' • ')}
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Temperature (Live) */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium">{t.overview.kpiTemp}</span>
            <Thermometer className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {weather.current.temperature}°C
          </p>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[10px] text-slate-400">Humidity {weather.current.humidity}%</span>
            <Badge variant="live" className="text-[9px] px-1.5 py-0">Live</Badge>
          </div>
        </div>

        {/* Air Quality (Live) */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium">{t.overview.kpiAqi}</span>
            <Wind className="w-4 h-4 text-yellow-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {airQuality.current.usAqi} <span className="text-xs font-normal text-slate-500">AQI</span>
          </p>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[10px] text-slate-400">PM2.5: {airQuality.current.pm25}</span>
            <Badge variant="live" className="text-[9px] px-1.5 py-0">Live</Badge>
          </div>
        </div>

        {/* Traffic Flow (Sample) */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium">{t.overview.kpiTraffic}</span>
            <Car className="w-4 h-4 text-teal-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Moderate
          </p>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[10px] text-slate-400">NH 48 Smooth</span>
            <Badge variant="sample" className="text-[9px] px-1.5 py-0">Sample</Badge>
          </div>
        </div>

        {/* Power Grid (Sample) */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium">{t.overview.kpiPower}</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {livePower} <span className="text-xs font-normal text-slate-500">MU</span>
          </p>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[10px] text-slate-400">Grid Stable</span>
            <Badge variant="sample" className="text-[9px] px-1.5 py-0">Sample</Badge>
          </div>
        </div>

        {/* Water Reservoir (Sample) */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium">{t.overview.kpiWater}</span>
            <Droplets className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
            74.2%
          </p>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[10px] text-slate-400">Otteri / Palar</span>
            <Badge variant="sample" className="text-[9px] px-1.5 py-0">Sample</Badge>
          </div>
        </div>

        {/* Civic Grievances (Sample) */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium">{t.overview.kpiComplaints}</span>
            <MessageSquareWarning className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
            18
          </p>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[10px] text-slate-400">89% Resolved</span>
            <Badge variant="sample" className="text-[9px] px-1.5 py-0">Sample</Badge>
          </div>
        </div>
      </div>

      {/* Main Charts Row: Citizens Analytics & Infrastructure Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Citizens Trend Chart (from original index.html) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {t.overview.citizensTrend}
              </h2>
              <p className="text-xs text-slate-400">Population, literacy and tourist inflows</p>
            </div>
            <Badge variant="sample">Sample data</Badge>
          </div>
          <div className="h-64 w-full">
            <Line
              data={citizensAnalyticsData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { boxWidth: 10, font: { size: 11 } },
                  },
                },
                scales: {
                  y: { beginAtZero: false },
                },
              }}
            />
          </div>
        </div>

        {/* Infrastructure Distribution Pie Chart (from original index.html) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {t.overview.infraDist}
              </h2>
              <p className="text-xs text-slate-400">Categorical land use breakdown (%)</p>
            </div>
            <Badge variant="sample">Sample data</Badge>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <Pie
              data={infrastructurePieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { boxWidth: 10, font: { size: 11 } },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Secondary Row: Power Consumption & Accident Risk & Mini Map */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Power Consumption & Live Power Bar (from original index.html) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-xs text-slate-800 dark:text-slate-200">
              {t.overview.powerConsumption}
            </h3>
            <Badge variant="sample">Sample data</Badge>
          </div>

          <div className="h-44 w-full mb-4">
            <Bar
              data={powerConsumptionBarData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: false } },
              }}
            />
          </div>

          {/* Live Power Usage Widget */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {t.overview.livePower}
              </span>
              <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                {livePower} MU
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mb-2.5">
              <div
                className="bg-teal-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${powerPercent}%` }}
              />
            </div>
            <button
              onClick={handleUpdatePower}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-teal-700 dark:text-teal-300 bg-white dark:bg-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{t.overview.updatePower}</span>
            </button>
          </div>
        </div>

        {/* Accident Risk by Hotspot (from original gaugeChart) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-xs text-slate-800 dark:text-slate-200">
              {t.overview.accidentRisk}
            </h3>
            <Badge variant="sample">Sample data</Badge>
          </div>
          <div className="h-56 w-full flex items-center justify-center">
            <Doughnut
              data={accidentRiskGaugeData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { boxWidth: 8, font: { size: 10 } },
                  },
                },
              }}
            />
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            NH 48 & Katpadi Junction represent primary safety intervention corridors
          </p>
        </div>

        {/* Mini OpenStreetMap Box (Replaces Google Maps Embed iframe) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                City Map Overview
              </h3>
              <p className="text-[11px] text-slate-400">Leaflet + OpenStreetMap</p>
            </div>
            <Badge variant="live">OSM Active</Badge>
          </div>
          <MiniMap />
          <div className="mt-3 text-center">
            <a
              href="#/map"
              className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
            >
              Open Full Interactive GIS Map →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
