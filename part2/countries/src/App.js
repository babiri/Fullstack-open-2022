import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country, handleShow }) => {
  return (
    <>
      {country.name.common} <button onClkick={ handleShow }>show</button>
      <br />
    </>
  )
}

const CountryInfo = ({ country }) => {
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
        {countryLanguages.map(language => <li>{language}</li>)}
      </ul>
      <img src={country.flags['png']} alt={country.name.common} />
    </>
  )
}

const Countries = ({ countries, filter }) => {
  const filteredCountries =
    countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

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
      <CountryInfo country={countries[0]} />
    )
  }

    if (filter)
      return (
        <>
          {countries.map(country =>
            <Country key={country.name.common} country={country} />
          )}
        </>)
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

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleShow = (event) => {
    setShownCountry(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <br />
      <Countries countries={countriesToShow} filter={filter} handleShow={handleShow} />
    </div>
  );
}

export default App;
