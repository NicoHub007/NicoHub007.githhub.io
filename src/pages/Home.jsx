// src/pages/Home.jsx
import { useState } from "react";
import { getCoordinatesByCity, getCoordinatesByZip, getWeatherData } from "../services/penta-api";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";

function Home() {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setError(null);
    let coords;
    try {
      if (query.match(/^\d{5}$/)) {
        // If it's a ZIP code (assuming US)
        coords = await getCoordinatesByZip(query, "US");
      } else {
        // Otherwise, it's treated as a city name
        coords = await getCoordinatesByCity(query);
      }

      const weather = await getWeatherData(coords.lat, coords.lon);
      setWeatherData(weather.list);
    } catch (err) {
      setError("Could not fetch weather data. Please try again.");
    }
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p>{error}</p>}
      <div className="weather-cards">
        {weatherData.map((entry, index) => (
          <WeatherCard
            key={index}
            time={entry.dt}
            temp={entry.main.temp}
            description={entry.weather[0].description}
            icon={entry.weather[0].icon}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
