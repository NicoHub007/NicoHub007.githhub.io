import React from 'react'

function WeatherCard({time, temp, description, icon}) {
  return (
    <div className='weather-card'>
        <h2>{new Date(time*1000).toLocaleTimeString}</h2>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />
        <h4>{temp}°C</h4>
        <p>{description}</p>
    </div>
  )
}

export default WeatherCard