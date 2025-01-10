import React, { useState, useEffect } from 'react';
import { getWeatherByCity, getWeatherByZip } from '../services/penta-api';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';

function Forecast() {
    const [weatherData, setWeatherData] = useState(null);
    const [query, setQuery] = useState('New York');
    const [loading, setLoading] = useState(false);
    const [metric, setMetric] = useState('F');
    const [selectedDay, setSelectedDay] = useState(null);

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
            console.error('Error fetching weather data', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather(query);
    }, [query]);

    const toggleMetric = () => setMetric((prev) => (prev === 'F' ? 'C' : 'F'));

    // Group the weather data into 5 days
    const groupWeatherByDay = (weatherList) => {
        const grouped = {};
        weatherList.forEach((weather) => {
            const date = new Date(weather.dt * 1000);
            const day = date.toLocaleDateString(); // Use the date as the key
            if (!grouped[day]) {
                grouped[day] = [];
            }
            grouped[day].push(weather);
        });
        return grouped;
    };

    // Get the day of the week for each date
    const getDayOfWeek = (date) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayIndex = new Date(date).getDay();
        return daysOfWeek[dayIndex];
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>5 Day Weather Forecast</h1>
            <SearchBar onSearch={setQuery} />
            {weatherData && (
                <div>
                    <h2>Forecast for {weatherData.city.name}</h2>

                    {/* Day Buttons */}
                    <div className="day-buttons">
                        {Object.keys(groupWeatherByDay(weatherData.list))
                            .slice(0, 5)
                            .map((day, index) => {
                                const date = new Date(day);
                                const dayOfWeek = getDayOfWeek(date);

                                return (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedDay(day)}
                                        className={`day-button ${selectedDay === day ? 'selected' : ''}`}
                                    >
                                        {dayOfWeek}
                                    </button>
                                );
                            })}
                    </div>

                    {/* Weather Cards for the selected day */}
                    {selectedDay && (
                        <div className="weather-cards-container">
                            {groupWeatherByDay(weatherData.list)[selectedDay].map((weather, idx) => (
                                <WeatherCard
                                    key={idx}
                                    time={weather.dt}
                                    temp={weather.main.temp}
                                    description={weather.weather[0].description}
                                    icon={weather.weather[0].icon}
                                    toggleMetric={toggleMetric}
                                    metric={metric}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Forecast;
