const CountryInfo = ({ country }) => {
  if (country === null) {
    return null 
  } else {
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

export default CountryInfo