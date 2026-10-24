import React, { useState } from 'react';
import { busServices, trainServices, airportServices, TransitItem } from '../data/transport';
import { useTransportFilterStore, RouteCategory } from '../store/transportFilterStore';
import { Badge } from '../components/common/Badge';
import {
  Bus,
  Train,
  Plane,
  Search,
  MapPin,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const Transport: React.FC = () => {
  const { category, searchQuery, setCategory, setSearchQuery } = useTransportFilterStore();
  const [sortField, setSortField] = useState<'departure' | 'serviceNumber' | 'operator'>('departure');
  const [sortAsc, setSortAsc] = useState(true);

  // Filter buses
  const filteredBuses = busServices.filter((b) => {
    const matchCat = category === 'all' || b.routeCategory === category;
    const matchSearch =
      b.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Filter trains
  const filteredTrains = trainServices.filter((t) => {
    const matchCat = category === 'all' || t.routeCategory === category;
    const matchSearch =
      t.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.serviceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Combined timetable items
  const combinedTimetable: TransitItem[] = [...filteredBuses, ...filteredTrains].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const openExternalMap = (place: string) => {
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(place)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Banner */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Vellore Multi-Modal Transit Hub
            </h1>
            <Badge variant="sample">Sample Timetable</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Unified corridor tracking for Buses, Katpadi Junction (KPD) Trains & Nearby Airports
          </p>
        </div>

        {/* Global Synchronized Route Filter & Search */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Synchronized Corridor Filter */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {(['all', 'chennai', 'bangalore', 'local'] as RouteCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold capitalize transition-all ${
                  category === cat
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                {cat === 'all' ? 'All Corridors' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter routes, train #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Main 3 Transit Categories Cards (Updated synchronously by filter!) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Buses Card */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Bus className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Intercity & City Buses
                  </h2>
                  <p className="text-[10px] text-slate-400">New Central Bus Terminus</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                {filteredBuses.length} Services
              </span>
            </div>

            <ul className="space-y-2 mt-4 text-xs">
              {filteredBuses.map((bus) => (
                <li
                  key={bus.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{bus.route}</p>
                    <p className="text-[11px] text-slate-400">
                      {bus.operator} • {bus.departure} ({bus.duration})
                    </p>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-teal-600 dark:text-teal-400">
                    {bus.fare}
                  </span>
                </li>
              ))}
              {filteredBuses.length === 0 && (
                <li className="text-center py-6 text-slate-400">No buses matching filter</li>
              )}
            </ul>
          </div>

          <button
            onClick={() => openExternalMap('Vellore New Bus Stand')}
            className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 rounded-xl transition-colors"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>View Bus Stand Map</span>
          </button>
        </div>

        {/* Trains Card (Katpadi Junction) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Train className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Katpadi Junction (KPD)
                  </h2>
                  <p className="text-[10px] text-slate-400">Southern Railway Mainline</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400">
                {filteredTrains.length} Trains
              </span>
            </div>

            <ul className="space-y-2 mt-4 text-xs">
              {filteredTrains.map((train) => (
                <li
                  key={train.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{train.serviceNumber}</p>
                    <p className="text-[11px] text-slate-400">
                      {train.destination} • {train.departure} ({train.platformOrBay})
                    </p>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-blue-600 dark:text-blue-400">
                    {train.fare}
                  </span>
                </li>
              ))}
              {filteredTrains.length === 0 && (
                <li className="text-center py-6 text-slate-400">No trains matching filter</li>
              )}
            </ul>
          </div>

          <button
            onClick={() => openExternalMap('Katpadi Junction Railway Station')}
            className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 rounded-xl transition-colors"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>View Katpadi Station Map</span>
          </button>
        </div>

        {/* Nearby Airports Card */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Nearby Airports
                  </h2>
                  <p className="text-[10px] text-slate-400">Transit connection guide</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                3 Airports
              </span>
            </div>

            <ul className="space-y-2 mt-4 text-xs">
              {airportServices.map((airport) => (
                <li
                  key={airport.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {airport.name} ({airport.code})
                    </p>
                    <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold">
                      {airport.distanceFromVellore}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{airport.travelTimeByRoad}</p>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => openExternalMap('Chennai International Airport')}
            className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 rounded-xl transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Airport Transit Guide</span>
          </button>
        </div>
      </div>

      {/* Sortable Timetable Table */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Corridor Timetable Master Index
            </h2>
            <p className="text-xs text-slate-400">Click column headers to sort</p>
          </div>
          <Badge variant="sample">Sample Schedule</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase text-[10px] font-semibold border-y border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Type</th>
                <th
                  onClick={() => toggleSort('serviceNumber')}
                  className="py-2.5 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100"
                >
                  <div className="flex items-center gap-1">
                    <span>Service / ID</span>
                    {sortField === 'serviceNumber' && (sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                  </div>
                </th>
                <th className="py-2.5 px-3">Route & Corridor</th>
                <th
                  onClick={() => toggleSort('operator')}
                  className="py-2.5 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100"
                >
                  <div className="flex items-center gap-1">
                    <span>Operator</span>
                    {sortField === 'operator' && (sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('departure')}
                  className="py-2.5 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100"
                >
                  <div className="flex items-center gap-1">
                    <span>Departure</span>
                    {sortField === 'departure' && (sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                  </div>
                </th>
                <th className="py-2.5 px-3">Duration</th>
                <th className="py-2.5 px-3">Platform / Bay</th>
                <th className="py-2.5 px-3">Fare</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {combinedTimetable.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-2.5 px-3">
                    {item.type === 'bus' ? (
                      <span className="p-1 rounded bg-teal-500/10 text-teal-600 inline-block">
                        <Bus className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="p-1 rounded bg-blue-500/10 text-blue-600 inline-block">
                        <Train className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                    {item.serviceNumber}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">{item.route}</td>
                  <td className="py-2.5 px-3 text-slate-500">{item.operator}</td>
                  <td className="py-2.5 px-3 font-mono font-medium">{item.departure}</td>
                  <td className="py-2.5 px-3 text-slate-400">{item.duration}</td>
                  <td className="py-2.5 px-3 text-slate-500">{item.platformOrBay}</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-teal-600 dark:text-teal-400">
                    {item.fare}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {item.status}
                    </span>
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
