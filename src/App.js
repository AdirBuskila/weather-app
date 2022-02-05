import * as React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { forecastService } from './services/forecast.service'
import { ForecastList } from './cmps/forecast-list';


export const App = () => {
  const API_KEY = 'N4CxDgJ1zvPqW4hpfIkNgXAvuBfRzxiJ'
  const [inputVal, setInputVal] = useState('')
  const [headlineText, setHeadlineText] = useState('')
  const [locationName, setLocationName] = useState('')
  const [forecasts, setForecasts] = useState('')
  const [timeZone, setTimeZone] = useState('')
  const [cities, setCities] = useState(['Tel-Aviv','Los Angeles','Tokyo'])
  const [searchedCity,setSearchCity] = useState('Los Angeles')
  
  useEffect(() => {
    (async () => {
      try {
        const cityObj = await forecastService.query(searchedCity)
        console.log('cityObj in use effect', cityObj);
        renderForecast(cityObj)
      } catch (err) {
        console.log('cannot load weather', err);
      }
    })()
  }, [searchedCity])

  
  const renderForecast = (cityObj) => {
    setForecasts(cityObj.dailyForecasts)
    setHeadlineText(cityObj.headline)
    setLocationName(cityObj.name)
    setTimeZone(cityObj.timeZone)
  }  

  const HandleChange = async ({ target }) => {
    const value = target.value;
    setInputVal(value);
    if (value.length > 0 ) {
      try {
        const autoComplete = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${value}`)
        setCities([autoComplete.data[0].LocalizedName,autoComplete.data[1].LocalizedName,autoComplete.data[2].LocalizedName])
      } catch (err) {
        console.log('cannot autocomplete', err);
      }
    }
  };

  const HandleSelect = ({target}) => {
    const value = target.value;
    if (!value) return
    setInputVal(value)
  }

  const HandleSubmit = (ev) => {
    ev.preventDefault()
    console.log('setting inputVal', inputVal);
    setSearchCity(inputVal)

  }


  if (!forecasts) return <></>
  return (
    <div className="App">
      <header className="App-header">
        <p>Home Page</p>
        <form autoComplete='off'>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={cities}
            sx={{ width: 300, background: '#ffff', borderRadius: '3px' }}
            renderInput={(params) => <TextField onSelect={(ev)=> {HandleSelect(ev)}} onChange={HandleChange} {...params} label="City" />}
        />
        <button
        onClick={(ev)=>HandleSubmit(ev)}
        >
          Search
        </button>
          </form>
      </header>
      <div className='forecast-text'>
        <p className='forecast-review'>{headlineText}</p>
        <p className='forecast-location'>{locationName}</p>
      </div>
      <div className='forecasts-container'>
        <ForecastList timeZone={timeZone} forecasts={forecasts} />
      </div>
    </div>
  );
}

