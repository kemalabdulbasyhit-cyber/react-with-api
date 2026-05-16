import { useState, useCallback } from "react";
import axios from "axios";


// Using Open-Meteo (free, no API key needed) + Geocoding API
const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

interface GeoResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string;
}

export interface OpenMeteoWeather {
  city: string;
  country: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  weather_code: number;
  description: string;
  icon: string;
  pressure: number;
  visibility: number;
  sunrise: string;
  sunset: string;
  latitude: number;
  longitude: number;
}

const WMO_CODES: Record<number, { desc: string; icon: string }> = {
  0: { desc: "Cerah", icon: "☀️" },
  1: { desc: "Sebagian Cerah", icon: "🌤️" },
  2: { desc: "Berawan Sebagian", icon: "⛅" },
  3: { desc: "Mendung", icon: "☁️" },
  45: { desc: "Berkabut", icon: "🌫️" },
  48: { desc: "Kabut Beku", icon: "🌫️" },
  51: { desc: "Gerimis Ringan", icon: "🌦️" },
  53: { desc: "Gerimis Sedang", icon: "🌦️" },
  55: { desc: "Gerimis Lebat", icon: "🌧️" },
  61: { desc: "Hujan Ringan", icon: "🌧️" },
  63: { desc: "Hujan Sedang", icon: "🌧️" },
  65: { desc: "Hujan Lebat", icon: "🌧️" },
  71: { desc: "Salju Ringan", icon: "🌨️" },
  73: { desc: "Salju Sedang", icon: "🌨️" },
  75: { desc: "Salju Lebat", icon: "❄️" },
  80: { desc: "Hujan Deras Ringan", icon: "🌦️" },
  81: { desc: "Hujan Deras Sedang", icon: "🌧️" },
  82: { desc: "Hujan Deras Lebat", icon: "⛈️" },
  95: { desc: "Badai Petir", icon: "⛈️" },
  96: { desc: "Badai dengan Hujan Es", icon: "⛈️" },
  99: { desc: "Badai dengan Hujan Es Lebat", icon: "⛈️" },
};

export function useWeather() {
  const [weather, setWeather] = useState<OpenMeteoWeather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      // Step 1: Get coordinates
      const geoRes = await axios.get(GEO_API, {
        params: { name: cityName, count: 1, language: "id", format: "json" },
      });

      if (!geoRes.data.results || geoRes.data.results.length === 0) {
        throw new Error(`Kota "${cityName}" tidak ditemukan`);
      }

      const geo: GeoResult = geoRes.data.results[0];

      // Step 2: Get weather
      const weatherRes = await axios.get(WEATHER_API, {
        params: {
          latitude: geo.latitude,
          longitude: geo.longitude,
          current:
            "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,surface_pressure,visibility",
          daily: "sunrise,sunset",
          timezone: "auto",
          forecast_days: 1,
        },
      });

      const curr = weatherRes.data.current;
      const daily = weatherRes.data.daily;
      const code = curr.weather_code as number;
      const wmo = WMO_CODES[code] ?? { desc: "Tidak Diketahui", icon: "🌡️" };

      setWeather({
        city: geo.name,
        country: geo.country,
        temp: Math.round(curr.temperature_2m),
        feels_like: Math.round(curr.apparent_temperature),
        humidity: curr.relative_humidity_2m,
        wind_speed: curr.wind_speed_10m,
        weather_code: code,
        description: wmo.desc,
        icon: wmo.icon,
        pressure: curr.surface_pressure,
        visibility: curr.visibility / 1000,
        sunrise: daily.sunrise[0]?.split("T")[1] ?? "--",
        sunset: daily.sunset[0]?.split("T")[1] ?? "--",
        latitude: geo.latitude,
        longitude: geo.longitude,
      });
    } catch (err: any) {
      setError(err.message ?? "Gagal mengambil data cuaca");
    } finally {
      setLoading(false);
    }
  }, []);

  return { weather, loading, error, fetchWeather };
}
