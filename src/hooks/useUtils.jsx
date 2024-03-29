const useUtils = () => {
  const month = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ]

  const days = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche',
  ]

  // Permet de formater un date => "28 Juillet 2022"
  const formatDate = (date) => {
    const newDate = `${date.getDate()} ${
      month[date.getMonth()]
    } ${date.getFullYear()}`
    return newDate
  }

  // Convertir une date SQL en une date js => 2022-08-25T17:12:47.000000Z -> 2022-08-25
  const convertDateSQL = (dateSQL) => {
    const date = new Date(dateSQL)
    date.toISOString().substring(0, 10)
    return date
  }

  // Permet de retourner l'index du mois avec le mois ecrit en text - Exemple : Septembre => 8
  const formatMonthText = (monthText) => month.indexOf(monthText)

  const formatCompleteDate = (date) => {
    const newDate = `${days[date.getDay()]} ${date.getDate()} ${
      month[date.getMonth()]
    } ${date.getFullYear()}`
    return newDate
  }

  // Permet de convertir une date en timestamp
  const dateToTimestamp = (dateParams) => {
    let date = dateParams

    if (date === 'today') {
      date = new Date()
      date = Math.floor(date.getTime() / 1000)
    } else {
      date = date.getTime()
    }

    return date
  }

  // Permet de convertir un timestamp en date
  const timestampToDate = (timestamp) => new Date(timestamp)

  const formatTimeFromTimestamp = (timestampParams) => {
    const date = new Date(timestampParams * 1000)
    const hours = date.getHours()
    const minutes = date.getMinutes()

    return `${hours}h${minutes}`
  }

  // Permet de récupérer le jour en français depuis un timestamp
  const getDay = (timestampParams) => {
    const date = new Date(timestampParams * 1000)
    // console.log(date.getDay())
    return days[date.getDay()]
  }

  // Permet de récupérer les mois et année sur un an depuis la date d'aujourd'hui
  // Exemple Août 2022 jusqu'à Juillet 2023
  const getOneYear = () => {
    const dateDay = new Date()
    // const dateDay = new Date('July 20, 69 00:20:18') // Pour test

    const monthYear = []

    for (let i = dateDay.getMonth(); i <= 11; i++) {
      monthYear.push(`${month[i]} ${dateDay.getFullYear()}`)
    }

    for (let j = 0; j < dateDay.getMonth(); j++) {
      monthYear.push(`${month[j]} ${dateDay.getFullYear() + 1}`)
    }

    // console.log('monthYear', monthYear)
    return monthYear
  }

  const formatDateToSql = (date) =>
    new Date(date).toISOString().slice(0, 19).replace('T', ' ')

  const formatDateHike = (dateParams) => {
    const date = new Date(dateParams)
    const newDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

    return newDate
  }

  return {
    formatDate,
    dateToTimestamp,
    timestampToDate,
    formatTimeFromTimestamp,
    getDay,
    formatCompleteDate,
    getOneYear,
    formatMonthText,
    formatDateToSql,
    convertDateSQL,
    formatDateHike,
  }
}

export default useUtils
