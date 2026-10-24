export interface EmergencyContact {
  id: string;
  category: 'medical' | 'police' | 'fire' | 'blood';
  title: string;
  phone: string;
  isNationalHelpline: boolean;
  verifyBeforeUse: boolean;
  address?: string;
  operatingHours: string;
  responseTime?: string;
  notes?: string;
}

export const nationalHelplines: EmergencyContact[] = [
  {
    id: 'nat-ambulance',
    category: 'medical',
    title: 'Free Emergency Ambulance Service',
    phone: '108',
    isNationalHelpline: true,
    verifyBeforeUse: false,
    operatingHours: '24/7 Toll-Free',
    responseTime: '~8-12 mins in city limits',
    notes: 'Primary emergency response for accidents, cardiac events, trauma & maternity.',
  },
  {
    id: 'nat-police',
    category: 'police',
    title: 'Police Emergency Helpline',
    phone: '100',
    isNationalHelpline: true,
    verifyBeforeUse: false,
    operatingHours: '24/7 Toll-Free',
    responseTime: '~6-10 mins patrol dispatch',
    notes: 'Direct connection to District Police Control Room for crime & distress.',
  },
  {
    id: 'nat-fire',
    category: 'fire',
    title: 'Fire & Rescue Services',
    phone: '101',
    isNationalHelpline: true,
    verifyBeforeUse: false,
    operatingHours: '24/7 Toll-Free',
    responseTime: '~6.5 mins average turnaround',
    notes: 'Urban fire emergencies, chemical spills, building collapses, and flood rescue.',
  },
  {
    id: 'nat-women',
    category: 'police',
    title: 'Women Helpline (Distress / Safety)',
    phone: '1091',
    isNationalHelpline: true,
    verifyBeforeUse: false,
    operatingHours: '24/7 Toll-Free',
    notes: 'Dedicated confidential counselling, transit safety escort, and rapid response.',
  },
  {
    id: 'nat-cyber',
    category: 'police',
    title: 'National Cyber Crime Reporting Helpline',
    phone: '1930',
    isNationalHelpline: true,
    verifyBeforeUse: false,
    operatingHours: '24/7 Toll-Free',
    notes: 'Immediate reporting of banking frauds, financial scams, identity theft, and extortion.',
  },
];

export const localEmergencyContacts: EmergencyContact[] = [
  {
    id: 'local-cmc',
    category: 'medical',
    title: 'CMC Hospital Casualty & Emergency',
    phone: '0416-2282035',
    isNationalHelpline: false,
    verifyBeforeUse: true,
    address: 'Ida Scudder Road, Vellore 632004',
    operatingHours: '24 Hours Emergency Ward',
    notes: 'Level 1 Trauma center. Hospital exchange line; verify before use during emergencies.',
  },
  {
    id: 'local-gvmc',
    category: 'medical',
    title: 'Govt. Vellore Medical College Hospital (Adukkamparai)',
    phone: '0416-2220021',
    isNationalHelpline: false,
    verifyBeforeUse: true,
    address: 'Adukkamparai, Vellore 632011',
    operatingHours: '24 Hours Government Hospital',
    notes: 'Free municipal emergency care, ICU beds availability ~82%. Verify before use.',
  },
  {
    id: 'local-police-control',
    category: 'police',
    title: 'Vellore District Police Control Room',
    phone: '0416-2252100',
    isNationalHelpline: false,
    verifyBeforeUse: true,
    address: 'Collectorate Complex, Sathuvachari, Vellore',
    operatingHours: '24/7 Landline Desk',
    notes: 'Local landline backup for Police HQ. Verify before use.',
  },
  {
    id: 'local-katpadi-police',
    category: 'police',
    title: 'Katpadi Police Station',
    phone: '0416-2242100',
    isNationalHelpline: false,
    verifyBeforeUse: true,
    address: 'Katpadi Main Road, Vellore 632007',
    operatingHours: '24/7 Police Station',
    notes: 'Covers Katpadi Junction and VIT student precinct. Verify before use.',
  },
  {
    id: 'local-fire-station',
    category: 'fire',
    title: 'Vellore Fire & Rescue Station',
    phone: '0416-2220101',
    isNationalHelpline: false,
    verifyBeforeUse: true,
    address: 'Near Fort Round, Vellore 632001',
    operatingHours: '24/7 Fire Headquarters',
    notes: 'Local station landline; dial 101 for immediate mobile dispatch. Verify before use.',
  },
  {
    id: 'local-cmc-blood',
    category: 'blood',
    title: 'CMC Hospital Blood Bank & Transfusion Medicine',
    phone: '0416-2282215',
    isNationalHelpline: false,
    verifyBeforeUse: true,
    address: 'CMC Main Hospital, Vellore 632004',
    operatingHours: '24/7 Blood Donation & Issues',
    notes: 'Maintains critical reserves (O-Negative, B-Negative). Verify before use.',
  },
  {
    id: 'local-district-blood',
    category: 'blood',
    title: 'District Headquarters Blood Bank',
    phone: '0416-2222102',
    isNationalHelpline: false,
    verifyBeforeUse: true,
    address: 'Government Pentland Hospital Campus, Vellore',
    operatingHours: '24/7 Government Blood Bank',
    notes: 'Public blood donor registry. Verify before use.',
  },
];
