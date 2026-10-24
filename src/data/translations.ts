export type Language = 'en' | 'ta';

export interface Translations {
  appName: string;
  tagline: string;
  nav: {
    overview: string;
    climate: string;
    pollution: string;
    transport: string;
    map: string;
    utilities: string;
    emergency: string;
    civicServices: string;
    projects: string;
    about: string;
    login: string;
    logout: string;
    privacy: string;
  };
  common: {
    search: string;
    searchPlaceholder: string;
    filter: string;
    all: string;
    status: string;
    active: string;
    loading: string;
    error: string;
    retry: string;
    sampleData: string;
    liveData: string;
    verifyBadge: string;
    profile: string;
    guest: string;
    locateMe: string;
    viewDetails: string;
    lastUpdated: string;
    english: string;
    tamil: string;
  };
  overview: {
    kpiTemp: string;
    kpiAqi: string;
    kpiTraffic: string;
    kpiPower: string;
    kpiWater: string;
    kpiComplaints: string;
    citizensTrend: string;
    infraDist: string;
    powerConsumption: string;
    livePower: string;
    accidentRisk: string;
    updatePower: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "Wonder Vellore",
    tagline: "Smart City Information Dashboard",
    nav: {
      overview: "Overview",
      climate: "Climate Info",
      pollution: "Pollution (AQI)",
      transport: "Transport Info",
      map: "Interactive Map",
      utilities: "Utilities & Grid",
      emergency: "Emergency Services",
      civicServices: "Civic Complaints",
      projects: "Smart City Projects",
      about: "About & Privacy",
      login: "Citizen Login",
      logout: "Log Out",
      privacy: "Privacy Policy",
    },
    common: {
      search: "Search",
      searchPlaceholder: "Search services, routes, weather, emergency...",
      filter: "Filter",
      all: "All",
      status: "Status",
      active: "Active",
      loading: "Loading real-time data...",
      error: "Unable to load data. Please retry.",
      retry: "Retry",
      sampleData: "Sample Data",
      liveData: "Live API Data",
      verifyBadge: "Verify Before Use",
      profile: "Profile",
      guest: "Guest Citizen",
      locateMe: "Locate Me",
      viewDetails: "View Details",
      lastUpdated: "Last Updated",
      english: "English",
      tamil: "தமிழ்",
    },
    overview: {
      kpiTemp: "Temperature",
      kpiAqi: "Air Quality (AQI)",
      kpiTraffic: "Traffic Flow",
      kpiPower: "Grid Demand",
      kpiWater: "Reservoir Level",
      kpiComplaints: "Open Grievances",
      citizensTrend: "Citizens Demographics (2021-2026)",
      infraDist: "City Infrastructure Distribution",
      powerConsumption: "Annual Power Consumption (MU)",
      livePower: "Live Grid Power Usage",
      accidentRisk: "Accident Risk by Hotspot (%)",
      updatePower: "Simulate Load Change",
    },
  },
  ta: {
    appName: "வொண்டர் வேலூர்",
    tagline: "ஸ்மார்ட் சிட்டி தகவல் பலகை",
    nav: {
      overview: "கண்ணோட்டம்",
      climate: "வானிலை தகவல்",
      pollution: "காற்று தரம் (AQI)",
      transport: "போக்குவரத்து",
      map: "ஊடாடும் வரைபடம்",
      utilities: "பொது பயன்பாடுகள்",
      emergency: "அவசர சேவைகள்",
      civicServices: "புகார் தீர்வு",
      projects: "ஸ்மார்ட் சிட்டி பணிகள்",
      about: "எங்களைப் பற்றி & தனியுரிமை",
      login: "குடிமக்கள் உள்நுழைவு",
      logout: "வெளியேறு",
      privacy: "தனியுரிமைக் கொள்கை",
    },
    common: {
      search: "தேடல்",
      searchPlaceholder: "சேவைகள், வழிகள், வானிலை, அவசரம் தேடுக...",
      filter: "வடிகட்டு",
      all: "அனைத்தும்",
      status: "நிலை",
      active: "செயலில் உள்ளது",
      loading: "நேரலை தரவு ஏற்றப்படுகிறது...",
      error: "தரவை ஏற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
      retry: "மீண்டும் முயற்சி",
      sampleData: "மாதிரி தரவு",
      liveData: "நேரலை தரவு",
      verifyBadge: "பயன்படுத்துமுன் சரிபார்க்கவும்",
      profile: "சுயவிவரம்",
      guest: "விருந்தினர்",
      locateMe: "என் இருப்பிடம்",
      viewDetails: "விவரங்களை காண்க",
      lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது",
      english: "English",
      tamil: "தமிழ்",
    },
    overview: {
      kpiTemp: "வெப்பநிலை",
      kpiAqi: "காற்று தரம் (AQI)",
      kpiTraffic: "போக்குவரத்து நிலை",
      kpiPower: "மின் கட்டமைப்பு தேவை",
      kpiWater: "நீர்த்தேக்க அளவு",
      kpiComplaints: "நிலுவையில் உள்ள புகார்கள்",
      citizensTrend: "குடிமக்கள் புள்ளிவிவரம் (2021-2026)",
      infraDist: "நகர உள்கட்டமைப்பு விநியோகம்",
      powerConsumption: "ஆண்டு மின் நுகர்வு (MU)",
      livePower: "நேரலை மின் பயன்பாடு",
      accidentRisk: "விபத்து அபாய பகுதிகள் (%)",
      updatePower: "மின்தேவை மாற்றிப் பார்",
    },
  },
};
