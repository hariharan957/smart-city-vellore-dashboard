export interface CivicComplaint {
  id: string;
  trackingId: string;
  citizenName: string;
  phone: string;
  ward: string;
  category: 'Water Supply' | 'Street Lights' | 'Solid Waste' | 'Roads & Potholes' | 'Drainage / Sewage' | 'Other';
  description: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Emergency';
  status: 'Submitted' | 'In Review' | 'Field Inspection' | 'Resolved';
  submittedAt: string;
  updatedAt: string;
  resolutionNotes?: string;
}

const STORAGE_KEY_COMPLAINTS = 'smart_city_vellore_complaints';

const initialComplaints: CivicComplaint[] = [
  {
    id: 'cmp-1',
    trackingId: 'VLR-GRV-2026-0041',
    citizenName: 'M. Senthil Kumar',
    phone: '9842104567',
    ward: 'Ward 12 (Katpadi Station Road)',
    category: 'Street Lights',
    description: 'Street light pole #KPD-44 flickering and dark near railway overbridge.',
    urgency: 'Medium',
    status: 'In Review',
    submittedAt: '2026-10-22T09:30:00.000Z',
    updatedAt: '2026-10-23T14:15:00.000Z',
    resolutionNotes: 'Assigned to Municipal Electrical Lineman team. Replacement LED bulb queued.',
  },
  {
    id: 'cmp-2',
    trackingId: 'VLR-GRV-2026-0038',
    citizenName: 'Deepa Natarajan',
    phone: '9443217890',
    ward: 'Ward 28 (Sathuvachari Phase 2)',
    category: 'Water Supply',
    description: 'Low water pressure during morning municipal supply hours in Cross Street 4.',
    urgency: 'High',
    status: 'Field Inspection',
    submittedAt: '2026-10-20T11:00:00.000Z',
    updatedAt: '2026-10-22T16:40:00.000Z',
    resolutionNotes: 'Valve inspection conducted. Pressure booster pump re-calibrated at feeder tank.',
  },
  {
    id: 'cmp-3',
    trackingId: 'VLR-GRV-2026-0029',
    citizenName: 'R. Vignesh',
    phone: '9789123456',
    ward: 'Ward 7 (Vellore Fort Promenade)',
    category: 'Solid Waste',
    description: 'Overflowing public trash receptacle near the south moat walkway.',
    urgency: 'Medium',
    status: 'Resolved',
    submittedAt: '2026-10-18T08:15:00.000Z',
    updatedAt: '2026-10-19T10:30:00.000Z',
    resolutionNotes: 'Trash cleared by Sanitary Inspector squad. Bin emptied and area sanitized.',
  },
];

export function getStoredComplaints(): CivicComplaint[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COMPLAINTS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to load civic complaints', err);
  }
  // Initialize with sample complaints
  localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(initialComplaints));
  return initialComplaints;
}

export function saveComplaint(
  complaint: Omit<CivicComplaint, 'id' | 'trackingId' | 'status' | 'submittedAt' | 'updatedAt'>
): CivicComplaint {
  const existing = getStoredComplaints();
  const serial = Math.floor(1000 + Math.random() * 9000);
  const now = new Date().toISOString();

  const newRecord: CivicComplaint = {
    ...complaint,
    id: `cmp-${Date.now()}`,
    trackingId: `VLR-GRV-2026-${serial}`,
    status: 'Submitted',
    submittedAt: now,
    updatedAt: now,
  };

  const updated = [newRecord, ...existing];
  localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(updated));
  return newRecord;
}
