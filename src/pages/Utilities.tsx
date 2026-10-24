import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../components/charts/ChartRegistry';
import {
  utilityZones,
  waterSupplyStats,
  electricityStats,
  solidWasteStats,
} from '../data/utilities';
import { Badge } from '../components/common/Badge';
import { Droplets, Zap, Trash2, Sun, CheckCircle2 } from 'lucide-react';

export const Utilities: React.FC = () => {
  const zoneComparisonData = {
    labels: utilityZones.map((z) => z.zoneName.split('–')[0].trim()),
    datasets: [
      {
        label: 'Water Quality Score (0-100)',
        data: utilityZones.map((z) => z.waterQualityIndex),
        backgroundColor: '#3b82f6',
        borderRadius: 4,
      },
      {
        label: 'Waste Segregation Efficiency (%)',
        data: utilityZones.map((z) => z.wasteCollectionEfficiency),
        backgroundColor: '#10b981',
        borderRadius: 4,
      },
      {
        label: 'Rooftop Solar Installed (MWp)',
        data: utilityZones.map((z) => z.solarRoofTopsMWp * 10), // scaled for visualization
        backgroundColor: '#f59e0b',
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Vellore Municipal Utilities & Power Grid
            </h1>
            <Badge variant="sample">Municipal Sample Data</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Water distribution, TANGEDCO electrical grid load, and solid waste processing
          </p>
        </div>
      </div>

      {/* 3 Pillar Metric Cards: Water, Electricity, Solid Waste */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Water Management */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">Water Supply</h2>
                  <p className="text-[10px] text-slate-400">{waterSupplyStats.sourceReservoir}</p>
                </div>
              </div>
              <Badge variant="sample">Palar Basin</Badge>
            </div>

            <div className="my-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500">Reservoir Storage</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {waterSupplyStats.reservoirStoragePercent}%
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: `${waterSupplyStats.reservoirStoragePercent}%` }}
                />
              </div>
            </div>

            <ul className="space-y-2 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
              <li className="flex justify-between">
                <span className="text-slate-500">Daily Pumping:</span>
                <span className="font-semibold">{waterSupplyStats.dailyPumpingCapacityMLD} MLD</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-500">Water Quality:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {waterSupplyStats.purityGrade}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-500">pH Level / Turbidity:</span>
                <span className="font-mono text-[11px]">{waterSupplyStats.phLevel} pH / {waterSupplyStats.turbidityNTU} NTU</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Electricity & Grid */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">TANGEDCO Grid</h2>
                  <p className="text-[10px] text-slate-400">{electricityStats.circle}</p>
                </div>
              </div>
              <Badge variant="sample">Active Substation</Badge>
            </div>

            <div className="my-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500">Peak Demand vs Capacity</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {electricityStats.currentLoadMW} / {electricityStats.peakDemandMW} MW
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full"
                  style={{ width: `${(electricityStats.currentLoadMW / electricityStats.peakDemandMW) * 100}%` }}
                />
              </div>
            </div>

            <ul className="space-y-2 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
              <li className="flex justify-between">
                <span className="text-slate-500">Daily Energy:</span>
                <span className="font-semibold">{electricityStats.dailyConsumptionMU} MU</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-500">Solar Injected:</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Sun className="w-3 h-3" />
                  {electricityStats.solarGridMWp} MWp
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-500">Smart Meters:</span>
                <span className="font-mono text-[11px]">{electricityStats.smartMetersInstalled.toLocaleString()} units</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Solid Waste Management */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">Solid Waste</h2>
                  <p className="text-[10px] text-slate-400">Sathuvachari Yard Processing</p>
                </div>
              </div>
              <Badge variant="sample">Clean City</Badge>
            </div>

            <div className="my-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500">Source Segregation Rate</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {solidWasteStats.sourceSegregationPercent}%
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${solidWasteStats.sourceSegregationPercent}%` }}
                />
              </div>
            </div>

            <ul className="space-y-2 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
              <li className="flex justify-between">
                <span className="text-slate-500">Daily Collected:</span>
                <span className="font-semibold">{solidWasteStats.dailyCollectionTonnes} Tonnes</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-500">Composted & Recycled:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {solidWasteStats.wetWasteCompostedTonnes + solidWasteStats.dryRecycledTonnes} Tonnes
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-500">Smart Bins Online:</span>
                <span className="font-mono text-[11px]">{solidWasteStats.smartBinsOperational} IoT Bins</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Zone-Wise Comparison Chart & Table */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Ward-Wise Utility Efficiency Comparison
            </h2>
            <p className="text-xs text-slate-400">Comparing Katpadi, Sathuvachari, Fort and Shenbakkam</p>
          </div>
          <Badge variant="sample">Zone Analytics</Badge>
        </div>

        <div className="h-64 w-full mb-6">
          <Bar
            data={zoneComparisonData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } } },
              scales: { y: { beginAtZero: true } },
            }}
          />
        </div>

        {/* Zone Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase text-[10px] font-semibold border-y border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Zone Name</th>
                <th className="py-2.5 px-3">Population Served</th>
                <th className="py-2.5 px-3">Daily Water Hours</th>
                <th className="py-2.5 px-3">Power Uptime</th>
                <th className="py-2.5 px-3">Waste Efficiency</th>
                <th className="py-2.5 px-3">Solar MWp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {utilityZones.map((zone) => (
                <tr key={zone.zoneId} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                    {zone.zoneName}
                  </td>
                  <td className="py-2.5 px-3">{zone.populationServed}</td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400 font-mono">
                    {zone.waterSupplyHours}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-emerald-600 dark:text-emerald-400">
                    {zone.powerUptimePercentage}%
                  </td>
                  <td className="py-2.5 px-3">{zone.wasteCollectionEfficiency}%</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-amber-600 dark:text-amber-400">
                    {zone.solarRoofTopsMWp} MWp
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
