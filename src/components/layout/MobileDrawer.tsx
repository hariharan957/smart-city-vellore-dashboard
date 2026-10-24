import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CloudSun,
  Wind,
  Bus,
  MapPin,
  Zap,
  PhoneCall,
  FileText,
  Building2,
  Info,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguageStore();

  if (!isOpen) return null;

  const navLinks = [
    { to: '/', label: t.nav.overview, icon: LayoutDashboard },
    { to: '/climate', label: t.nav.climate, icon: CloudSun },
    { to: '/pollution', label: t.nav.pollution, icon: Wind },
    { to: '/transport', label: t.nav.transport, icon: Bus },
    { to: '/map', label: t.nav.map, icon: MapPin },
    { to: '/utilities', label: t.nav.utilities, icon: Zap },
    { to: '/emergency', label: t.nav.emergency, icon: PhoneCall },
    { to: '/civic-services', label: t.nav.civicServices, icon: FileText },
    { to: '/projects', label: t.nav.projects, icon: Building2 },
    { to: '/about', label: t.nav.about, icon: Info },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onClose} />
      <div className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-900 shadow-xl flex flex-col z-50">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold">
              V
            </div>
            <div>
              <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{t.appName}</p>
              <p className="text-[10px] text-slate-500">Smart City Dashboard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-500/15 text-teal-700 dark:text-teal-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          <NavLink
            to="/about#privacy"
            onClick={onClose}
            className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t.nav.privacy}</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
