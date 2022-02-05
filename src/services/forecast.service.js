import axios from 'axios'
import {storageService} from './async-storage.service'
const API_KEY = 'zGqdiS2lnsdCFGEAQKwdNtKAau45teh8'

export const forecastService = {
    query,
} 


async function _checkStorage(searchedCity) {
    const cities = await storageService.query('cities')
    const res = cities.find((city) => city.name === searchedCity)
    return res
}


const getCityKey = async (city) => {
    const {data} = await axios.get(`http://dataservice.accuweather.com/locations/v1/search?apikey=${API_KEY}&q=${city}`)
    const cityObj = {
        key: data[0].Key,
        name: data[0].LocalizedName,
        timeZone: data[0].TimeZone.Name
    }
    return cityObj
}


async function query(searchedCity) {
    let cityObjStorage = await _checkStorage(searchedCity)
    if (!cityObjStorage) {
        const city = await getCityKey(searchedCity)
        const { data } = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city.key}?apikey=${API_KEY}&metric=true`)
        const cityObj = {
            ...city,
            dailyForecasts: data.DailyForecasts,
            addedAt: Date.now(),
            headline: data.Headline.Text
        }
        await storageService.post('cities', cityObj)
        return cityObj
    }
    return cityObjStorage
}