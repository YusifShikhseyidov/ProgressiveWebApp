import React, { useState } from 'react'
import {fetchWeather} from "./api/fetchWeather";
import "./App.css";

export default function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  // Tried to code dynamic image
  // const bgImage = weather.weather[0].description === "overcast clouds" ? {backgroundImage: url('https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg?auto=compress&cs=tinysrgb&w=1920&h=1920')} : {backgroundImage: url('https://images.pexels.com/photos/1192671/pexels-photo-1192671.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1920')}


  const search = async (e) =>{
    if(e.key === 'Enter'){
      const data = await fetchWeather(query);
      setWeather(data);
      // console.log(data)
      setQuery("");
    }
    
  }

  return (
    <div className='container'>
      <input type="text" className='search' placeholder='Type the City Name' value={query} onChange={e => setQuery(e.target.value)} onKeyDown={search} />
      {weather.main && (<div className='city'>
        
        <h1 className='city-name'>
          <span>{weather.name}</span>
          <sup>{weather.sys.country}</sup>
        </h1>

        <div className="city-temp">{Math.round(weather.main.temp)}<sup>&deg;C</sup></div>
        
        <div className='info'>
          <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          <p>{weather.weather[0].description}</p>
        </div>
        
      </div>)}
    </div>
  )
}
