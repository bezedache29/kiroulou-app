import axios from 'axios'
import { URL_API, URL_SERVER, URL_ADDRESS } from 'react-native-dotenv'
import { useStoreState } from 'easy-peasy'

const useAxios = () => {
  const userStore = useStoreState((state) => state.user)
  const { authToken } = userStore

  /**
   * @description Permet de faire une request POST sur un lien de l'API, sans auth_token
   * @param {string} url
   * @param {object} data
   * @returns
   */
  const axiosPostWithoutToken = async (url, data) => {
    const response = await axios.post(`${URL_API}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
      },
      validateStatus: () => true,
    })

    return response
  }

  /**
   * @description Permet de faire une request GET sur un lien de l'API, sans auth_token
   * @param {string} url
   * @returns
   */
  const axiosGetWithoutToken = async (url) => {
    const response = await axios.get(`${URL_API}/${url}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
      },
      validateStatus: () => true,
    })

    return response
  }

  /**
   * @description POST Request API avec le token Sanctum
   * @param {string} url
   * @param {object} data
   * @returns
   */
  const axiosPostWithToken = async (url, data = {}, token = authToken) => {
    // console.log('authToken', authToken)
    // Cookies sanctum
    await axios.get(`${URL_SERVER}/sanctum/csrf-cookie`)
    // Request Post avec le token
    const response = await axios.post(`${URL_API}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token.type} ${token.token}`,
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
      },
      validateStatus: () => true,
    })

    return response
  }

  const axiosGetWithToken = async (url) => {
    const response = await axios.get(`${URL_API}/${url}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${authToken.type} ${authToken.token}`,
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
      },
      validateStatus: () => true,
    })

    return response
  }

  const axiosPutWithToken = async (url, data = {}, token = authToken) => {
    // console.log('authToken', authToken)
    // Cookies sanctum
    await axios.get(`${URL_SERVER}/sanctum/csrf-cookie`)
    // Request Post avec le token
    const response = await axios.put(`${URL_API}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token.type} ${token.token}`,
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
      },
      validateStatus: () => true,
    })

    return response
  }

  const axiosDeleteWithToken = async (url, data = {}, token = authToken) => {
    // console.log('authToken', authToken)
    // Cookies sanctum
    await axios.get(`${URL_SERVER}/sanctum/csrf-cookie`)
    // Request Post avec le token
    const response = await axios.delete(`${URL_API}/${url}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token.type} ${token.token}`,
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
      },
      data,
      validateStatus: () => true,
    })

    return response
  }

  const axiosSearchAddress = async (value) => {
    const response = await axios.get(`${URL_ADDRESS}${value}`)

    return response
  }

  return {
    axiosPostWithoutToken,
    axiosGetWithoutToken,
    axiosPostWithToken,
    axiosGetWithToken,
    axiosPutWithToken,
    axiosDeleteWithToken,
    axiosSearchAddress,
  }
}

export default useAxios
