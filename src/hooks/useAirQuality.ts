import { useState, useEffect, useCallback } from 'react';
import { fetchVelloreAirQuality, LiveAirQualityData, fallbackAirQuality } from '../services/api';

export function useAirQuality() {
  const [data, setData] = useState<LiveAirQualityData>(fallbackAirQuality);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadAirQuality = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchVelloreAirQuality();
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch air quality');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAirQuality();
    const interval = setInterval(loadAirQuality, 5 * 60 * 1000); // 5 mins
    return () => clearInterval(interval);
  }, [loadAirQuality]);

  return {
    airQuality: data,
    loading,
    error,
    refresh: loadAirQuality,
  };
}
