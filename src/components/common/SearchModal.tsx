import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Compass, ArrowRight } from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';

interface SearchItem {
  title: string;
  category: string;
  path: string;
  keywords: string[];
}

const SEARCH_DATABASE: SearchItem[] = [
  { title: 'Overview & City KPIs', category: 'General', path: '/', keywords: ['home', 'overview', 'kpi', 'dashboard', 'power', 'citizens', 'population', 'infrastructure'] },
  { title: 'Climate & Weather Forecast', category: 'Environment', path: '/climate', keywords: ['weather', 'climate', 'temperature', 'forecast', 'rain', 'humidity', 'heat', 'wind', 'uv'] },
  { title: 'Air Quality & Pollution (AQI)', category: 'Environment', path: '/pollution', keywords: ['pollution', 'aqi', 'air quality', 'smog', 'pm2.5', 'pm10', 'ozone', 'co', 'gases', 'mask'] },
  { title: 'Transport & Bus Routes', category: 'Mobility', path: '/transport', keywords: ['transport', 'bus', 'chennai', 'bangalore', 'train', 'flight', 'route', 'timetable', 'transit', 'katpadi'] },
  { title: 'Katpadi Junction Railway Schedule', category: 'Mobility', path: '/transport', keywords: ['train', 'katpadi', 'railway', 'station', 'shatabdi', 'vande bharat', 'express'] },
  { title: 'Nearby Airports (Chennai / BLR / TIR)', category: 'Mobility', path: '/transport', keywords: ['airport', 'flight', 'chennai airport', 'bangalore airport', 'tirupati airport'] },
  { title: 'Interactive City GIS Map', category: 'Navigation', path: '/map', keywords: ['map', 'gis', 'landmarks', 'vit', 'fort', 'golden temple', 'ev', 'wifi', 'hospital', 'locate me'] },
  { title: 'Municipal Utilities (Water, Power, Waste)', category: 'Public Works', path: '/utilities', keywords: ['utilities', 'water', 'electricity', 'power', 'waste', 'palar river', 'otteri', 'tangedco'] },
  { title: 'Emergency Services & Helplines', category: 'Safety', path: '/emergency', keywords: ['emergency', 'police', 'ambulance', 'fire', 'blood', '108', '100', '101', 'cmc emergency', 'hospital'] },
  { title: 'Civic Grievance Redressal (Complaints)', category: 'Citizen Services', path: '/civic-services', keywords: ['civic', 'complaint', 'grievance', 'street light', 'pothole', 'drainage', 'report issue'] },
  { title: 'Smart City Projects & Budget Progress', category: 'Governance', path: '/projects', keywords: ['projects', 'smart city', 'budget', 'progress', 'iccc', 'drainage', 'solar', 'transit hub'] },
  { title: 'Information & Privacy Policy', category: 'About', path: '/about', keywords: ['about', 'privacy', 'telemetry', 'data', 'license'] },
  { title: 'Citizen Profile & Demo Login', category: 'Account', path: '/login', keywords: ['login', 'profile', 'guest', 'account', 'citizen', 'auth'] },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguageStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? SEARCH_DATABASE.filter(item => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.keywords.some(k => k.toLowerCase().includes(q))
        );
      })
    : SEARCH_DATABASE.slice(0, 6);

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.common.searchPlaceholder}
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded">
            ESC
          </kbd>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <button
                key={item.path + item.title}
                onClick={() => handleSelect(item.path)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-400">{item.category}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transform group-hover:translate-x-0.5 transition-all" />
              </button>
            ))
          ) : (
            <div className="py-8 text-center text-slate-500">
              <p className="text-sm">No direct matching services found for &quot;{query}&quot;</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for &quot;bus&quot;, &quot;hospital&quot;, &quot;weather&quot;, or &quot;power&quot;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
