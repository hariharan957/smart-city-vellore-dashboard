import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="py-16 text-center space-y-4">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold text-2xl">
        404
      </div>
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Page Not Found</h2>
      <p className="text-xs text-slate-500 max-w-sm mx-auto">
        The requested civic portal route does not exist. Please return to the city overview.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Return to Overview</span>
      </Link>
    </div>
  );
};
