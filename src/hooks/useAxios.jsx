import axios from 'axios'
import { URL_API } from 'react-native-dotenv'

const useAxios = () => {
  // Permet de faire une request POST sur un lien de l'API, sans auth_token
  const axiosPostWithoutToken = async (url, data) => {
    const response = await axios.post(`${URL_API}/${url}`, data, {
      header: {
        'Content-Type': 'application/json',
      },
      validateStatus: () => true,
    })

    return response
  }

  return {
    axiosPostWithoutToken,
  }
}

export default useAxios
