import React, { useState } from 'react';

function WeatherCard({ time, temp, description, icon, toggleMetric, metric }) {
  const date = new Date(time * 1000);
  const dayOfWeek = date.toLocaleString('default', { weekday: 'long' });
  const formattedDate = date.toLocaleDateString();
  const temperature = metric === 'C' ? ((temp - 32) * 5) / 9 : temp;

  return (
    <div className="weather-card">
      <h3>{dayOfWeek}, {formattedDate}</h3>
      <p className="time">{date.toLocaleTimeString()}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        className="weather-icon"
      />
      <p className="description">{description}</p>
      <p className="temperature">{Math.round(temperature)}°{metric}</p>
      <button onClick={toggleMetric} className="toggle-btn"> °C/°F</button>
    </div>
  );
}

export default WeatherCard;
