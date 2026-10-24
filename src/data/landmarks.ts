export interface Landmark {
  id: string;
  name: string;
  category: 'transit' | 'hospital' | 'college' | 'police' | 'park' | 'ev' | 'wifi' | 'tourist';
  lat: number;
  lng: number;
  address: string;
  description: string;
  contact?: string;
}

export const VELLORE_COORDINATES = {
  lat: 12.9165,
  lng: 79.1325,
  zoom: 13,
};

export const landmarks: Landmark[] = [
  {
    id: 'vit-vellore',
    name: 'VIT Vellore (Vellore Institute of Technology)',
    category: 'college',
    lat: 12.9692,
    lng: 79.1559,
    address: 'Near Katpadi Road, Vellore, Tamil Nadu 632014',
    description: 'Premier institute of higher education and engineering with over 35,000 students.',
    contact: '0416-2243091',
  },
  {
    id: 'cmc-hospital',
    name: 'CMC Hospital (Christian Medical College)',
    category: 'hospital',
    lat: 12.9254,
    lng: 79.1352,
    address: 'Ida Scudder Road, Vellore 632004',
    description: 'World-renowned tertiary care medical center with 24/7 trauma & emergency department.',
    contact: '0416-2282035',
  },
  {
    id: 'vellore-fort',
    name: 'Vellore Fort & Jalakandeswarar Temple',
    category: 'tourist',
    lat: 12.9202,
    lng: 79.1325,
    address: 'Balaji Nagar, Vellore 632004',
    description: '16th-century Vijayanagara granite fortress surrounded by a deep historic moat.',
    contact: '0416-2220478',
  },
  {
    id: 'katpadi-junction',
    name: 'Katpadi Junction (KPD) Railway Station',
    category: 'transit',
    lat: 12.9731,
    lng: 79.1384,
    address: 'Railway Station Road, Katpadi, Vellore 632007',
    description: 'Major railway junction on Chennai-Bangalore and Chennai-Coimbatore arterial rail corridors.',
    contact: '139',
  },
  {
    id: 'sripuram-temple',
    name: 'Sripuram Sri Lakshmi Narayani Golden Temple',
    category: 'tourist',
    lat: 12.8711,
    lng: 79.0889,
    address: 'Thirumalaikodi, Vellore 632055',
    description: 'Spiritual sanctuary covered in pure gold leaf, located at the foothills of Malaikodi.',
    contact: '0416-2271278',
  },
  {
    id: 'new-bus-stand',
    name: 'Vellore New Central Bus Terminus',
    category: 'transit',
    lat: 12.9372,
    lng: 79.1415,
    address: 'Katpadi Road, Sallavanpet, Vellore 632004',
    description: 'Primary SETC & TNSTC bus terminus serving Chennai, Bengaluru, and district routes.',
    contact: '0416-2222384',
  },
  {
    id: 'gvmc-hospital',
    name: 'Government Vellore Medical College & Hospital',
    category: 'hospital',
    lat: 12.8680,
    lng: 79.1340,
    address: 'Adukkamparai, Vellore 632011',
    description: 'Government multi-specialty hospital providing free critical care and 24/7 ambulance base.',
    contact: '0416-2220021',
  },
  {
    id: 'police-hq',
    name: 'District Police Office & Control Room',
    category: 'police',
    lat: 12.9238,
    lng: 79.1310,
    address: 'Near Collectorate, Sathuvachari, Vellore 632009',
    description: 'Central police dispatch and 24/7 emergency control room for Vellore district.',
    contact: '0416-2252100',
  },
  {
    id: 'periyar-park',
    name: 'Periyar Park & Walking Track',
    category: 'park',
    lat: 12.9189,
    lng: 79.1345,
    address: 'Fort Round Road, Vellore 632001',
    description: 'Lush green public park with children play area, skating rink, and morning fitness trail.',
  },
  {
    id: 'zeon-ev-katpadi',
    name: 'Zeon DC Fast EV Charging Station',
    category: 'ev',
    lat: 12.9640,
    lng: 79.1432,
    address: 'NH 48 Bypass Road, Katpadi, Vellore 632059',
    description: '60kW Dual Gun CCS2 fast charger for electric cars and highway travelers.',
    contact: '1800-572-8888',
  },
  {
    id: 'tangedco-ev-sathuvachari',
    name: 'TANGEDCO EV Smart Hub',
    category: 'ev',
    lat: 12.9312,
    lng: 79.1620,
    address: 'Phase 2, Sathuvachari, Vellore 632009',
    description: 'Public EV station with Type 2 AC and CCS2 DC fast charging points.',
  },
  {
    id: 'smart-wifi-fort',
    name: 'Vellore Smart City Wi-Fi (Fort Zone)',
    category: 'wifi',
    lat: 12.9215,
    lng: 79.1312,
    address: 'Fort Promenade, Vellore 632004',
    description: 'High-speed municipal public Wi-Fi zone powered by Smart City fiber backbone.',
  },
  {
    id: 'smart-wifi-vit',
    name: 'Vellore Smart City Wi-Fi (Katpadi Corridor)',
    category: 'wifi',
    lat: 12.9680,
    lng: 79.1480,
    address: 'Katpadi Railway Link Road, Vellore',
    description: 'Public Wi-Fi coverage along the student and transit Katpadi thoroughfare.',
  },
  {
    id: 'otteri-lake',
    name: 'Otteri Lake Eco-Park & Bird Sanctuary',
    category: 'park',
    lat: 12.8945,
    lng: 79.1460,
    address: 'Otteri, Bagayam Road, Vellore 632002',
    description: 'Restored historic freshwater lake with sunset promenade and bird observation deck.',
  },
];
