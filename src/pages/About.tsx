import React from 'react';
import { Badge } from '../components/common/Badge';
import {
  Building2,
  ShieldCheck,
  Database,
  Globe2,
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-600 flex items-center justify-center text-white font-bold text-xl mb-3 shadow-md">
          <Building2 className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
          Smart City Information Dashboard – Vellore
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Unified Municipal Open Intelligence Portal • Vellore Metropolitan Region, Tamil Nadu
        </p>
      </div>

      {/* Mission & Purpose */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-3 text-teal-700 dark:text-teal-400">
          <Globe2 className="w-5 h-5" />
          <h2 className="text-sm font-bold uppercase tracking-wider">Mission & Regional Scope</h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          The Vellore Smart City Information Portal serves as a unified civic dashboard providing citizens, students, and visitors with consolidated access to real-time environmental metrics, public transit schedules, municipal utilities status, and emergency response services across the Vellore metropolitan area (12.9165° N, 79.1325° E).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">Live Climate & Air</span>
            <span className="text-slate-500 text-[11px]">Real-time Open-Meteo feeds for temperature, humidity, UV, and US AQI indices.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">Multi-Modal Mobility</span>
            <span className="text-slate-500 text-[11px]">Katpadi Junction rail schedules, intercity bus bays, and airport corridors.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">Public Safety & Redressal</span>
            <span className="text-slate-500 text-[11px]">Verified emergency dispatch helplines and municipal grievance tracking.</span>
          </div>
        </div>
      </div>

      {/* Data Architecture & Sources */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-3 text-teal-700 dark:text-teal-400">
          <Database className="w-5 h-5" />
          <h2 className="text-sm font-bold uppercase tracking-wider">Data Transparency & Ethics</h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          To maintain transparency and reliability, the dashboard clearly demarcates live verified telemetry from simulated municipal planning models:
        </p>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300 mb-1">
              <Badge variant="live">Live Data</Badge>
              <span>Verified Open APIs</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Weather and Air Quality telemetry are fetched dynamically from <strong>Open-Meteo</strong> based on Vellore coordinates (12.9165°N, 79.1325°E). GIS layers and geographic positioning use <strong>OpenStreetMap</strong> via <strong>Leaflet</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300 mb-1">
              <Badge variant="sample">Sample Municipal Data</Badge>
              <span>Civic Models</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Traffic congestion index, grid electrical demand, civic complaints registry, and smart city mission capital expenditures are modeled civic representations in <code>/src/data</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Policy */}
      <div id="privacy" className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-3 text-teal-700 dark:text-teal-400">
          <ShieldCheck className="w-5 h-5" />
          <h2 className="text-sm font-bold uppercase tracking-wider">Privacy Policy & Disclaimers</h2>
        </div>
        <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 list-disc list-inside leading-relaxed">
          <li><strong>No External Tracking:</strong> No tracking cookies, advertising scripts, or third-party user fingerprinting are employed.</li>
          <li><strong>Client-Side Local Storage:</strong> Demo citizen profile names and lodged complaints remain strictly within the client browser (LocalStorage).</li>
          <li><strong>Emergency Telephone Numbers:</strong> National lines (108, 100, 101, 1091, 1930) are standard helplines. Local facility extensions are marked with a verification badge and should be verified prior to emergency use.</li>
        </ul>

        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Released under the MIT Open Source License.</span>
          <span>Version 1.0.0 Production</span>
        </div>
      </div>
    </div>
  );
};
