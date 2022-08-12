import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'

const useConnection = () => {
  const navigation = useNavigation()

  /**
   * Permet de savoir s'il y a un item particulier dans le localStorage
   *
   * @param {string} itemName
   * @returns
   */
  const haveItemStorage = async (itemName) => {
    const localStorageItem = await AsyncStorage.getItem(itemName)

    if (localStorageItem && localStorageItem !== null) {
      return localStorageItem
    }

    return false
  }

  /**
   * @callback callbackFunctionSuccess
   * @callback callbackFunctionEchec
   */
  /**
   * Permet de savoir si le user a un auth_token et est donc connecté
   *
   * @param {callbackFunctionSuccess} goToSuccess
   * @param {callbackFunctionEchec} goToEchec
   */
  const haveAuthToken = async (goToSuccess, goToEchec) => {
    // On va chercher le auth_token en local storage
    const authToken = await haveItemStorage('kro_auth_token')

    // S'il existe : On appel la fonction success (exemple : () => navigation.navigate('Success'))
    // S'il n'existe pas: On appel la fonction echec (exemple similaire)
    if (authToken) {
      goToSuccess()
    } else {
      goToEchec()
    }
  }

  /**
   * Permet au user de se deconnecter de l'app et d'etre redirect sur la page login
   */
  const disconnect = async () => {
    await AsyncStorage.removeItem('kro_auth_token')
    navigation.reset({
      index: 0,
      routes: [{ name: 'Splash' }],
    })
  }

  return {
    haveItemStorage,
    haveAuthToken,
    disconnect,
  }
}

export default useConnection
