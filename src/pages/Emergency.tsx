import React, { useState } from 'react';
import { Line, PolarArea, Bar, Doughnut } from 'react-chartjs-2';
import '../components/charts/ChartRegistry';
import { nationalHelplines, localEmergencyContacts } from '../data/emergency';
import { Badge } from '../components/common/Badge';
import {
  PhoneCall,
  AlertOctagon,
  Clock,
} from 'lucide-react';

export const Emergency: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'medical' | 'police' | 'fire' | 'blood'>('all');

  // Medical Response Time Chart (from original emergency.html)
  const medicalChartData = {
    labels: ['12pm', '2pm', '4pm', '6pm', '8pm', '10pm'],
    datasets: [
      {
        label: 'Ambulance Response Time (Minutes)',
        data: [12, 14, 11, 15, 13, 10],
        borderColor: '#dc2626',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // Police Coverage Polar Area Chart (from original emergency.html)
  const policeChartData = {
    labels: ['Katpadi', 'Sathuvachari', 'Old Town', 'Vellore Fort'],
    datasets: [
      {
        data: [25, 30, 20, 25],
        backgroundColor: ['#1e293b', '#334155', '#475569', '#64748b'],
      },
    ],
  };

  // Fire Department Readiness Chart (from original emergency.html)
  const fireChartData = {
    labels: ['Water Tenders', 'Rescue Vehicles', 'Active Staff', 'Foam Units'],
    datasets: [
      {
        label: 'Fleet Readiness Score',
        data: [18, 12, 45, 8],
        backgroundColor: '#f97316',
        borderRadius: 4,
      },
    ],
  };

  // Blood Bank Critical Units (from original emergency.html)
  const bloodChartData = {
    labels: ['O+ Positive', 'B+ Positive', 'A+ Positive', 'O- Critical', 'AB- Rare'],
    datasets: [
      {
        data: [42, 38, 25, 6, 4],
        backgroundColor: ['#ef4444', '#f87171', '#fca5a5', '#991b1b', '#7f1d1d'],
      },
    ],
  };

  const filteredLocalContacts = localEmergencyContacts.filter((c) => {
    return filterCategory === 'all' || c.category === filterCategory;
  });

  return (
    <div className="space-y-6">
      {/* Red Alert Header */}
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-white/20 backdrop-blur-xs">
              <AlertOctagon className="w-5 h-5 text-white" />
            </span>
            <h1 className="text-xl font-bold">Vellore Emergency Services & First Response</h1>
          </div>
          <p className="text-xs text-red-100 max-w-xl">
            Toll-free 24/7 direct helplines for Police, Medical Ambulance, Fire & Rescue, and Blood Transfusions
          </p>
        </div>

        <div className="flex items-center gap-2 bg-black/20 backdrop-blur-xs px-3.5 py-2 rounded-xl text-xs">
          <Clock className="w-4 h-4 text-red-200" />
          <span>Status: 24/7 Rapid Response Active</span>
        </div>
      </div>

      {/* National Helplines (One Click Dial) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <span>Primary National Lines (Toll-Free)</span>
          </h2>
          <Badge variant="live">24/7 Active</Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {nationalHelplines.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase">{item.category}</span>
                <p className="font-bold text-xs text-slate-800 dark:text-slate-100 mt-1 line-clamp-2">
                  {item.title}
                </p>
                <p className="text-2xl font-black text-rose-600 dark:text-rose-500 font-mono mt-2">
                  {item.phone}
                </p>
              </div>

              <a
                href={`tel:${item.phone}`}
                className="mt-3 w-full flex items-center justify-center gap-1.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call {item.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Local Hospital & Police Cards with REQUIRED 'Verify Before Use' badge */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Vellore District Hospital & Station Lines
            </h2>
            <p className="text-xs text-slate-400">
              Local station and hospital landline directories from project report
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {(['all', 'medical', 'police', 'fire', 'blood'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium capitalize transition-colors ${
                  filterCategory === cat
                    ? 'bg-rose-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLocalContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">
                    {contact.category}
                  </span>
                  {contact.verifyBeforeUse && (
                    <Badge variant="verify">Verify Before Use</Badge>
                  )}
                </div>

                <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                  {contact.title}
                </h3>
                {contact.address && (
                  <p className="text-[11px] text-slate-400 mt-1">{contact.address}</p>
                )}
                {contact.notes && (
                  <p className="text-[11px] text-slate-500 mt-1.5 italic bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                    {contact.notes}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-slate-700 dark:text-slate-200">
                  {contact.phone}
                </span>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-rose-600 hover:text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>Call</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Analytics Charts (From Original emergency.html) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ambulance Turnaround Time */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                108 Free Ambulance Response Times (Mins)
              </h3>
              <p className="text-[11px] text-slate-400">Average response latency by hour of day</p>
            </div>
            <Badge variant="sample">Sample report</Badge>
          </div>
          <div className="h-56 w-full">
            <Line
              data={medicalChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>
        </div>

        {/* Police Patrol Coverage */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                Police Patrol Sector Distribution
              </h3>
              <p className="text-[11px] text-slate-400">Coverage across Katpadi, Sathuvachari, Fort and Old Town</p>
            </div>
            <Badge variant="sample">Sample report</Badge>
          </div>
          <div className="h-56 w-full flex items-center justify-center">
            <PolarArea
              data={policeChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { boxWidth: 8, font: { size: 10 } } } },
              }}
            />
          </div>
        </div>

        {/* Fire Readiness */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                Fire & Rescue Readiness Index
              </h3>
              <p className="text-[11px] text-slate-400">Equipment & personnel readiness</p>
            </div>
            <Badge variant="sample">Sample report</Badge>
          </div>
          <div className="h-56 w-full">
            <Bar
              data={fireChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>
        </div>

        {/* Blood Bank Reserves */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                Blood Bank Critical Stock (Units)
              </h3>
              <p className="text-[11px] text-slate-400">CMC & District Blood Bank reserves</p>
            </div>
            <Badge variant="sample">Sample report</Badge>
          </div>
          <div className="h-56 w-full flex items-center justify-center">
            <Doughnut
              data={bloodChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { boxWidth: 8, font: { size: 10 } } } },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
