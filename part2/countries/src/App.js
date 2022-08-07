import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import CountryInfo from './components/CountryInfo'
import Filter from './components/Filter'
import Weather from './components/Weather'
import countriesService from './services/countries'
import weatherService from './services/weather'


function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [shownCountry, setShownCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const filteredCountries =
    countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  const countriesToShow = filter
    ? filteredCountries
    : countries;

  const capitalLocation = (country) => {
    const shownCapital = country.capitalInfo.latlng
    const city = {
      lat: shownCapital[0],
      lon: shownCapital[1],
    }
    return city
  }

  const shownCountryWeather = (country) => {
    const city = capitalLocation(country)
    weatherService
      .getCurrentWeather(city)
      .then(weather => {
        setWeather(weather)
      })
  }

  const showCountryInfo = (country) => {
    setShownCountry(country)
    shownCountryWeather(country)
  }

  const handleFilterChange = (event) => {
    const value = event.target.value
    setFilter(value)
    const filteredCountries =
      countries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))
    if (filteredCountries.length === 1) {
      setShownCountry(filteredCountries[0])
      shownCountryWeather(filteredCountries[0])
    } else {
      setShownCountry(null)
      setWeather(null)
    }
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <br />
      <Countries countries={countriesToShow} filter={filter} showCountryInfo={showCountryInfo} shownCountry={shownCountry} weather={weather} />
      <CountryInfo country={shownCountry} />
      <Weather weather={weather} shownCountry={shownCountry} />
    </div>
  );
}

export default App;
