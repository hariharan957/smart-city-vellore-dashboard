export interface TransitItem {
  id: string;
  type: 'bus' | 'train' | 'flight';
  routeCategory: 'chennai' | 'bangalore' | 'local';
  route: string;
  source: string;
  destination: string;
  serviceNumber: string;
  operator: string;
  departure: string;
  arrival: string;
  duration: string;
  frequency: string;
  platformOrBay: string;
  status: 'On Time' | 'Scheduled' | 'Delayed';
  fare: string;
}

export interface AirportInfo {
  id: string;
  name: string;
  code: string;
  city: string;
  distanceFromVellore: string;
  travelTimeByRoad: string;
  publicTransit: string;
  dailyFlightsCount: number;
  popularDestinations: string[];
}

export const busServices: TransitItem[] = [
  {
    id: 'bus-1',
    type: 'bus',
    routeCategory: 'chennai',
    route: 'Vellore → Chennai CMBT / Kilambakkam',
    source: 'Vellore New Bus Stand',
    destination: 'Chennai Kilambakkam (KCBT)',
    serviceNumber: 'SETC 102AC',
    operator: 'SETC Deluxe AC',
    departure: '06:00 AM',
    arrival: '08:45 AM',
    duration: '2h 45m',
    frequency: 'Every 15 mins',
    platformOrBay: 'Bay 4',
    status: 'On Time',
    fare: '₹185',
  },
  {
    id: 'bus-2',
    type: 'bus',
    routeCategory: 'chennai',
    route: 'Vellore → Chennai Koyambedu',
    source: 'Vellore New Bus Stand',
    destination: 'Chennai Koyambedu',
    serviceNumber: 'TNSTC 434 Express',
    operator: 'TNSTC Villupuram',
    departure: '06:30 AM',
    arrival: '09:40 AM',
    duration: '3h 10m',
    frequency: 'Every 10 mins',
    platformOrBay: 'Bay 5',
    status: 'On Time',
    fare: '₹140',
  },
  {
    id: 'bus-3',
    type: 'bus',
    routeCategory: 'bangalore',
    route: 'Vellore → Bangalore (Majestic / Shantinagar)',
    source: 'Vellore New Bus Stand',
    destination: 'Bengaluru Shantinagar BMTC',
    serviceNumber: 'KSRTC Airavat 501',
    operator: 'KSRTC Club Class Multi-Axle',
    departure: '07:15 AM',
    arrival: '11:15 AM',
    duration: '4h 00m',
    frequency: 'Every 30 mins',
    platformOrBay: 'Bay 12',
    status: 'On Time',
    fare: '₹460',
  },
  {
    id: 'bus-4',
    type: 'bus',
    routeCategory: 'bangalore',
    route: 'Vellore → Bangalore (Electronic City / Silk Board)',
    source: 'Vellore Bypass (Green Circle)',
    destination: 'Bengaluru Silk Board',
    serviceNumber: 'SETC 542',
    operator: 'SETC Ultra Deluxe',
    departure: '08:00 AM',
    arrival: '11:45 AM',
    duration: '3h 45m',
    frequency: 'Every 45 mins',
    platformOrBay: 'NH 48 Boarding Point',
    status: 'Scheduled',
    fare: '₹310',
  },
  {
    id: 'bus-5',
    type: 'bus',
    routeCategory: 'local',
    route: 'Katpadi Station → Vellore Fort / Bagayam',
    source: 'Katpadi Junction',
    destination: 'Bagayam CMC Campus',
    serviceNumber: 'Route 1 / 2 City Bus',
    operator: 'TNSTC City Service',
    departure: 'Continuous',
    arrival: '—',
    duration: '35m',
    frequency: 'Every 5 mins',
    platformOrBay: 'Station Bus Bay',
    status: 'On Time',
    fare: '₹12 - ₹20',
  },
];

