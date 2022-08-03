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

  const getDay = (timestampParams) => {
    const date = new Date(timestampParams * 1000)
    console.log(date.getDay())
    return days[date.getDay()]
  }

  return {
    formatDate,
    dateToTimestamp,
    timestampToDate,
    formatTimeFromTimestamp,
    getDay,
  }
}

export default useUtils
