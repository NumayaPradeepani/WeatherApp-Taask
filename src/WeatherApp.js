import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherApp = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = '433461cde5f6b201c4863a64f51c73a1';

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
        );
        setWeatherData(response.data.list);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (city) {
      getWeatherData();
    }
  }, [city]);

  const filterForecastByDay = (forecastList) => {
    const filteredForecast = {};

    // Iterate over forecast list and group by day
    forecastList.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString('en-US');
      if (filteredForecast[date]) {
        filteredForecast[date].push(forecast);
      } else {
        filteredForecast[date] = [forecast];
      }
    });

    return filteredForecast;
  };

  return (
    <div>
      <h2>Weather Forecast</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        weatherData && (
          <div>
            {Object.entries(filterForecastByDay(weatherData)).map(([date, forecasts]) => (
              <div key={date}>
                <h3>{date}</h3>
                {forecasts.map((forecast) => (
                  <div key={forecast.dt}>
                    <p>Temperature: {forecast.main.temp}°C</p>
                    <p>Weather: {forecast.weather[0].description}</p>
                    <hr />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default WeatherApp;
