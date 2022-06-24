import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BsThermometerHalf, BsWind, BsClouds, BsArrowDownCircle } from 'react-icons/bs';

function App() {

  const apiKey = 'd7dc0a4dbac3ca328d6a923abe42eecb'

  const [cityWeatherData, setCityWeatherData] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [searchInputSubmitted, setSearchInputSubmitted] = useState('');
  const [isDataCorrect, setIsDataCorrect] = useState(false);
  const [isBeforeFirstSearch, setIsBeforeFirstSearch] = useState(true);

  useEffect(() => {
    if(searchInputSubmitted) {
      setIsBeforeFirstSearch(false);
      axios.get('https://api.openweathermap.org/data/2.5/weather?q='+searchInputSubmitted+'&appid='+apiKey+'&units=metric').then(res => {
        setCityWeatherData(res.data);
        setIsDataCorrect(true);
      }).catch(error => {
        console.log(error);
        setIsDataCorrect(false);
      });
    }
  }, [searchInputSubmitted])

  const handleSubmit = e => {
    e.preventDefault();
    setSearchInputSubmitted(searchInput);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="search">
          <h2 className="search-title">What's the weather in...</h2>
          <form onSubmit={ handleSubmit }>
            <div className="form-container">
              <input className="form-input" type="text" placeholder='Type the city...' value={ searchInput } onChange={ (e) => setSearchInput(e.target.value) }/>  
              <input className="form-submit" type="submit" value="search" />
            </div>
          </form>  
        </div>
        <div className={!isBeforeFirstSearch ? "content active" : "content disabled"}>
          {searchInputSubmitted!=='' ? (isDataCorrect ?  <div>
            <div className='weather-info'>{cityWeatherData.weather[0].description}</div>
            <div className='weather-info'><BsThermometerHalf /> {Math.round(cityWeatherData.main.temp)}&deg;C ({Math.round(cityWeatherData.main.feels_like)}&deg;C)</div>
            <div className='weather-info'><BsArrowDownCircle />&nbsp;{cityWeatherData.main.pressure} hPa</div>
            <div className='weather-info'><BsWind />&nbsp;{Math.round(cityWeatherData.wind.speed)} m/s</div>
            <div className='weather-info'><BsClouds />&nbsp;{cityWeatherData.clouds.all}%</div>
          </div> : "No data found") : "Please type the city you'd like to see the weather for"}
        </div>
      </div>
      <div className="footer">
        <p>&copy; 2022 Michał Kowalik</p>
      </div>
    </div>
  );
}

export default App;