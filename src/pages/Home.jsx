import  { useState, useEffect } from 'react';
import { getWeatherByCity, getWeatherByZip } from '../services/penta-api';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';

function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [query, setQuery] = useState('New York');
  const [loading, setLoading] = useState(false);
  const [metric, setMetric] = useState('F');

  const fetchWeather = async (location) => {
    setLoading(true);
    try {
      let data;
      if (isNaN(location)) {
        data = await getWeatherByCity(location);
      } else {
        data = await getWeatherByZip(location);
      }
      setWeatherData(data);
    } catch (err) {
      console.error("Error fetching weather data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(query);
  }, [query]);

  const toggleMetric = () => setMetric((prev) => (prev === 'F' ? 'C' : 'F'));

  if (loading) return <p>Loading...</p>;

  return (
    <div className="home-container">
      <h1>Welcome to Penta Clima</h1>
      <SearchBar onSearch={setQuery} />
      {weatherData && (
        <div className="weather-card-container">
          <h2>Weather for {weatherData.city.name} on {new Date().toLocaleDateString()}</h2>
          <WeatherCard
            time={weatherData.list[0].dt}
            temp={weatherData.list[0].main.temp}
            description={weatherData.list[0].weather[0].description}
            icon={weatherData.list[0].weather[0].icon}
            toggleMetric={toggleMetric}
            metric={metric}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
