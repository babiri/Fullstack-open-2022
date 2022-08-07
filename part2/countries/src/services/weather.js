import axios from "axios";
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const api_key = process.env.REACT_APP_API_KEY

const getCurrentWeather = (city) => {
  const latitude = `lat=${city.lat}`
  const longitude = `lon=${city.lon}`
  const appId = `appid=${api_key}`
  const units = 'units=metric'
  const requestUrl = baseUrl.concat('?', latitude, '&', longitude, '&', units, '&', appId)
  const request = axios.get(requestUrl)
  return request.then(response => response.data)
}

export default {getCurrentWeather}