const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
const GEO_CITY_URL = "http://api.openweathermap.org/geo/1.0/direct";
const GEO_ZIP_URL = "http://api.openweathermap.org/geo/1.0/zip";

export const getWeatherByCity = async (city) => {
    const geoResponse = await fetch(`${GEO_CITY_URL}?q=${city}&limit=1&appid=${API_KEY}`);
    const geoData = await geoResponse.json();
    const { lat, lon } = geoData[0];

    const weatherResponse = await fetch(
        `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
    );
    return weatherResponse.json();
};

export const getWeatherByZip = async (zip) => {
    const geoResponse = await fetch(`${GEO_ZIP_URL}?zip=${zip}&appid=${API_KEY}`);
    const geoData = await geoResponse.json();
    const { lat, lon } = geoData[0];

    const weatherResponse = await fetch(
        `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
    );
    return weatherResponse.json();
};
