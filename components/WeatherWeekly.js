import React, { useEffect, useState } from 'react'
import Wcard from './cards/wcard'
import moment from "moment-timezone";
import ListCard from './cards/ListCard';

function WeatherWeekly({weather, locData}) {

  const weekNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  const [dailyData, setdailyData] = useState(weather['daily'])

  const [topData, settopData] = useState(dailyData[0])
  
  function getTime(timeinMilli){
    return moment.unix(timeinMilli).tz(weather['timezone']).format("LT")
  }

  const setMoonRotation = deg => {
    document.querySelector('.divider').style.transform = `rotate3d(0, 1, 0, ${deg}deg)`
  
    const hemispheres = document.querySelectorAll('.hemisphere')
  
    if (deg < 180) {
      // Left
      hemispheres[0].classList.remove('dark')
      hemispheres[0].classList.add('light')
  
      // Right
      hemispheres[1].classList.add('dark')
      hemispheres[1].classList.remove('light')
    } else {
      // Left
      hemispheres[0].classList.add('dark')
      hemispheres[0].classList.remove('light')
  
      // Right
      hemispheres[1].classList.remove('dark')
      hemispheres[1].classList.add('light')
    }
  }

  const getMoonPhaseRotation = ()=>{
    let mp = topData.moon_phase;
    return 360 - Math.floor(mp * 360)
  }

  function getdate(timeinMilli){
    return moment.unix(timeinMilli).tz(weather['timezone']).format('DD/MM/YYYY')
  } 
  function getday(timeinMilli){
    return moment.unix(timeinMilli).tz(weather['timezone']).day()
  } 

  useEffect(() => {
    setMoonRotation(getMoonPhaseRotation())
  }, [topData])
  
  const changeBackground =(type)=> {
    console.log(type);
    switch (type) {
      case 'rain':
        document.getElementById('home').style.backgroundImage =`url('/assets/images/rain.jpg')`;
        document.getElementById('main').style.backgroundImage =`url('/assets/images/rain.jpg')`;
        break;
      case 'clear':
        document.getElementById('home').style.backgroundImage =`url('/assets/images/clear_sky.jpg')`;
        document.getElementById('main').style.backgroundImage =`url('/assets/images/clear_sky.jpg')`;
        break;
      default:
        document.getElementById('home').style.backgroundImage =`url('/assets/images/few_clouds.jpg')`;
        document.getElementById('main').style.backgroundImage =`url('/assets/images/few_clouds.jpg')`;
        break;
    }
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
                <ListCard title='Temperature'>
                  <li title="Minimum">
                    <span>min</span>
                    <div>⁓</div>
                    <span>{Math.ceil(topData.temp.min)}&deg;</span>
                  </li>
                  <li title="Maximum">
                    <span>max</span>
                    <div>⁓</div>
                    <span>{Math.ceil(topData.temp.max)}&deg;</span>
                  </li>
                  <li title="Morning">
                    <span>morn</span>
                    <div>⁓</div>
                    <span>{Math.ceil(topData.temp.morn)}&deg;</span>
                  </li>
                  <li title="Day">
                    <span>day</span>
                    <div>⁓</div>
                    <span>{Math.ceil(topData.temp.day)}&deg;</span>
                  </li>
                  <li title="Evening">
                    <span>eve</span>
                    <div>⁓</div>
                    <span>{Math.ceil(topData.temp.eve)}&deg;</span>
                  </li>
                  <li title="Night">
                    <span>night</span>
                    <div>⁓</div>
                    <span>{Math.ceil(topData.temp.night)}&deg;</span>
                  </li>
                </ListCard>
              </div>
              <div className='time-data'>
                <ListCard title='Timestamps'>
                  <li>
                    <span>Sunrise</span>
                    <div>-</div>
                    <span>{getTime(topData.sunrise)}</span>
                  </li>
                  <li>
                    <span>Sunset</span>
                    <div>-</div>
                    <span>{getTime(topData.sunset)}</span>
                  </li>
                  <li>
                    <span>moonrise</span>
                    <div>-</div>
                    <span>{getTime(topData.moonrise)}</span>
                  </li>
                  <li>
                    <span>moonset</span>
                    <div>-</div>
                    <span>{getTime(topData.moonset)}</span>
                  </li>
                  <center><div title='Moon Phase' class="sphere">
                    <div class="light hemisphere"></div>
                    <div class="dark hemisphere"></div>
                    <div class="divider"></div>
                  </div></center>
                </ListCard>
              </div>
              <div className='forecast-data'>
                <ListCard title='Weather Forecast Data'>
                  <li>
                    <span>humidity</span>
                    <div>⁓</div>
                    <span>{Math.ceil(topData.humidity)} %</span>
                  </li>
                  <li>
                    <span>pressure</span>
                    <div>⁓</div>
                    <span>{topData.pressure}</span>
                  </li>
                  <li>
                    <span>clouds</span>
                    <div>⁓</div>
                    <span>{topData.clouds} %</span>
                  </li>
                  <li>
                    <span>UV Index</span>
                    <div>⁓</div>
                    <span>{topData.uvi}</span>
                  </li>
                  <li>
                    <span>wind speed</span>
                    <div>⁓</div>
                    <span>{topData.wind_speed} km/h</span>
                  </li>
                  <li>
                    <span>wind gust</span>
                    <div>⁓</div>
                    <span>{topData.wind_gust} km/h</span>
                  </li>
                </ListCard>
              </div>
              <div className='other-data'>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='ww-card-area'>
        <div className='wwc-wraper'>
          {dailyData.map((ddata)=>{
            
            return <span className={`${topData.dt===ddata.dt?'activeday':''}`} onClick={()=>{settopData(ddata);changeBackground(ddata.weather[0].main.toLowerCase())}} key={ddata.dt}>
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