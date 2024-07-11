import React, { useState } from 'react';


const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (ev) => {
    if(ev.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(response => {
        if(!response.ok){
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then(result => {
        setWeather(result);
        // console.log(result);
        setQuery('');
      })
      .catch(error => {
        console.log(error);
      });
    }
  }; 

  function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  } 

  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 19.5) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyUp={search}
            placeholder="Search..."
          />
        </div>
        <div className="dataContainer">
          {(typeof weather.main != "undefined") && (
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>)}
          {(typeof weather.main != "undefined") && (
          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°C</div>
            {/* <div className="weather">{weather.weather[0].main}</div> */}
          </div>)}
        </div>
        {(typeof weather.main != "undefined") && (
          <div className="weather-container">
            <div className="weather">{weather.weather[0].main}</div>
          </div>)}
      </main>
    </div>
  );
}

export default App;

