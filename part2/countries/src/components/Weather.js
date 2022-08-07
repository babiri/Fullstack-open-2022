const Weather = ({ weather, shownCountry }) => {

  const icon = (id) => {
    let imageCode = ''
    if (200 <= id) {
      if ( id < 300 ) {
        imageCode = '11d';
      } else if (id < 400) {
        imageCode = '09d';
      } else if (id <= 504) {
        imageCode = '10d';
      } else if (id === 511) {
        imageCode = '13d';
      } else if (id < 600) {
        imageCode = '09d';
      } else if (id < 700) {
        imageCode = '13d';
      } else if (id < 800) {
        imageCode = '50d';
      } else if (id === 800) {
        imageCode = '01d';
      } else if (id === 801) {
        imageCode = '02d';
      } else if (id === 802) {
        imageCode = '03d';
      } else if (id === 803) {
        imageCode = '04d';
      } else if (id === 804) {
        imageCode = '04d';
      }
    } else {
      imageCode = 'notAvailable';
    }
    return imageCode
  }

  if (weather === null) {
    return null
  } else {
    const temperature = weather.main.temp
    const wind = weather.wind.speed
    const baseImgUrl = 'http://openweathermap.org/img/wn/'
    const id = weather.weather[0].id
    const iconCode = icon(id)
    const imageUrl = baseImgUrl.concat(iconCode, '@2x.png')
    if (shownCountry) {
      return (
        <>
          <h1>wheather in {shownCountry.capital}</h1>
          <p>temperature {temperature} Celsius </p>
          <img src={imageUrl} alt="weatherIcon" />
          <p>wind {wind} m/S</p>
        </>
      )
    }

  }
}

export default Weather