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

  // Permet de formater un date => "28 Juillet 2022"
  const formatDate = (date) => {
    const newDate = `${date.getDate()} ${
      month[date.getMonth()]
    } ${date.getFullYear()}`
    return newDate
  }

  return {
    formatDate,
  }
}

export default useUtils
