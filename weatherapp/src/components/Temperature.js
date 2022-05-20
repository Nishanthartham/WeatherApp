import React, { useState, useEffect } from "react";
import "./styles.css";
import Weathercard from "./WeatherCard";

const Temp = () => {
    const [searchInput,setSearchInput] = useState("pune");
    const [weatherData,setWeatherData] = useState({});
    console.log(searchInput)
    const getWeatherInfo = async ()  => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        let res = await fetch(url);
        let data = await res.json();
        const {main:weatherType} = data.weather[0];
        const {temp,humidity,pressure} = data.main;
        const {sunset,country} = data.sys;
        const {speed} = data.wind
        const {name} = data
        const tempWeatherData = {weatherType,
                            temp,
                            humidity,
                            pressure,
                            sunset,
                            country,
                            weatherData,
                            speed,
                        name  }
        setWeatherData(tempWeatherData)
        // console.log(tempWeatherData);
        // console.log(weatherData);
        

    }
    useEffect(() => {
        getWeatherInfo();
    }, [])//render only once for pune
    
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            onChange={(event)=>{setSearchInput(event.target.value)}}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
        >
             Search
          </button>
        </div>
      </div>
      <Weathercard {...weatherData}/>

    </>
  );
};

export default Temp;