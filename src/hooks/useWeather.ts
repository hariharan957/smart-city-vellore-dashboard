import { useState, useEffect, useCallback } from 'react';
import { fetchVelloreWeather, LiveWeatherData, fallbackWeather } from '../services/api';

export function useWeather() {
  const [data, setData] = useState<LiveWeatherData>(fallbackWeather);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchVelloreWeather();
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather();
    const interval = setInterval(loadWeather, 5 * 60 * 1000); // 5 mins
    return () => clearInterval(interval);
  }, [loadWeather]);

  return {
    weather: data,
    loading,
    error,
    refresh: loadWeather,
  };
}
