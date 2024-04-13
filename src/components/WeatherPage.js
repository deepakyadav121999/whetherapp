import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const WeatherContainer = styled.div`
  max-width: 80%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const WeatherCard = styled.div`
  background-color: rgba(248, 249, 250, 0.8); 
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const WeatherImage = styled.img`
  width: 100px;
`;

const WeatherDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WeatherBackground = styled.div`
  background-image: ${props => `url(${props.background})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 20px;
  border-radius: 10px;
  height: 100vh;
`;

const WeatherTitle = styled.h1`
  font-family: 'sans-serif';
  color: #fff;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

function WeatherPage() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { cityName } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=5870fc9dcfc18a03de80c0b4cea2b843&units=metric`)
      .then(response => {
        setWeather(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('City not found or weather data not available.');
        setLoading(false);
      });
  }, [cityName]);

  const getWeatherBackground = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        return 'https://media.istockphoto.com/id/1328689113/photo/summer-blue-sky-and-white-cloud-white-background-beautiful-clear-cloudy-in-sunlight-calm.jpg?s=612x612&w=0&k=20&c=37qEuwdxyQSx9kuS-_Gz0WiKFX6jMXZN9aRY47mN2vI=';
      case 'Clouds':
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvpwGSmvWFiR5ugXMmwEk3TBMNgaL47ZG4X-3TOCbM9g&s';
      case 'Rain':
      case 'Drizzle':
        return 'https://media.istockphoto.com/id/1049365996/photo/rain-fall-on-the-ground.jpg?s=612x612&w=0&k=20&c=lH73ofHt2WKtJhatw8H53DN4EfgV4ZKDEGPqO4xOPho=';
      case 'Thunderstorm':
        return 'https://media.istockphoto.com/id/517643357/photo/thunderstorm-lightning-with-dark-cloudy-sky.jpg?s=612x612&w=0&k=20&c=x3G3UijRPVGFMFExnlYGbnQtnlH6-oUoMU48BTkc0Os=';
      case 'Snow':
        return 'https://media.istockphoto.com/id/469171699/photo/blue-winter-background-with-tint-white-snow-flakes.webp?b=1&s=170667a&w=0&k=20&c=E58mtjwrjJMkvPQo22ZTczgIazqAKsCQxUod3Cz98bM=';
      default:
        return 'https://wallpapers.com/images/featured/sky-mvehfqz6w2ges2dj.jpg';
    }
  };

  return (
    <WeatherBackground background={weather ? getWeatherBackground(weather.weather[0].main) : ''}>
      <WeatherContainer>
        <WeatherTitle style={{ fontFamily: "sans-serif" }}>Weather for {cityName}</WeatherTitle>
        {loading && <p>Loading...</p>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {weather && (
          <WeatherCard>
            <WeatherDetails>
              <WeatherImage src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
              <p>{weather.weather[0].description}</p>
            </WeatherDetails>
            <p>Minimum Temperature: {weather.main.temp_min}°C</p>
            <p>Maximum Temperature: {weather.main.temp_max}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
            <p>Atmospheric Pressure: {weather.main.pressure}</p>
          </WeatherCard>
        )}
      </WeatherContainer>
    </WeatherBackground>
  );
}

export default WeatherPage;
