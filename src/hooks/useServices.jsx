import {
  athleticColor,
  beginnerColor,
  darkPrimaryColor,
  sportyColor,
} from '../assets/styles/styles'
import useAxios from './useAxios'

const useServices = () => {
  const { axiosPostWithToken } = useAxios()

  const checkIfAddressExist = async (address) => {
    const response = await axiosPostWithToken(
      'addresses/isAlreadyExist',
      address
    )
    return response
  }

  const createAddress = async (address) => {
    const response = await axiosPostWithToken('addresses/create', address)
    return response
  }

  const getValidUrl = (url = '') => {
    let newUrl = window.decodeURIComponent(url)
    newUrl = newUrl.trim().replace(/\s/g, '')

    if (/^(:\/\/)/.test(newUrl)) {
      return `http${newUrl}`
    }
    if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
      return `http://${newUrl}`
    }

    return newUrl
  }

  const colorDifficulty = (value) => {
    switch (value) {
      case '1':
        return darkPrimaryColor
      case '2':
        return beginnerColor
      case '3':
        return athleticColor
      case '4':
        return sportyColor

      default:
        return darkPrimaryColor
    }
  }

  const getDistance = (zoom) => {
    switch (zoom) {
      case zoom <= 8:
        return 50
      case 9:
        return 40
      case 10:
        return 30
      case 11:
        return 20
      case 12:
        return 12
      case 13:
        return 5
      case 14:
        return 3
      case zoom >= 15:
        return 1

      default:
        return 12
    }
  }

  return {
    checkIfAddressExist,
    createAddress,
    getValidUrl,
    colorDifficulty,
    getDistance,
  }
}

export default useServices
