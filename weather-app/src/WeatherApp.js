import React, { useState } from "react";
import "./WeatherApp.css";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "5be42b8dd76947a58a575450251203"; // Replace with your API key
  const API_URL = "https://api.weatherapi.com/v1/current.json";

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}&aqi=no`);
      if (!response.ok) throw new Error("City not found or API limit reached");
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Search for a city..." 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          onKeyPress={(e) => e.key === "Enter" && getWeather()}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      <div id="weather-container">
        {loading && <div className="loading">Loading weather information...</div>}
        {error && <div className="error">{error}</div>}
        {weather && (
          <div className="weather-display">
            <div className="city">{weather.location.name}, {weather.location.country}</div>
            <div className="date">{new Date().toLocaleDateString()}</div>
            <div className="weather-icon">
              <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
            </div>
            <div className="temperature">{Math.round(weather.current.temp_c)}°C</div>
            <div className="description">{weather.current.condition.text}</div>
            <div className="weather-details">
              <div className="detail-item">
                <div className="detail-label">Feels Like</div>
                <div className="detail-value">{Math.round(weather.current.feelslike_c)}°C</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Humidity</div>
                <div className="detail-value">{weather.current.humidity}%</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Wind</div>
                <div className="detail-value">{weather.current.wind_kph} km/h</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
