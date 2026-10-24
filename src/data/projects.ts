export interface SmartCityProject {
  id: string;
  name: string;
  department: string;
  allocatedCrores: number;
  spentCrores: number;
  progressPercent: number;
  status: 'Completed' | 'In Progress' | 'Tendering' | 'Planning';
  targetDate: string;
  description: string;
  impactMetrics: string;
}

export const smartCityProjects: SmartCityProject[] = [
  {
    id: 'proj-1',
    name: 'Integrated Command and Control Centre (ICCC)',
    department: 'Smart Governance & Police',
    allocatedCrores: 48.5,
    spentCrores: 46.2,
    progressPercent: 95,
    status: 'In Progress',
    targetDate: 'Nov 2026',
    description: 'Centralized civic monitoring hub integrating 350+ AI CCTV cameras, traffic adaptive signaling, and emergency response dispatch.',
    impactMetrics: '350+ Cameras connected, 30% reduction in traffic incident response latency',
  },
  {
    id: 'proj-2',
    name: 'Otteri Lake Eco-Restoration & Waterfront Promenade',
    department: 'Water Bodies & Tourism',
    allocatedCrores: 18.2,
    spentCrores: 18.2,
    progressPercent: 100,
    status: 'Completed',
    targetDate: 'Jan 2026',
    description: 'Desilting, bio-remediation of water, peripheral walking tracks, children play area, and native bird habitat preservation.',
    impactMetrics: '320 Million liters water recharge capacity, 2.4 km pedestrian walkway',
  },
  {
    id: 'proj-3',
    name: 'Smart Street Lighting (LED + Smart IoT Nodes)',
    department: 'Municipal Electricals',
    allocatedCrores: 14.8,
    spentCrores: 13.6,
    progressPercent: 92,
    status: 'In Progress',
    targetDate: 'Dec 2026',
    description: 'Replacement of 18,000 legacy sodium vapor lights with automated energy-saving LEDs and remote dimming sensors.',
    impactMetrics: '42% energy savings for municipal corporation, 99.2% uptime',
  },
  {
    id: 'proj-4',
    name: 'Solar Rooftop Grid on Government Buildings',
    department: 'Renewable Energy',
    allocatedCrores: 9.6,
    spentCrores: 7.5,
    progressPercent: 78,
    status: 'In Progress',
    targetDate: 'Mar 2027',
    description: 'Installation of 5.5 MWp cumulative rooftop solar installations on Collectorate, Corporation offices, and schools.',
    impactMetrics: '2.8 MWp currently commissioned, 1,400 tonnes CO₂ annual offset',
  },
  {
    id: 'proj-5',
    name: 'Katpadi Multi-Modal Transit Interchange Hub',
    department: 'Urban Mobility',
    allocatedCrores: 34.0,
    spentCrores: 11.9,
    progressPercent: 35,
    status: 'In Progress',
    targetDate: 'Aug 2027',
    description: 'Modern pedestrian skywalk connecting Katpadi Railway Junction with the bus terminus, EV feeder stands, and multi-level car parking.',
    impactMetrics: 'Seamless transfer for 45,000 daily commuters',
  },
  {
    id: 'proj-6',
    name: 'Underground Drainage System (UGD) Phase II',
    department: 'Sewerage & Public Works',
    allocatedCrores: 72.4,
    spentCrores: 46.3,
    progressPercent: 64,
    status: 'In Progress',
    targetDate: 'Nov 2027',
    description: 'Comprehensive underground sewerage pipeline network and sewage treatment plant (STP) expansion for peripheral wards.',
    impactMetrics: '110 km pipeline laid, preventing runoff into Palar river basin',
  },
];
