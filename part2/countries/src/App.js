import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country, showCountryInfo }) => {
  return (
    <>
      {country.name.common} <button onClick={showCountryInfo}>show</button>
      <br />
    </>
  )
}

const CountryInfo = ({ country, showInfo }) => {
  if (showInfo) {
    const countryLanguages = Object.values(country.languages)
    return (
      <>
        <h2>{ country.name.common }</h2>
        capital {country.capital}
        <br />
        area {country.area}
        <br />
        <br />
        <h2>languages:</h2>
        <ul>
          {countryLanguages.map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags['png']} alt={country.name.common} />
      </>
    )
  }
}

const Countries = ({ countries, filter, showCountryInfo, shownCountry }) => {
  const filteredCountries =
    countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  const isEmpty = Object.keys(shownCountry).length === 0
  const showInfo = isEmpty ? false : true
  if (filter.length === 0) {
    return (<>enter filter</>)
  }
  if (filteredCountries.length > 10) {
    return (
      <>Too many matches, specify another filter</>
    )
  }
  if (filteredCountries.length === 1) {
    return (
      <CountryInfo country={countries[0]} showInfo={true} />
    )
  }

  if (filter) {
    return (
      <>
        {countries.map(country =>
          <Country key={country.name.common} country={country} showCountryInfo={() => showCountryInfo(country) } />
        )}
        <CountryInfo country={shownCountry} showInfo={showInfo} />
      </>)
  }
}

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <>
      find countries: <input value={filter} onChange={handleFilterChange} />
    </>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [shownCountry, setShownCountry] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = filter
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : countries

  const showCountryInfo = (country) => {
    setShownCountry(country)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setShownCountry({})
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <br />
      <Countries countries={countriesToShow} filter={filter} showCountryInfo={showCountryInfo} shownCountry={shownCountry}/>
    </div>
  );
}

export default App;
