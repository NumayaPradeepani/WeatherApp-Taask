import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { Link } from 'react-router-dom';


const apiKey = '433461cde5f6b201c4863a64f51c73a1';

const Profile = () => {
  const [data, setData] = useState({});
  const [city, setCity] = useState('');
  const [forecastData, setForecastData] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [showForecast, setShowForecast] = useState(false);
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
    <div className="app">
      <div className="container">
        <div className="left">
          <div className="top">
            <div className="location">
              <br/><br/><br/><br/><br/><br/>
              <p>{data.name}</p>
            </div>
            <div className="temp">{data.main ? <h1>{data.main.temp} °C</h1> : null}</div>
            <div className="description">{data.weather ? <p>{data.weather[0].main}</p> : null}</div>
          </div>
          <br />
          <br />
          {data.name !== undefined && (
            <div className="middle">
              <div className="feels">
                {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
                <p>Feels like</p>
              </div>
              <div className="humidity">
                {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? <p className="bold">{data.wind.speed.toFixed()} km/h</p> : null}
                <p>Wind</p>
              </div>
            </div>
          )}
          <br /><br /><br /><br />
          <Link to="/WeatherForecast" className="Link">Find more!</Link>
        </div>
        
      </div>
      
    </div>
  );
};

export default Profile;
