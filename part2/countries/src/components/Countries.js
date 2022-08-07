const Country = ({ country, showCountryInfo }) => {
  return (
    <>
      {country.name.common} <button onClick={() => showCountryInfo(country)}>show</button>
      <br />
    </>
  )
}

const Countries = ({ countries, filter, showCountryInfo }) => {
  if (filter.length === 0) {
    return (<>enter filter</>)
  }
  if (countries.length > 10) {
    return (
      <>Too many matches, specify another filter</>
    )
  }
  if (countries.length === 1) {
    return (<></>)
  }

  if (filter) {
    return (
      <>
        {countries.map(country =>
          <Country key={country.name.common} country={country} showCountryInfo={showCountryInfo } />
        )}
      </>)
  }
}

export default Countries