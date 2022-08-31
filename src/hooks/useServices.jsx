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

  return {
    checkIfAddressExist,
    createAddress,
    getValidUrl,
  }
}

export default useServices
