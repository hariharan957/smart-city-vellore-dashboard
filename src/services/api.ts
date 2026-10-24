export interface LiveWeatherData {
  current: {
    temperature: number;
    humidity: number;
    apparentTemperature: number;
    precipitation: number;
    weatherCode: number;
    windSpeed: number;
    windDirection: number;
    uvIndex: number;
    time: string;
  };
  hourly: {
    times: string[];
    temperatures: number[];
    humidities: number[];
    rainProbabilities: number[];
    uvIndices: number[];
  };
  daily: {
    dates: string[];
    weatherCodes: number[];
    maxTemps: number[];
    minTemps: number[];
    rainProbabilities: number[];
    maxUv: number[];
  };
  isLive: boolean;
}

export interface LiveAirQualityData {
  current: {
    usAqi: number;
    europeanAqi: number;
    pm25: number;
    pm10: number;
    co: number;
    no2: number;
    so2: number;
    ozone: number;
    time: string;
  };
  hourly: {
    times: string[];
    usAqi: number[];
    pm25: number[];
    pm10: number[];
    no2: number[];
  };
  isLive: boolean;
}

const VELLORE_LAT = 12.9165;
const VELLORE_LNG = 79.1325;

// Fallback weather data in case user is offline
export const fallbackWeather: LiveWeatherData = {
  current: {
    temperature: 33.5,
    humidity: 48,
    apparentTemperature: 36.2,
    precipitation: 0.0,
    weatherCode: 1, // Mainly clear
    windSpeed: 14.2,
    windDirection: 110,
    uvIndex: 8.5,
    time: new Date().toISOString(),
  },
  hourly: {
    times: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '00:00'],
    temperatures: [24, 29, 35, 37, 32, 28, 25],
    humidities: [70, 52, 38, 30, 45, 62, 68],
    rainProbabilities: [0, 5, 5, 10, 10, 0, 0],
    uvIndices: [1, 5, 10, 9, 3, 0, 0],
  },
  daily: {
    dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    weatherCodes: [1, 0, 1, 2, 1, 0, 1],
    maxTemps: [36, 37, 38, 39, 38, 37, 38],
    minTemps: [23, 23, 24, 24, 25, 24, 23],
    rainProbabilities: [5, 10, 5, 0, 10, 5, 0],
    maxUv: [10, 11, 11, 10, 9, 10, 10],
  },
  isLive: false,
};

// Fallback air quality data
export const fallbackAirQuality: LiveAirQualityData = {
  current: {
    usAqi: 82,
    europeanAqi: 45,
    pm25: 27.4,
    pm10: 58.1,
    co: 420,
    no2: 24.5,
    so2: 6.2,
    ozone: 54.0,
    time: new Date().toISOString(),
  },
  hourly: {
    times: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    usAqi: [65, 58, 85, 92, 88, 75],
    pm25: [21, 18, 32, 36, 30, 25],
    pm10: [45, 40, 68, 75, 62, 54],
    no2: [18, 14, 28, 31, 26, 22],
  },
  isLive: false,
};

