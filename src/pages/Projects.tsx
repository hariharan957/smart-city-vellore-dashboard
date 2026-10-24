import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../components/charts/ChartRegistry';
import { smartCityProjects } from '../data/projects';
import { Badge } from '../components/common/Badge';
import { Calendar } from 'lucide-react';

export const Projects: React.FC = () => {
  const totalAllocated = smartCityProjects.reduce((sum, p) => sum + p.allocatedCrores, 0);
  const totalSpent = smartCityProjects.reduce((sum, p) => sum + p.spentCrores, 0);

  const budgetChartData = {
    labels: smartCityProjects.map((p) => p.name.length > 20 ? p.name.substring(0, 20) + '...' : p.name),
    datasets: [
      {
        label: 'Allocated Budget (₹ Cr)',
        data: smartCityProjects.map((p) => p.allocatedCrores),
        backgroundColor: '#0f766e',
        borderRadius: 4,
      },
      {
        label: 'Funds Utilized (₹ Cr)',
        data: smartCityProjects.map((p) => p.spentCrores),
        backgroundColor: '#14b8a6',
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
              Vellore Smart City Mission Tracker
            </h1>
            <Badge variant="sample">Municipal Sample Data</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Monitoring capital expenditure, project milestones, and infrastructure completion metrics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Total Mission Outlay</span>
            <span className="text-base font-bold text-teal-600 dark:text-teal-400">
              ₹{totalAllocated.toFixed(1)} Cr
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Cumulative Spent</span>
            <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
              ₹{totalSpent.toFixed(1)} Cr
            </span>
          </div>
        </div>
      </div>

      {/* Budget vs Spent Chart */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Budget Allocation vs. Expenditure by Project (₹ Crores)
            </h2>
            <p className="text-xs text-slate-400">Financial progress tracking across major initiatives</p>
          </div>
          <Badge variant="sample">Smart City Mission</Badge>
        </div>
        <div className="h-64 w-full">
          <Bar
            data={budgetChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } } },
              scales: { y: { beginAtZero: true, title: { display: true, text: '₹ Crores' } } },
            }}
          />
        </div>
      </div>

      {/* Projects Progress List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {smartCityProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                  {project.department}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    project.status === 'Completed'
                      ? 'bg-emerald-500/10 text-emerald-600'
                      : 'bg-teal-500/10 text-teal-600'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-1">
                {project.name}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                {project.description}
              </p>

              {/* Progress Bar */}
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Physical Progress</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {project.progressPercent}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      project.progressPercent === 100 ? 'bg-emerald-500' : 'bg-teal-600'
                    }`}
                    style={{ width: `${project.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Target: <strong>{project.targetDate}</strong></span>
              </span>
              <span>
                Funds: <strong>₹{project.spentCrores} Cr</strong> / ₹{project.allocatedCrores} Cr
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
