import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WeatherForecast.css';

const apiKey = '433461cde5f6b201c4863a64f51c73a1';

const Profile = () => {
  const [data, setData] = useState({});
  const [city, setCity] = useState('');
  const [forecastData, setForecastData] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [showForecast, setShowForecast] = useState(true);
  const [fullWeekForecast, setFullWeekForecast] = useState([]);

  const getWeatherData = (url) => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('An error occurred while fetching the weather data.', error);
      });
  };

  useEffect(() => {
    const defaultUrl = `https://api.openweathermap.org/data/2.5/weather?q=Colombo&units=metric&appid=${apiKey}`;
    getWeatherData(defaultUrl);
  }, []);

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      getWeatherData(url);
      setCity('');
    }
  };

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const handleSearch = () => {
    fetchWeatherData();
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );
      const forecast = forecastResponse.data.list;
      setForecastData(forecast);

      // Extract forecast for the next three days
      const uniqueDates = new Set();
      const nextThreeDaysForecast = forecast.filter((forecastItem) => {
        const date = forecastItem.dt_txt.split(' ')[0];
        if (!uniqueDates.has(date)) {
          uniqueDates.add(date);
          return true;
        }
        return false;
      });

      setFullWeekForecast(nextThreeDaysForecast);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
      setFullWeekForecast([]);
    }
  };

  const handleSeeMore = () => {
    setShowForecast(!showForecast);
  };

  return (
    <div className="app1">
      <div className="container1">
        
        <div className="long-lat"><br/><br/><br/><br/><br/><br/>
          <h2>Weather Search</h2>
          <br />
          <br />
          <div className="row">
            <div className="col-2">
              <input
                type="text"
                id="latitude"
                value={latitude}
                onChange={handleLatitudeChange}
                placeholder="Enter Latitude"
              />
            </div>
            <div className="col-2">
              <input
                type="text"
                id="longitude"
                value={longitude}
                onChange={handleLongitudeChange}
                placeholder="Enter Longitude"
              />
            </div>
          </div>
          <br />
          <br />
          <center>
            <button onClick={handleSearch}>Search</button>
          </center>
          <br />
          <br />
          {error && <p>Error: {error}</p>}
          {weatherData && (
            <div className="weather">
              <h3>Weather Details of {weatherData.name}</h3>
              <br />
              <br />
              <div className="weather-details">
                <div className="Temp">
                  {weatherData.main ? <p className="bold">{weatherData.main.temp}°C</p> : null}
                  <p>Temperature</p>
                </div>
                <div className="humidity">
                  {weatherData.main ? <p className="bold">{weatherData.main.humidity}%</p> : null}
                  <p>Humidity</p>
                </div>
                <div className="wind">
                  {weatherData.wind ? <p className="bold">{weatherData.weather[0].description}</p> : null}
                  <p>Weather</p>
                </div>
              </div>
            </div>
          )}

          <br /><br />

          {forecastData.length > 0 && (
            <div>
              <h3>Next Three Days Forecast</h3>
              <br /><br />
              {showForecast && (
                <div className="forecast">
                  <br />
                  <br />
                  {forecastData.slice(1, 5).map((forecastItem) => (
                    <div className="forecast-item" key={forecastItem.dt}>
                      <p>Date: {forecastItem.dt_txt.split(' ')[0]}</p>
                      <p>Temperature: {forecastItem.main.temp}°C</p>
                      <p>Humidity: {forecastItem.main.humidity}%</p>
                      <p>Weather: {forecastItem.weather[0].description}</p>
                      <br />
                      <br />
                    </div>
                  ))}
                </div>
              )}
              {!showForecast && (
                <div className="next-three-days-forecast">
                  <br />
                  <br />
                  {fullWeekForecast.map((forecastItem) => (
                    <div className="forecast-item" key={forecastItem.dt}>
                      <p>Date: {forecastItem.dt_txt.split(' ')[0]}</p>
                      <p>Temperature: {forecastItem.main.temp}°C</p>
                      <p>Humidity: {forecastItem.main.humidity}%</p>
                      <p>Weather: {forecastItem.weather[0].description}</p>
                      <br />
                      <br />
                    </div>
                  ))}
                </div>
              )}
              <button onClick={handleSeeMore}>{showForecast ? 'Show More' : 'Hide Forecast'}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
