import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useToastStore } from '../store/toastStore';
import { ShieldAlert, User, Mail, ArrowRight, Sparkles } from 'lucide-react';

export const Login: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(name || 'Vellore Citizen', email || 'citizen@vellore.gov.in', false);
    addToast({
      type: 'success',
      title: 'Welcome!',
      message: 'Logged in as ' + (name || 'Vellore Citizen'),
    });
    navigate('/');
  };

  const handleGuest = () => {
    login('Guest Citizen', 'guest@vellore.gov.in', true);
    addToast({
      type: 'info',
      title: 'Guest Mode',
      message: 'Browsing in guest mode with sample privileges.',
    });
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="text-center mb-6">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-600 flex items-center justify-center text-white font-bold text-xl mb-3 shadow-md">
          V
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Citizen Portal Access
        </h2>
        <p className="text-xs text-slate-500 mt-1">Smart City Information Dashboard – Vellore</p>
      </div>

      {/* Demo Profile Disclaimer Badge */}
      <div className="mb-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2 text-amber-700 dark:text-amber-400 text-xs">
        <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold block">Prototype Notice</span>
          Demo profile, not secure authentication. Saved in your local browser only.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. K. Sundaram"
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. hariharan@vit.ac.in"
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
        >
          <span>Continue to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <div className="relative flex justify-center text-[11px] uppercase">
          <span className="bg-white dark:bg-slate-900 px-2 text-slate-400">or</span>
        </div>
      </div>

      <button
        onClick={handleGuest}
        className="w-full flex items-center justify-center gap-2 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-medium transition-colors"
      >
        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
        <span>Explore in Guest Mode</span>
      </button>
    </div>
  );
};
