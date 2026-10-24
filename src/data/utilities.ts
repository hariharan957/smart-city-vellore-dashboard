export interface UtilityZone {
  zoneId: string;
  zoneName: string;
  populationServed: string;
  waterSupplyHours: string;
  waterQualityIndex: number; // 0 - 100
  powerUptimePercentage: number;
  wasteCollectionEfficiency: number; // %
  solarRoofTopsMWp: number;
}

export const utilityZones: UtilityZone[] = [
  {
    zoneId: 'z1',
    zoneName: 'Zone 1 – Katpadi (North)',
    populationServed: '82,000',
    waterSupplyHours: '06:00 - 09:30 AM',
    waterQualityIndex: 94,
    powerUptimePercentage: 99.4,
    wasteCollectionEfficiency: 96,
    solarRoofTopsMWp: 4.8,
  },
  {
    zoneId: 'z2',
    zoneName: 'Zone 2 – Sathuvachari (East)',
    populationServed: '74,500',
    waterSupplyHours: '05:30 - 09:00 AM',
    waterQualityIndex: 92,
    powerUptimePercentage: 98.9,
    wasteCollectionEfficiency: 93,
    solarRoofTopsMWp: 3.2,
  },
  {
    zoneId: 'z3',
    zoneName: 'Zone 3 – Vellore Fort & Old Town (Central)',
    populationServed: '68,200',
    waterSupplyHours: '06:30 - 10:00 AM',
    waterQualityIndex: 89,
    powerUptimePercentage: 99.1,
    wasteCollectionEfficiency: 91,
    solarRoofTopsMWp: 2.1,
  },
  {
    zoneId: 'z4',
    zoneName: 'Zone 4 – Dharapadavedu & Shenbakkam (West)',
    populationServed: '52,300',
    waterSupplyHours: '07:00 - 10:30 AM',
    waterQualityIndex: 91,
    powerUptimePercentage: 98.5,
    wasteCollectionEfficiency: 88,
    solarRoofTopsMWp: 1.9,
  },
];

export const waterSupplyStats = {
  sourceReservoir: 'Palar River Sub-surface Infiltration & Otteri Lake',
  reservoirStoragePercent: 74.2,
  dailyPumpingCapacityMLD: 48.5,
  dailyConsumptionMLD: 44.2,
  phLevel: 7.4,
  chlorinePPM: 0.45,
  turbidityNTU: 1.2,
  purityGrade: 'A (Potable - BIS 10500)',
};

export const electricityStats = {
  circle: 'TANGEDCO Vellore Distribution Circle',
  peakDemandMW: 312,
  currentLoadMW: 268,
  dailyConsumptionMU: 6.4,
  solarGridMWp: 12.0,
  substationsCount: 8,
  activeTransformers: 1420,
  smartMetersInstalled: 34500,
};

export const solidWasteStats = {
  dailyCollectionTonnes: 142,
  sourceSegregationPercent: 84,
  wetWasteCompostedTonnes: 78,
  dryRecycledTonnes: 46,
  bioMiningSathuvachariTonsRemaining: 18500,
  smartBinsOperational: 124,
  collectionFleetVehicles: 48,
};
