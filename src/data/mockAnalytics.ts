export const citizensAnalyticsData = {
  labels: ['2021', '2022', '2023', '2024', '2025', '2026'],
  datasets: [
    {
      label: 'Population (Lakhs)',
      data: [2.41, 2.39, 2.41, 2.36, 2.30, 2.77],
      borderColor: '#f97316',
      backgroundColor: 'rgba(249, 115, 22, 0.15)',
      fill: true,
      tension: 0.3,
    },
    {
      label: 'Literate Citizens (Lakhs)',
      data: [1.93, 1.87, 1.90, 2.01, 2.07, 2.07],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.15)',
      fill: true,
      tension: 0.3,
    },
    {
      label: 'Annual Tourists (Lakhs)',
      data: [2.45, 2.66, 2.87, 3.08, 3.29, 3.32],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
      fill: true,
      tension: 0.3,
    },
  ],
};

export const infrastructurePieData = {
  labels: [
    'Tech Parks',
    'Emergency Services',
    'Educational Institutions',
    'Residencies',
    'Govt Offices',
    'Banks',
  ],
  datasets: [
    {
      label: 'Infrastructure Share (%)',
      data: [10, 15, 20, 24, 25, 6],
      backgroundColor: [
        '#14b8a6', // Teal
        '#f59e0b', // Amber
        '#ef4444', // Red-Orange
        '#0f766e', // Deep Teal
        '#3b82f6', // Blue
        '#10b981', // Emerald
      ],
      borderWidth: 2,
      borderColor: '#ffffff',
    },
  ],
};

export const powerConsumptionBarData = {
  labels: ['2021', '2022', '2023', '2024', '2025', '2026'],
  datasets: [
    {
      label: 'Power Consumption (Million Units - MU)',
      data: [1850, 1920, 2000, 2120, 2250, 2300],
      backgroundColor: '#0f766e',
      hoverBackgroundColor: '#14b8a6',
      borderRadius: 6,
    },
  ],
};

export const accidentRiskGaugeData = {
  labels: [
    'NH 48 Bypass',
    'Katpadi Junction',
    'CMC Hospital Zone',
    'Vellore Fort Area',
    'Arcot Road Corridor',
    'VIT Campus Surrounds',
    'Other City Roads',
  ],
  datasets: [
    {
      label: 'Accident Risk Share (%)',
      data: [36, 20, 15, 10, 10, 4, 5],
      backgroundColor: [
        '#ef4444', // High Risk Red
        '#f97316', // Orange
        '#f59e0b', // Amber
        '#3b82f6', // Blue
        '#8b5cf6', // Violet
        '#10b981', // Emerald
        '#94a3b8', // Slate
      ],
      borderWidth: 2,
      hoverOffset: 8,
    },
  ],
};

export const civicAlertsTicker = [
  "Summer Heatwave Advisory: Hydration points active across Vellore Fort and New Bus Stand.",
  "Katpadi Junction Multi-modal skywalk construction ongoing; use Gate 2 for taxi drop-off.",
  "TANGEDCO planned maintenance in Sathuvachari Substation on Thursday 10:00 - 13:00.",
  "Otteri Lake Eco-Park open for morning walkers 05:30 - 09:30 AM daily.",
  "Vellore Corporation 24/7 Grievance Helpline active at Toll-Free 1800-425-1025.",
];
