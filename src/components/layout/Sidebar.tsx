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
  ShieldCheck,
} from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';

export const Sidebar: React.FC = () => {
  const { t } = useLanguageStore();

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
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-colors z-20">
      {/* Branding Header */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-extrabold text-base tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            {t.appName}
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </h1>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            Smart City Portal • Vellore
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-brand-500/15 text-brand-700 dark:text-brand-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'
                    }`}
                  />
                  <span>{link.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer with Privacy link */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
        <NavLink
          to="/about#privacy"
          className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t.nav.privacy}</span>
        </NavLink>
        <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-500">
          Smart City Portal • Vellore
        </p>
      </div>
    </aside>
  );
};
