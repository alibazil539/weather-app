import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const GEOCODE = "https://geocoding-api.open-meteo.com/v1/search?name=";
const FORECAST = "https://api.open-meteo.com/v1/forecast";

export default function City() {
  const { name } = useParams();
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!name) return;
    async function fetchData() {
      setLoading(true);
      setError("");
      setPlace(null);
      setWeather(null);

      try {
        // 1) Geocoding: get lat/lon for city name
        const geoRes = await fetch(`${GEOCODE}${encodeURIComponent(name)}&count=5`);
        const geoJson = await geoRes.json();
        if (!geoJson.results || geoJson.results.length === 0) {
          setError("City not found.");
          setLoading(false);
          return;
        }
        // pick first result (best match)
        const first = geoJson.results[0];
        setPlace(first);

        // 2) Forecast: get current weather + daily summary
        const params = new URLSearchParams({
          latitude: first.latitude,
          longitude: first.longitude,
          current_weather: "true",
          daily: "temperature_2m_max,temperature_2m_min,precipitation_sum",
          timezone: "auto",
        });

        const weatherRes = await fetch(`${FORECAST}?${params.toString()}`);
        const weatherJson = await weatherRes.json();
        setWeather(weatherJson);
      } catch (err) {
        console.error(err);
        setError("Kuch error hua. Console dekhein.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [name]);

  return (
    <div>
      <Link to="/" className="text-sm text-blue-600">← Back</Link>
      <h2 className="text-2xl mt-2 mb-4">Weather for "{decodeURIComponent(name)}"</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {place && weather && (
        <div className="space-y-4">
          <div>
            <strong>{place.name}</strong>
            {place.admin1 ? `, ${place.admin1}` : ""} {place.country ? `, ${place.country}` : ""}
            <div className="text-sm text-gray-600">Lat: {place.latitude}, Lon: {place.longitude}</div>
          </div>

          <div className="p-4 border rounded">
            <h3 className="font-semibold">Current</h3>
            {weather.current_weather ? (
              <div>
                <div>Temperature: {weather.current_weather.temperature}°C</div>
                <div>Wind: {weather.current_weather.windspeed} km/h</div>
                <div>Weather code: {weather.current_weather.weathercode}</div>
                <div className="text-sm text-gray-600">
                  Time: {weather.current_weather.time}
                </div>
              </div>
            ) : (
              <div>No current data</div>
            )}
          </div>

          <div className="p-4 border rounded">
            <h3 className="font-semibold">Daily (next days summary)</h3>
            {weather.daily && (
              <table style={{width: "100%"}}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Min °C</th>
                    <th>Max °C</th>
                    <th>Precip (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  {weather.daily.time.map((t, i) => (
                    <tr key={t}>
                      <td>{t}</td>
                      <td>{weather.daily.temperature_2m_min[i]}</td>
                      <td>{weather.daily.temperature_2m_max[i]}</td>
                      <td>{(weather.daily.precipitation_sum && weather.daily.precipitation_sum[i]) ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