export const trainServices: TransitItem[] = [
  {
    id: 'train-1',
    type: 'train',
    routeCategory: 'chennai',
    route: 'Katpadi (KPD) → Chennai Central (MAS)',
    source: 'Katpadi Jn (KPD)',
    destination: 'MGR Chennai Central (MAS)',
    serviceNumber: '12028 Shatabdi Express',
    operator: 'Southern Railway',
    departure: '09:20 AM',
    arrival: '11:05 AM',
    duration: '1h 45m',
    frequency: 'Daily (except Tue)',
    platformOrBay: 'Platform 1',
    status: 'On Time',
    fare: '₹480 (CC)',
  },
  {
    id: 'train-2',
    type: 'train',
    routeCategory: 'bangalore',
    route: 'Katpadi (KPD) → KSR Bengaluru (SBC)',
    source: 'Katpadi Jn (KPD)',
    destination: 'KSR Bengaluru (SBC)',
    serviceNumber: '20607 Vande Bharat Exp',
    operator: 'Southern Railway',
    departure: '07:15 AM',
    arrival: '10:10 AM',
    duration: '2h 55m',
    frequency: 'Daily (except Wed)',
    platformOrBay: 'Platform 2',
    status: 'On Time',
    fare: '₹790 (CC)',
  },
  {
    id: 'train-3',
    type: 'train',
    routeCategory: 'chennai',
    route: 'Katpadi (KPD) → Chennai Central (MAS)',
    source: 'Katpadi Jn (KPD)',
    destination: 'MGR Chennai Central (MAS)',
    serviceNumber: '12608 Lalbagh Express',
    operator: 'South Western Railway',
    departure: '09:55 AM',
    arrival: '12:15 PM',
    duration: '2h 20m',
    frequency: 'Daily',
    platformOrBay: 'Platform 1',
    status: 'On Time',
    fare: '₹95 (2S)',
  },
  {
    id: 'train-4',
    type: 'train',
    routeCategory: 'local',
    route: 'Katpadi (KPD) → New Delhi (NDLS)',
    source: 'Katpadi Jn (KPD)',
    destination: 'New Delhi (NDLS)',
    serviceNumber: '12615 Grand Trunk Express',
    operator: 'Southern Railway',
    departure: '08:45 PM',
    arrival: '06:30 AM (+2 days)',
    duration: '33h 45m',
    frequency: 'Daily',
    platformOrBay: 'Platform 3',
    status: 'Scheduled',
    fare: '₹840 (SL)',
  },
];

export const airportServices: AirportInfo[] = [
  {
    id: 'airport-chennai',
    name: 'Chennai International Airport',
    code: 'MAA',
    city: 'Chennai',
    distanceFromVellore: '130 km',
    travelTimeByRoad: '2h 30m via NH 48',
    publicTransit: 'Direct SETC buses to Guindy / Koyambedu, then Chennai Metro to Airport',
    dailyFlightsCount: 420,
    popularDestinations: ['Delhi', 'Mumbai', 'Dubai', 'Singapore', 'London'],
  },
  {
    id: 'airport-bangalore',
    name: 'Kempegowda International Airport',
    code: 'BLR',
    city: 'Bengaluru',
    distanceFromVellore: '195 km',
    travelTimeByRoad: '3h 45m via NH 75 / Hosur Bypass',
    publicTransit: 'KSRTC Flybus from Shantinagar / Majestic, or NH 48 carpool',
    dailyFlightsCount: 650,
    popularDestinations: ['Delhi', 'Frankfurt', 'San Francisco', 'Doha', 'Tokyo'],
  },
  {
    id: 'airport-tirupati',
    name: 'Tirupati International Airport',
    code: 'TIR',
    city: 'Renigunta / Tirupati',
    distanceFromVellore: '105 km',
    travelTimeByRoad: '2h 15m via NH 716 / Chittoor Route',
    publicTransit: 'APSRTC buses from Vellore New Bus Stand to Tirupati Central Bus Stand',
    dailyFlightsCount: 45,
    popularDestinations: ['Hyderabad', 'Bengaluru', 'Vijayawada', 'Delhi'],
  },
];
