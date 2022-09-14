import styles from '../styles/Home.module.css'
import React , { useEffect, useState } from 'react'
import moment from "moment-timezone";
import WeatherWeekly from '../components/WeatherWeekly'
import Loader from '../components/Loader';

export default function Home() {

  const date = new Date()
  const monthNames = ["Jan", "Feb", "March", "April", "May", "June","July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const weekNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','saturday'];

  const [loc, setloc] = useState({})
  const [locData, setlocData] = useState({})
  const [locerr, setlocerr] = useState()
  const [weather, setweather] = useState({})
  const [clock, setClock] = useState("")

  function getTime(timeinMilli){
    return moment.unix(timeinMilli).tz(weather['timezone']).format("LT")
  }

  function showPosition(position){  
    let loc = position.coords.latitude
    let lon = position.coords.longitude 
    setloc({loc,lon})
  }

  function getGeoLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition)  
    }
  }

  function showErr(error) {  
    switch(error.code){  
      case error.PERMISSION_DENIED:  
        setlocerr("You denied the request for Geolocation API.");  
        break;  
      case error.POSITION_UNAVAILABLE:  
        setlocerr("Your location information is unavailable.");  
        break;  
      case error.TIMEOUT:  
        setlocerr("The request to get you location timed out.");  
        break;  
      case error.UNKNOWN_ERROR:  
        setlocerr("An unknown error occurred.");  
      break;  
 }  
}   

  async function getIPAddress(){
    let res = await fetch('https://api.ipify.org/?format=json')
    let ip = await res.json()
    return ip
  }

  async function convertIPToLoc(ip){
    // let res = await fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`)
    // http://freegeoip.net/json/
    let res = await fetch(`https://ipapi.co/${ip}/json`)
    let data = await res.json()
    setlocData(data)
    return data
  }

  async function first(){
    const { ip } = await getIPAddress()
    const {latitude, longitude} = await convertIPToLoc(ip)
    await getWeatherApi_call(latitude,longitude)
  }
  useEffect(() => {
    first()
  }, [])
  
  const getHourlyWeather = (hourlyData, timezone) => {
    const endOfDay = moment().tz(timezone).endOf("day").valueOf();
    const eodTimeStamp = Math.floor(endOfDay / 1000);
  
    const todaysData = hourlyData.filter((data) => data.dt < eodTimeStamp);
  
    return todaysData;
  };

  
  async function getWeatherApi_call(lat,lon){
    // let res = await fetch(`/api/getDataByLocation?lat=${locData.latitude}&lon=${locData.longitude}`)
    const res = await fetch(`/api/getDataByLocation?lat=${lat}&lon=${lon}`)
    const response = await res.json()
    //let parsedData =  await JSON.parse(JSON.stringify(res));
    setweather(response)
  }


  return (
    <>
    {!weather['current'] && <Loader text='weather data...' color='#fff'/>}
    <div className={`${styles.home}`}>
      <div className={`${styles.wrap}`}>
        {weather['current'] && <div className={`center ${styles.main}`}>
          <div className={styles.leftTab}>
            <div className={styles.dataInDetail}>
              <WeatherWeekly weather={weather} locData={locData} />
            </div>
            <div className={styles.data}>
              <span className={styles.temp}>{Math.ceil(weather['current'].temp)} &deg;</span>
              <div className={styles.cityDetails}>
                <span className={styles.city}>{locData.city}</span>
                <span className={styles.region}>{locData.region},{locData.country_name}</span>
                {/* <span className={styles.timestamps}>{getTime(weather['current'].dt)} - {weekNames[date.getDay()]} , {date.getDate()} {monthNames[date.getMonth()]} '{date.getFullYear().toString().slice(2)}</span> */}
                <span className={styles.timestamps}>last Updated -{getTime(weather['current'].dt)}</span>
              </div>
              <div className={styles.wtypeData}>
                <span className={styles.wicon}>
                  <a target='_blank' href='https://akash-web.netlify.app'><img
                  src={`https://raw.githubusercontent.com/aksh-git/assets/main/logo-dark.svg`}
                  alt="Akash yadav"
                  layout="fill"
                  height='100%'
                  width='100%'
                  />  </a>
                </span>
              </div>
            </div>
          </div>
          <div className={styles.rightTab}>
            <div>
              <div className="search">
                <input type="text" placeholder="Search by zip-code e.g. 141001"/>
              </div>
              <div className={styles.currentW}>
                <div className={` ${styles.item}`}>
                  <span className={styles.title}>sunrise</span>-
                  <span className={styles.wtext}>{getTime(weather['current'].sunrise)}</span>
                </div>
                <div className={` ${styles.item}`}>
                  <span className={styles.title}>sunset</span>-
                  <span className={styles.wtext}>{getTime(weather['current'].sunset)}</span>
                </div>
                <div className={` ${styles.item}`}>
                  <span className={styles.title}>humidity </span>-
                  <span className={styles.wtext}>{weather['current'].humidity} %</span>
                </div>
                <div className={` ${styles.item}`}>
                  <span className={styles.title}>feels like </span>-
                  <span className={styles.wtext}>{Math.ceil(weather['current'].feels_like)} &deg;C</span>
                </div>
                <div className={` ${styles.item}`}>
                  <span className={styles.title}>Dew point </span>-
                  <span className={styles.wtext}>{weather['current'].dew_point} &deg;C</span>
                </div>
                <div className={` ${styles.item}`}>
                  <span className={styles.title}>Clouds </span>-
                  <span className={styles.wtext}>{weather['current'].clouds} %</span>
                </div>
                <div className={` ${styles.item}`}>
                  <span className={styles.title}>Wind Speed </span>-
                  <span className={styles.wtext}>{weather['current'].wind_speed} km/h</span>
                </div>
                <div className={` ${styles.item}`}>
                  <span className={styles.title}>Wind deg </span>-
                  <span className={styles.wtext}>{weather['current'].wind_deg} &deg;</span>
                </div>
                <div className={` ${styles.item}`}>
                  <span className={styles.title}>pressure</span>-
                  <span className={styles.wtext}>{weather['current'].pressure}</span>
                </div>
                {weather['current'].wind_gust && <div className={` ${styles.item}`}>
                  <span className={styles.title}>Wind gust</span>-
                  <span className={styles.wtext}>{weather['current'].wind_gust} km/h</span>
                </div>}
                <div className={` ${styles.item}`}>
                  <span className={styles.title}>Visibility</span>-
                  <span className={styles.wtext}>{weather['current'].visibility}</span>
                </div>
                <div className={` ${styles.item}`}>
                  <span className={styles.title}>UV Index</span>-
                  <span className={styles.wtext}>{weather['current'].uvi}</span>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </div>
    </div>
    </>
  )
}
