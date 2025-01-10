import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getWeatherData } from "../services/penta-api";
import WeatherCard from "../components/WeatherCard";

function Forecast() {
    const { city } = useParams();
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const coords = await getCoordinatesByCity(city);
            const weather = await getWeatherData(coords.lat, coords.lon);
            setWeatherData(weather.list);
        };

        fetchData();
    }, [city]);

    return (
        <div>
            <h1>5-Day Weather Forecast for {city}</h1>
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

export default Forecast;
