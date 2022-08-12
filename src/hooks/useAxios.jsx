import axios from 'axios'
import { URL_API, URL_SERVER } from 'react-native-dotenv'

const useAxios = () => {
  /**
   * @description Permet de faire une request POST sur un lien de l'API, sans auth_token
   * @param {string} url
   * @param {object} data
   * @returns
   */
  const axiosPostWithoutToken = async (url, data) => {
    const response = await axios.post(`${URL_API}/${url}`, data, {
      header: {
        'Content-Type': 'application/json',
      },
      validateStatus: () => true,
    })

    return response
  }

  /**
   * @description POST Request API avec le token Sanctum
   * @param {string} url
   * @param {object} authToken
   * @param {object} data
   * @returns
   */
  const axiosPostWithToken = async (url, authToken, data = {}) => {
    // Cookies sanctum
    await axios.get(`${URL_SERVER}/sanctum/csrf-cookie`)
    // Request Post avec le token
    const response = await axios.post(`${URL_API}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${authToken.type} ${authToken.token}`,
      },
      validateStatus: () => true,
    })

    return response
  }

  return {
    axiosPostWithoutToken,
    axiosPostWithToken,
  }
}

export default useAxios
