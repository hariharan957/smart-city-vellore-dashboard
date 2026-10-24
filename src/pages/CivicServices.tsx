import React, { useState } from 'react';
import { getStoredComplaints, saveComplaint, CivicComplaint } from '../services/complaintService';
import { useToastStore } from '../store/toastStore';
import { Badge } from '../components/common/Badge';
import {
  FileText,
  Search,
  Send,
} from 'lucide-react';

export const CivicServices: React.FC = () => {
  const [complaints, setComplaints] = useState<CivicComplaint[]>(getStoredComplaints());
  const [searchTrackingId, setSearchTrackingId] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const { addToast } = useToastStore();

  // Form State
  const [citizenName, setCitizenName] = useState('');
  const [phone, setPhone] = useState('');
  const [ward, setWard] = useState('Ward 12 (Katpadi Station Road)');
  const [category, setCategory] = useState<CivicComplaint['category']>('Street Lights');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<CivicComplaint['urgency']>('Medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      addToast({
        type: 'warning',
        title: 'Validation Error',
        message: 'Please provide a valid 10-digit contact telephone number.',
      });
      return;
    }

    const saved = saveComplaint({
      citizenName,
      phone,
      ward,
      category,
      description,
      urgency,
    });

    setComplaints([saved, ...complaints]);
    setCitizenName('');
    setPhone('');
    setDescription('');

    addToast({
      type: 'success',
      title: 'Complaint Registered!',
      message: `Your grievance has been lodged with ID: ${saved.trackingId}`,
    });
  };

  const filteredComplaints = complaints.filter((c) => {
    const matchStatus = selectedStatus === 'all' || c.status === selectedStatus;
    const matchSearch =
      c.trackingId.toLowerCase().includes(searchTrackingId.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTrackingId.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTrackingId.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getStatusBadge = (status: CivicComplaint['status']) => {
    switch (status) {
      case 'Submitted':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-600">Submitted</span>;
      case 'In Review':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-600">In Review</span>;
      case 'Field Inspection':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/10 text-purple-600">Inspection</span>;
      case 'Resolved':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600">Resolved</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Civic Services & Grievance Redressal
            </h1>
            <Badge variant="sample">Local Storage Persistence</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Submit municipal complaints and track resolution timeline across Vellore corporation wards
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Validated Complaint Form */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Lodge a New Grievance
              </h2>
              <p className="text-[10px] text-slate-400">Directly recorded in municipal demo registry</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Citizen Name
              </label>
              <input
                type="text"
                required
                value={citizenName}
                onChange={(e) => setCitizenName(e.target.value)}
                placeholder="e.g. S. Arunkumar"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Contact Phone (10 digits)
              </label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Ward / Area
              </label>
              <select
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
              >
                <option value="Ward 12 (Katpadi Station Road)">Ward 12 (Katpadi Station Road)</option>
                <option value="Ward 28 (Sathuvachari Phase 2)">Ward 28 (Sathuvachari Phase 2)</option>
                <option value="Ward 7 (Vellore Fort Promenade)">Ward 7 (Vellore Fort Promenade)</option>
                <option value="Ward 15 (VIT University Environs)">Ward 15 (VIT University Environs)</option>
                <option value="Ward 3 (Old Town / Mandi Street)">Ward 3 (Old Town / Mandi Street)</option>
                <option value="Ward 22 (Bagayam / CMC Campus)">Ward 22 (Bagayam / CMC Campus)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CivicComplaint['category'])}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
              >
                <option value="Street Lights">Street Lights</option>
                <option value="Water Supply">Water Supply & Leakage</option>
                <option value="Solid Waste">Solid Waste & Overflowing Bins</option>
                <option value="Roads & Potholes">Roads & Potholes</option>
                <option value="Drainage / Sewage">Drainage / Sewage Clog</option>
                <option value="Other">Other Civic Issues</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Issue Description
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe landmark, problem, and severity..."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500 resize-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Urgency Level
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['Low', 'Medium', 'High', 'Emergency'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setUrgency(level)}
                    className={`py-1 text-[11px] rounded-lg font-medium border transition-colors ${
                      urgency === level
                        ? 'bg-teal-600 text-white border-teal-600'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Grievance</span>
            </button>
          </form>
        </div>

        {/* Live Grievance Tracker */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Municipal Redressal Status Tracker
                </h2>
                <p className="text-xs text-slate-400">Track resolution progress and field inspections</p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                  <input
                    type="text"
                    placeholder="Search ticket #..."
                    value={searchTrackingId}
                    onChange={(e) => setSearchTrackingId(e.target.value)}
                    className="text-xs pl-8 pr-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none"
                  />
                </div>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="text-xs px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="Submitted">Submitted</option>
                  <option value="In Review">In Review</option>
                  <option value="Field Inspection">Field Inspection</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredComplaints.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                        {item.trackingId}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">
                        {new Date(item.submittedAt).toLocaleDateString()}
                      </span>
                      {getStatusBadge(item.status)}
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 mb-2">{item.description}</p>

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                    <span>Ward: <strong>{item.ward}</strong></span>
                    {item.resolutionNotes && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        Note: {item.resolutionNotes}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {filteredComplaints.length === 0 && (
                <div className="text-center py-10 text-slate-400 text-xs">
                  No grievances found matching the current criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
