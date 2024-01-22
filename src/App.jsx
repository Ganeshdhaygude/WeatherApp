import { useEffect, useState } from 'react'
import './App.css'
import Temperature from './components/Temperature'

import Highlights from './components/Highlights';

function App() {
  const [city,setCity]=useState("New Delhi");
const [weatherData,setWeatherData]=useState(null);
useEffect(()=>{
  const apiUrl='https://api.weatherapi.com/v1/current.json?key=b44009c5981b4cdba63172903232109&q=${city}&aqi=no;';
  fetch(apiUrl)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Could not get data");
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);
    setWeatherData(data);
  })
  .catch((e) => {
    console.log(e);
  });
}, [city]);
return (
<div className="bg-cyan-950 h-screen flex justify-center  items-start">
  
  <div className="w-1/5 h-1/3 mt-40">
    {weatherData && (
      <Temperature
        setCity={setCity}
        stats={{
          temp: weatherData.current.temp_c,
          condition: weatherData.current.condition.text,
          isDay: weatherData.current.is_day,
          location: weatherData.location.name,
          time: weatherData.location.localtime,
        }}
      />
    )}
  </div>
  <div className='justify-center text-white  text-xl font-sans p-2 '> <p>Made By Ganesh Dhaygude</p>
  </div>
  <div className="w-1/3 h-1/3 mt-40 p-10 grid grid-cols-2 gap-6">
    <h1 className="text-slate-200 text-2xl col-span-2">
      Today's Weather
    </h1>
    {weatherData && (
      <>
        <Highlights
          stats={{
            title: "Wind Status",
            value: weatherData.current.wind_mph,
            unit: "mph",
            direction: weatherData.current.wind_dir,
          }}
        />
        <Highlights
          stats={{
            title: "Humidity",
            value: weatherData.current.humidity,
            unit: "%",
          }}
        />
        <Highlights
          stats={{
            title: "Visibility",
            value: weatherData.current.vis_miles,
            unit: "miles",
          }}
        />
        <Highlights
          stats={{
            title: "Air Pressure",
            value: weatherData.current.pressure_mb,
            unit: "mb",
          }}
        />
        <Highlights
        stats={{title: "Rain prediction",
      value: weatherData.current.precip_mm,
    unit: "%",
  }}/>
      </>
    )}
  

  </div>
 
 
</div>
);
}

export default App;