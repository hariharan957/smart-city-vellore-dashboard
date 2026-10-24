import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import '../components/charts/ChartRegistry';
import { useAirQuality } from '../hooks/useAirQuality';
import { getAqiCategory } from '../services/api';
import { Badge } from '../components/common/Badge';
import { Skeleton } from '../components/common/Skeleton';
import { HeartPulse, RefreshCw, Activity } from 'lucide-react';

export const Pollution: React.FC = () => {
  const { airQuality, loading, refresh } = useAirQuality();

  const aqiCategory = getAqiCategory(airQuality.current.usAqi);

  const aqiTrendChartData = {
    labels: airQuality.hourly.times,
    datasets: [
      {
        label: 'US AQI Index',
        data: airQuality.hourly.usAqi,
        borderColor: '#eab308',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const particulateChartData = {
    labels: airQuality.hourly.times,
    datasets: [
      {
        label: 'PM2.5 (µg/m³)',
        data: airQuality.hourly.pm25,
        backgroundColor: '#ef4444',
        borderRadius: 4,
      },
      {
        label: 'PM10 (µg/m³)',
        data: airQuality.hourly.pm10,
        backgroundColor: '#f97316',
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Vellore Air Quality & Environmental Hub
            </h1>
            <Badge variant={airQuality.isLive ? 'live' : 'sample'}>
              {airQuality.isLive ? 'Live AQI' : 'Cached Model'}
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            Automated sensor monitoring for Vellore urban and Katpadi industrial corridors
          </p>
        </div>

        <button
          onClick={refresh}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 rounded-xl hover:bg-teal-100 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh AQI</span>
        </button>
      </div>

      {/* Main AQI Status & Health Advisory Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main AQI Dial Card */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase">Current Air Quality</span>
              <Activity className="w-4 h-4 text-teal-500" />
            </div>

            <div className="flex items-baseline gap-3 my-2">
              {loading ? (
                <Skeleton className="h-10 w-24" />
              ) : (
                <span className={`text-4xl font-extrabold ${aqiCategory.color}`}>
                  {airQuality.current.usAqi}
                </span>
              )}
              <span className="text-xs text-slate-400">US AQI Standard</span>
            </div>

            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${aqiCategory.bg} ${aqiCategory.color}`}>
              {aqiCategory.label}
            </span>
          </div>

          <p className="text-[11px] text-slate-400 mt-4 border-t border-slate-100 dark:border-slate-800 pt-3">
            European AQI: <strong className="text-slate-700 dark:text-slate-300">{airQuality.current.europeanAqi}</strong>
          </p>
        </div>

        {/* Health Advisory */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-teal-700 dark:text-teal-400">
              <HeartPulse className="w-5 h-5 shrink-0" />
              <h2 className="text-sm font-bold">Public Health & Citizen Advisory</h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {aqiCategory.advisory}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Outdoor Exercise</span>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                {airQuality.current.usAqi > 100 ? 'Limit heavy jogging' : 'Safe for all activities'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Sensitive Groups</span>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                {airQuality.current.usAqi > 100 ? 'Wear N95 if outdoors' : 'Standard precautions'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Indoor Ventilation</span>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                Natural morning breeze okay
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Particulate & Gaseous Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-400">PM2.5</span>
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            {airQuality.current.pm25} <span className="text-xs font-normal">µg/m³</span>
          </p>
          <span className="text-[10px] text-slate-400">Fine particles</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-400">PM10</span>
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            {airQuality.current.pm10} <span className="text-xs font-normal">µg/m³</span>
          </p>
          <span className="text-[10px] text-slate-400">Respirable dust</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-400">NO₂ (Nitrogen Dioxide)</span>
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            {airQuality.current.no2} <span className="text-xs font-normal">µg/m³</span>
          </p>
          <span className="text-[10px] text-emerald-500 font-medium">Safe range</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-400">CO (Carbon Monoxide)</span>
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            {airQuality.current.co} <span className="text-xs font-normal">µg/m³</span>
          </p>
          <span className="text-[10px] text-emerald-500 font-medium">Safe range</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-400">SO₂ (Sulphur Dioxide)</span>
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            {airQuality.current.so2} <span className="text-xs font-normal">µg/m³</span>
          </p>
          <span className="text-[10px] text-emerald-500 font-medium">Very low</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-400">O₃ (Ozone)</span>
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            {airQuality.current.ozone} <span className="text-xs font-normal">µg/m³</span>
          </p>
          <span className="text-[10px] text-slate-400">Ground level</span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-1">
            24-Hour AQI Trend Curve
          </h2>
          <p className="text-xs text-slate-400 mb-4">Historical US AQI index over recent hours</p>
          <div className="h-64 w-full">
            <Line
              data={aqiTrendChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } } },
                scales: { y: { beginAtZero: false } },
              }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-1">
            Particulate Matter Composition (PM2.5 vs PM10)
          </h2>
          <p className="text-xs text-slate-400 mb-4">Micron distribution across time intervals</p>
          <div className="h-64 w-full">
            <Bar
              data={particulateChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
