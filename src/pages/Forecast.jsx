import { useState, useEffect } from 'react';
import { getWeatherByCity, getWeatherByZip } from '../services/penta-api';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';

function Forecast() {
    const [weatherData, setWeatherData] = useState(null);
    const [query, setQuery] = useState('New York');
    const [loading, setLoading] = useState(false);

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

    const handleSearch = (location) => {
        setQuery(location);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>5 Day Weather Forecast</h1>
            <SearchBar onSearch={handleSearch} />
            {weatherData && (
                <div>
                    <h2>Forecast for {weatherData.city.name}</h2>
                    <div className="weather-cards-container">
                        {weatherData.list.slice(0, 30).map((weather, index) => (
                            <WeatherCard
                                key={index}
                                time={weather.dt}
                                temp={weather.main.temp}
                                description={weather.weather[0].description}
                                icon={weather.weather[0].icon}
                                toggleMetric={toggleMetric}
                                metric={metric}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Forecast;
