import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import '../components/charts/ChartRegistry';
import { useWeather } from '../hooks/useWeather';
import { getWeatherConditionText } from '../services/api';
import { Badge } from '../components/common/Badge';
import { Skeleton } from '../components/common/Skeleton';
import {
  Thermometer,
  Droplets,
  Wind,
  Sun,
  CloudRain,
  RefreshCw,
  Compass,
} from 'lucide-react';

export const Climate: React.FC = () => {
  const { weather, loading, error, refresh } = useWeather();

  const hourlyChartData = {
    labels: weather.hourly.times,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: weather.hourly.temperatures,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.3,
        yAxisID: 'y',
      },
      {
        label: 'Rain Probability (%)',
        data: weather.hourly.rainProbabilities,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.3,
        yAxisID: 'y1',
      },
    ],
  };

  const dailyChartData = {
    labels: weather.daily.dates,
    datasets: [
      {
        label: 'Max Temp (°C)',
        data: weather.daily.maxTemps,
        backgroundColor: '#f97316',
        borderRadius: 4,
      },
      {
        label: 'Min Temp (°C)',
        data: weather.daily.minTemps,
        backgroundColor: '#38bdf8',
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Vellore Climate & Weather Intelligence
            </h1>
            <Badge variant={weather.isLive ? 'live' : 'sample'}>
              {weather.isLive ? 'Open-Meteo Live' : 'Cached Model'}
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            Real-time atmospheric observations for Vellore coordinates (12.9165° N, 79.1325° E)
          </p>
        </div>

        <button
          onClick={refresh}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 rounded-xl hover:bg-teal-100 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400">
          Note: Unable to reach upstream Open-Meteo API. Operating in resilient offline model.
        </div>
      )}

      {/* Main Condition Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Temperature */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Temperature</span>
            <Thermometer className="w-4 h-4 text-rose-500" />
          </div>
          {loading ? (
            <Skeleton className="h-7 w-20" />
          ) : (
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {weather.current.temperature}°C
            </p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">
            Feels like {weather.current.apparentTemperature}°C
          </p>
        </div>

        {/* Condition */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Conditions</span>
            <Sun className="w-4 h-4 text-amber-500" />
          </div>
          {loading ? (
            <Skeleton className="h-7 w-24" />
          ) : (
            <p className="text-base font-bold text-slate-900 dark:text-slate-100 truncate">
              {getWeatherConditionText(weather.current.weatherCode)}
            </p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">Typical Vellore dry climate</p>
        </div>

        {/* Humidity */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Humidity</span>
            <Droplets className="w-4 h-4 text-blue-500" />
          </div>
          {loading ? (
            <Skeleton className="h-7 w-16" />
          ) : (
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {weather.current.humidity}%
            </p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">Afternoon drops expected</p>
        </div>

        {/* Wind Speed */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Wind Speed</span>
            <Wind className="w-4 h-4 text-teal-500" />
          </div>
          {loading ? (
            <Skeleton className="h-7 w-20" />
          ) : (
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {weather.current.windSpeed} <span className="text-xs font-normal">km/h</span>
            </p>
          )}
          <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <Compass className="w-3 h-3" />
            <span>Direction: {weather.current.windDirection}°</span>
          </p>
        </div>

        {/* UV Index & Rain */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">UV & Rain</span>
            <CloudRain className="w-4 h-4 text-indigo-500" />
          </div>
          {loading ? (
            <Skeleton className="h-7 w-16" />
          ) : (
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              UV {weather.current.uvIndex}
            </p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">
            Precipitation: {weather.current.precipitation} mm
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Forecast */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                12-Hour Temperature & Rain Probability
              </h2>
              <p className="text-xs text-slate-400">Hourly trend analysis</p>
            </div>
            <Badge variant="live">Hourly Live</Badge>
          </div>
          <div className="h-64 w-full">
            <Line
              data={hourlyChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } },
                },
                scales: {
                  y: { type: 'linear', position: 'left', title: { display: true, text: '°C' } },
                  y1: {
                    type: 'linear',
                    position: 'right',
                    grid: { drawOnChartArea: false },
                    title: { display: true, text: '%' },
                    min: 0,
                    max: 100,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                7-Day Temperature Range (High / Low)
              </h2>
              <p className="text-xs text-slate-400">Weekly weather outlook</p>
            </div>
            <Badge variant="live">7-Day Forecast</Badge>
          </div>
          <div className="h-64 w-full">
            <Bar
              data={dailyChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } },
                },
                scales: {
                  y: { beginAtZero: false, title: { display: true, text: '°C' } },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
