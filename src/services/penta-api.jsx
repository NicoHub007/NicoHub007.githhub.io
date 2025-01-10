// src/services/penta-api.jsx
const API_KEY = import.meta.env.VITE_API_KEY;  // API key from .env file
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";  // Base URL for geocoding API

// Function to get coordinates by city name
export async function getCoordinatesByCity(cityName) {
    const url = `${GEO_URL}/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data[0];  // Assuming first result is the correct one
}

// Function to get coordinates by ZIP code
export async function getCoordinatesByZip(zipCode, countryCode) {
    const url = `${GEO_URL}/zip?zip=${zipCode},${countryCode}&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data[0];  // Assuming first result is the correct one
}

// Function to get weather data by coordinates
export async function getWeatherData(lat, lon) {
    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`; // Using metric units (°C)
    const response = await fetch(url);
    const data = await response.json();
    return data;  // Returns weather data for the next 5 days, every 3 hours
}
