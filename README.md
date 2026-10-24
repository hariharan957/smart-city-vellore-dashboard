# Smart City Information Dashboard – Vellore

A modern civic intelligence dashboard and public services portal for the city of **Vellore, Tamil Nadu** (12.9165°N, 79.1325°E).

Consolidates live weather telemetry, real-time air quality index (AQI), multi-modal transit corridors, municipal utilities (water, power grid, solid waste), public safety helplines, and civic grievance redressal into a unified interface.

![Vellore Smart City Dashboard Preview](https://raw.githubusercontent.com/hariharan957/smart-city-vellore-dashboard/main/preview.png)

---

## 🌟 Key Features

1. **City Overview & KPIs:**
   - Live temperature, real-time AQI, power grid demand, reservoir level, and grievance metrics.
   - Live date & clock with second-by-second updates.
   - Demographic trends (2021–2026), infrastructure land-use pie chart, power consumption bar chart, and accident risk hotspot analysis.
   - Interactive OpenStreetMap preview.

2. **Climate & Weather Intelligence:**
   - Real-time atmospheric observations dynamically pulled from Open-Meteo.
   - Hourly temperature & rainfall probability curves.
   - 7-day extended forecast with UV index and min/max temperatures.

3. **Air Quality & Pollution (AQI):**
   - Real-time US AQI & European AQI readings.
   - Particulate Matter (PM2.5, PM10) and gaseous composition (NO₂, CO, SO₂, Ozone).
   - Dynamic public health advisories tailored to the current AQI band.

4. **Multi-Modal Transit Hub:**
   - Bus schedules (Vellore New Bus Stand to Chennai, Bangalore, and local routes).
   - Katpadi Junction (KPD) railway departures (Shatabdi, Vande Bharat, Lalbagh, Grand Trunk Express).
   - Nearby airport connectivity (Chennai International MAA, Kempegowda BLR, Tirupati TIR).
   - Synchronized route filtering and sortable schedule master index.

5. **Interactive GIS Map (Leaflet + OpenStreetMap):**
   - Fullscreen interactive mapping with category layer filters: Bus Terminals, Hospitals, Colleges, Police Booths, EV Charging, Wi-Fi Spots, and Heritage Landmarks (Vellore Fort, Sripuram Golden Temple).
   - "Locate Me" GPS geolocation.

6. **Civic Utilities & Grid:**
   - Water supply storage from Palar River infiltration basin & Otteri Lake.
   - TANGEDCO power distribution load curves and rooftop solar generation.
   - Solid waste collection, source segregation metrics, and smart bin sensors.

7. **Emergency & First Response:**
   - Direct click-to-call cards for National Lines (108 Ambulance, 100 Police, 101 Fire, 1091 Women Helpline, 1930 Cyber Cell).
   - District hospital casualty lines with verification badges.
   - Ambulance response time charts and patrol coverage distribution.

8. **Civic Grievances & Redressal:**
   - Validated complaint lodging with automatic tracking ID generation.
   - Real-time lifecycle status tracker (Submitted → In Review → Field Inspection → Resolved).
   - LocalStorage persistence.

9. **Smart City Mission Projects:**
   - Capital expenditure tracker, physical completion progress bars, and budget vs spent analytics.

10. **Localization & Accessibility:**
    - English and Tamil (தமிழ்) language toggle.
    - Dark / Light mode toggle.
    - WCAG AA compliant contrast and responsive desktop sidebar / mobile drawer.

---

## 🛠️ Tech Stack

- **Framework:** React 18 with TypeScript & Vite
- **Styling:** Tailwind CSS, Lucide React icons
- **Data Visualization:** Chart.js with `react-chartjs-2`
- **Geographic Mapping:** Leaflet & `react-leaflet` (OpenStreetMap tiles, zero API keys required)
- **State Management:** Zustand
- **Routing:** React Router v6 (`HashRouter` for zero-configuration static deployments)
- **Testing:** Vitest & React Testing Library

---

## 📊 Data Transparency Policy

- **Real Live Data:** Weather and Air Quality telemetry are fetched dynamically from Open-Meteo for Vellore coordinates (`12.9165°N, 79.1325°E`). Map tiles and POIs are rendered directly via OpenStreetMap.
- **Sample Municipal Data:** Traffic congestion, power grid demand, grievance tickets, and project budgets are modeled sample datasets in `/src/data` and clearly tagged with **"Sample Data"** badges in the UI.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/hariharan957/smart-city-vellore-dashboard.git
cd smart-city-vellore-dashboard

# Install dependencies
npm install

# Start the local development server
npm run dev
```

### Running Tests

```bash
npm run test
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
