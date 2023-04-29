import axios from "axios"

const countriesURL = 'https://restcountries.com/v3.1/all'
const geoCodingURL = 'http://api.openweathermap.org/geo/1.0/direct'
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather'
const weatherIconURL = 'https://openweathermap.org/img/wn/'

function getAllCountries() {
  return axios
    .get(countriesURL)
    .then(response => response.data)
}

function getWeather(city) {
  const geoUrl = new URL(geoCodingURL)

  geoUrl.searchParams.append('q', city)
  geoUrl.searchParams.append('limit', '5')
  geoUrl.searchParams.append('appid', import.meta.env.VITE_API_KEY)

  return axios
    .get(geoUrl)
    .then(response => {
      const latitude = response.data[0].lat
      const longitude = response.data[0].lon
      const url = new URL(weatherURL)

      url.searchParams.append('lat', latitude)
      url.searchParams.append('lon', longitude)
      url.searchParams.append('appid', import.meta.env.VITE_API_KEY)

      return axios.get(url)
    })
    .then(response => response.data)
}

function getWeatherIcon(code) {
  return `${weatherIconURL}${code}@2x.png`
}

export default {
  getAllCountries,
  getWeather,
  getWeatherIcon,
}