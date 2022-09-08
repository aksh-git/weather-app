import React, { useState } from 'react'
import Wcard from './cards/wcard'
import moment from "moment-timezone";
import ListCard from './cards/ListCard';

function WeatherWeekly({weather,locData}) {

  const weekNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  const [dailyData, setdailyData] = useState(weather['daily'])

  const [topData, settopData] = useState(dailyData[0])
  
  console.log(locData);
  function getTime(timeinMilli){
    return moment.unix(timeinMilli).tz(weather['timezone']).format("LT")
  }

  function getdate(timeinMilli){
    return moment.unix(timeinMilli).tz(weather['timezone']).format('DD/MM/YYYY')
  } 
  function getday(timeinMilli){
    return moment.unix(timeinMilli).tz(weather['timezone']).day()
  } 

  const tempdata = {
    "dt": 1662532200,
    "sunrise": 1662510946,
    "sunset": 1662556402,
    "moonrise": 1662549960,
    "moonset": 1662496740,
    "moon_phase": 0.38,
    "temp": {
      "day": 33.02,
      "min": 24.52,
      "max": 34.13,
      "night": 27.33,
      "eve": 30.96,
      "morn": 24.52
    },
    "feels_like": {
      "day": 37.23,
      "night": 29.33,
      "eve": 35.01,
      "morn": 25.04
    },
    "pressure": 1008,
    "humidity": 53,
    "dew_point": 22.15,
    "wind_speed": 2.07,
    "wind_deg": 45,
    "wind_gust": 2.11,
    "weather": [
      {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
      }
    ],
    "clouds": 0,
    "pop": 0,
    "uvi": 9.17
  }
  let date = new Date()
  return (
    <div className='weeklyWeather'>
      <div className='wDailydata'>
        <div className='wdd-wrap'>
          <div className='main'>
            <div className='data'>
              <div className='data-1'>
                <span className='wddm-icon'>
                  <img src={`https://openweathermap.org/img/wn/${topData.weather[0].icon}@2x.png`} />
                </span>
                <span className='wddm-main'>
                  <span className='type'>{topData.weather[0].main}</span>
                  <span className='decp'>{topData.weather[0].description}</span>
                </span>
              </div>
              <div className='data-2'>
                <span className='wddm-main'>
                  <span className='day'>{weekNames[getday(topData.dt)]}</span>
                  <span className='date'>{getdate(topData.dt)}</span>
                </span>
              </div>
            </div>
            <div className='dataDetails'>
              <div classNamw='temp-data'>
                <ListCard title='Temp'>
                  <li>
                    <span>min</span>
                    <div>⁓</div>
                    <span>{Math.ceil(topData.temp.min)}&deg;</span>
                  </li>
                  <li>
                    <span>max</span>
                    <div>⁓</div>
                    <span>{Math.ceil(topData.temp.max)}&deg;</span>
                  </li>
                  <li>
                    <span>morn</span>
                    <div>⁓</div>
                    <span>{Math.ceil(topData.temp.morn)}&deg;</span>
                  </li>
                  <li>
                    <span>day</span>
                    <div>⁓</div>
                    <span>{Math.ceil(topData.temp.day)}&deg;</span>
                  </li>
                  <li>
                    <span>eve</span>
                    <div>⁓</div>
                    <span>{Math.ceil(topData.temp.eve)}&deg;</span>
                  </li>
                  <li>
                    <span>night</span>
                    <div>⁓</div>
                    <span>{Math.ceil(topData.temp.night)}&deg;</span>
                  </li>
                </ListCard>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='ww-card-area'>
        <div className='wwc-wraper'>
          {dailyData.map((ddata)=>{
            return <span className={`${topData.dt===ddata.dt?'activeday':''}`} onClick={()=>{settopData(ddata)}} key={ddata.dt}>
              <Wcard 
            icon={`https://openweathermap.org/img/wn/${ddata.weather[0].icon}@2x.png`}
            day={getday(ddata.dt)}
            tempmin={Math.ceil(ddata.temp.min)}
            tempmax={Math.ceil(ddata.temp.max)}
            main={ddata.weather[0].main}
            />
            </span>
          })}
        </div>
      </div>
    </div>
  )
}

export default WeatherWeekly