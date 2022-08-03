/**
 * Hook servant à la météo
 */

const useWeather = () => {
  // Permet de remplacer l'image de la météo de l'api par une custom
  const weatherIcon = (icon) => {
    switch (icon) {
      case '01d':
      case '01n':
        return require('../assets/images/png/weather-icons/01d.gif')
      case '02d':
      case '02n':
        return require('../assets/images/png/weather-icons/02d.gif')
      case '03d':
      case '03n':
        return require('../assets/images/png/weather-icons/03d.png')
      case '04d':
      case '04n':
        return require('../assets/images/png/weather-icons/04d.png')
      case '09d':
      case '09n':
        return require('../assets/images/png/weather-icons/09d.gif')
      case '10d':
      case '10n':
        return require('../assets/images/png/weather-icons/10d.gif')
      case '11d':
      case '11n':
        return require('../assets/images/png/weather-icons/11d.gif')
      case '13d':
      case '13n':
        return require('../assets/images/png/weather-icons/13d.gif')
      case '50d':
      case '50n':
        return require('../assets/images/png/weather-icons/50d.gif')
      case 'wind':
        return require('../assets/images/png/weather-icons/wind.png')
      case 'temp':
        return require('../assets/images/png/weather-icons/temp.png')
      case 'sunrise':
        return require('../assets/images/png/weather-icons/sunrise.png')

      default:
        return require('../assets/images/png/weather-icons/01d.gif')
    }
  }

  // Permet de récupérer la direction d'où vient le vent (on récupère le degree depuis l'api)
  const getDirection = (degree) => {
    if (degree >= 11.25 && degree < 33.75) {
      return 'Nord Nord Est'
    }
    if (degree >= 33.75 && degree < 56.25) {
      return 'Nord Est'
    }
    if (degree >= 56.25 && degree < 78.75) {
      return 'Est Nord Est'
    }
    if (degree >= 78.75 && degree < 101.25) {
      return 'Est'
    }
    if (degree >= 101.25 && degree < 123.75) {
      return 'Est Sud Est'
    }
    if (degree >= 123.75 && degree < 146.25) {
      return 'Sud Est'
    }
    if (degree >= 146.25 && degree < 168.75) {
      return 'Sud Sud Est'
    }
    if (degree >= 168.75 && degree < 191.25) {
      return 'Sud'
    }
    if (degree >= 191.25 && degree < 213.75) {
      return 'Sud Sud Ouest'
    }
    if (degree >= 213.75 && degree < 236.25) {
      return 'Sud Ouest'
    }
    if (degree >= 236.25 && degree < 258.75) {
      return 'Ouest Sud Ouest'
    }
    if (degree >= 258.75 && degree < 281.25) {
      return 'Ouest'
    }
    if (degree >= 281.25 && degree < 303.75) {
      return 'Ouest Nord Ouest'
    }
    if (degree >= 303.75 && degree < 326.25) {
      return 'Nord Ouest'
    }
    if (degree >= 326.25 && degree < 348.75) {
      return 'Nord Nord Ouest'
    }
    return 'Nord'
  }

  // Converti les metres par secondes en kilomètre par heure
  const formatWind = (wind) => wind * 3.6

  return {
    weatherIcon,
    getDirection,
    formatWind,
  }
}

export default useWeather