export async function fetchVelloreWeather(): Promise<LiveWeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${VELLORE_LAT}&longitude=${VELLORE_LNG}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,uv_index&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max&timezone=Asia%2FKolkata`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
    const data = await res.json();

    const hourlyTimes = (data.hourly?.time || []).slice(0, 12).map((t: string) => {
      const d = new Date(t);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    const dailyDates = (data.daily?.time || []).slice(0, 7).map((t: string) => {
      const d = new Date(t);
      return d.toLocaleDateString([], { weekday: 'short' });
    });

    return {
      current: {
        temperature: Math.round(data.current?.temperature_2m ?? 32),
        humidity: Math.round(data.current?.relative_humidity_2m ?? 50),
        apparentTemperature: Math.round(data.current?.apparent_temperature ?? 34),
        precipitation: data.current?.precipitation ?? 0,
        weatherCode: data.current?.weather_code ?? 0,
        windSpeed: Math.round(data.current?.wind_speed_10m ?? 12),
        windDirection: data.current?.wind_direction_10m ?? 90,
        uvIndex: Math.round(data.current?.uv_index ?? 6),
        time: data.current?.time ?? new Date().toISOString(),
      },
      hourly: {
        times: hourlyTimes,
        temperatures: (data.hourly?.temperature_2m || []).slice(0, 12),
        humidities: (data.hourly?.relative_humidity_2m || []).slice(0, 12),
        rainProbabilities: (data.hourly?.precipitation_probability || []).slice(0, 12),
        uvIndices: (data.hourly?.uv_index || []).slice(0, 12),
      },
      daily: {
        dates: dailyDates,
        weatherCodes: (data.daily?.weather_code || []).slice(0, 7),
        maxTemps: (data.daily?.temperature_2m_max || []).slice(0, 7),
        minTemps: (data.daily?.temperature_2m_min || []).slice(0, 7),
        rainProbabilities: (data.daily?.precipitation_probability_max || []).slice(0, 7),
        maxUv: (data.daily?.uv_index_max || []).slice(0, 7),
      },
      isLive: true,
    };
  } catch (err) {
    console.warn('Weather fetch failed, utilizing cached/offline model:', err);
    return fallbackWeather;
  }
}

export async function fetchVelloreAirQuality(): Promise<LiveAirQualityData> {
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${VELLORE_LAT}&longitude=${VELLORE_LNG}&current=european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi&timezone=Asia%2FKolkata`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error(`Air Quality API error: ${res.status}`);
    const data = await res.json();

    const hourlyTimes = (data.hourly?.time || []).slice(0, 12).map((t: string) => {
      const d = new Date(t);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    return {
      current: {
        usAqi: Math.round(data.current?.us_aqi ?? 75),
        europeanAqi: Math.round(data.current?.european_aqi ?? 40),
        pm25: Number((data.current?.pm2_5 ?? 25).toFixed(1)),
        pm10: Number((data.current?.pm10 ?? 55).toFixed(1)),
        co: Math.round(data.current?.carbon_monoxide ?? 380),
        no2: Number((data.current?.nitrogen_dioxide ?? 20).toFixed(1)),
        so2: Number((data.current?.sulphur_dioxide ?? 5).toFixed(1)),
        ozone: Number((data.current?.ozone ?? 48).toFixed(1)),
        time: data.current?.time ?? new Date().toISOString(),
      },
      hourly: {
        times: hourlyTimes,
        usAqi: (data.hourly?.us_aqi || []).slice(0, 12),
        pm25: (data.hourly?.pm2_5 || []).slice(0, 12),
        pm10: (data.hourly?.pm10 || []).slice(0, 12),
        no2: (data.hourly?.nitrogen_dioxide || []).slice(0, 12),
      },
      isLive: true,
    };
  } catch (err) {
    console.warn('Air quality fetch failed, utilizing cached/offline model:', err);
    return fallbackAirQuality;
  }
}

export function getWeatherConditionText(code: number): string {
  switch (code) {
    case 0: return 'Clear Sky';
    case 1: return 'Mainly Clear';
    case 2: return 'Partly Cloudy';
    case 3: return 'Overcast';
    case 45:
    case 48: return 'Fog / Haze';
    case 51:
    case 53:
    case 55: return 'Light Drizzle';
    case 61:
    case 63:
    case 65: return 'Rain Showers';
    case 80:
    case 81:
    case 82: return 'Heavy Rain';
    case 95: return 'Thunderstorm';
    default: return 'Fair';
  }
}

export function getAqiCategory(aqi: number): {
  label: string;
  color: string;
  bg: string;
  advisory: string;
} {
  if (aqi <= 50) {
    return {
      label: 'Good (0 - 50)',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/15',
      advisory: 'Air quality is satisfactory and poses little to no health risk. Ideal for outdoor exercise and activities.',
    };
  }
  if (aqi <= 100) {
    return {
      label: 'Moderate (51 - 100)',
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/15',
      advisory: 'Air quality is acceptable. Very sensitive individuals should monitor respiratory symptoms and limit prolonged heavy exertion.',
    };
  }
  if (aqi <= 150) {
    return {
      label: 'Unhealthy for Sensitive Groups (101 - 150)',
      color: 'text-amber-500',
      bg: 'bg-amber-500/15',
      advisory: 'Children, elderly, and individuals with respiratory conditions (asthma) should reduce strenuous outdoor activity.',
    };
  }
  if (aqi <= 200) {
    return {
      label: 'Unhealthy (151 - 200)',
      color: 'text-red-500',
      bg: 'bg-red-500/15',
      advisory: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.',
    };
  }
  return {
    label: 'Very Unhealthy / Hazardous (201+)',
    color: 'text-purple-500',
    bg: 'bg-purple-500/15',
    advisory: 'Health alert: The risk of health effects is increased for everyone. Avoid outdoor exertion and keep indoor air filtered.',
  };
}
