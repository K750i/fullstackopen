import axios from "axios"
import { useEffect, useState } from "react"
import apiService from "../services/apiService"

export default function Country({ country }) {
  const [weatherInfo, setWeatherInfo] = useState({})
  const name = country.name.common
  const capital = country.capital[0]
  const population = new Intl.NumberFormat().format(country.population)
  const currencySymbol = Object.values(country.currencies)[0].symbol
  const currencyName = Object.values(country.currencies)[0].name
  const languages = Object.values(country.languages)
  const flagURL = country.flags.svg

  useEffect(() => {
    apiService
      .getWeather(capital)
      .then(data => {
        setWeatherInfo({
          tempK: data.main.temp,
          iconSrc: apiService.getWeatherIcon(data.weather[0].icon),
          condition: data.weather[0].description,
        })
      })
  }, [])

  return (
    <div>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <p>Currency: {currencySymbol} ({currencyName})</p>
      <h3>Languages:</h3>
      <ul>
        {
          languages.map(language => <li key={language}>{language}</li>)
        }
      </ul>
      <p>
        <img src={flagURL} width="200px" />
      </p>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {(weatherInfo.tempK - 273.15).toFixed(2)}&deg;C</p>
      <figure>
        <img src={weatherInfo.iconSrc} />
        <figcaption>{weatherInfo.condition}</figcaption>
      </figure>
    </div>
  )
}