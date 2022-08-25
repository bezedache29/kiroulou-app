import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { useStoreActions } from 'easy-peasy'

import { AppContext } from '../context/Context'
import useConnection from '../hooks/useConnection'
import useAxios from '../hooks/useAxios'

const SplashScreen = ({ navigation }) => {
  const { toggleTheme } = useContext(AppContext)

  const { haveItemStorage } = useConnection()
  const { axiosPostWithToken } = useAxios()

  const userActions = useStoreActions((actions) => actions.user)

  const [isFirstLaunch, setIsFirstLaunch] = useState(null)

  /**
   * Permet de check si le user a dejà ouvert l'application et donc de skip ou non le Onboarding
   */
  const checkIsFirstLauch = async () => {
    // On va chercher kro_alreadyLaunched en local storage
    const alreadyLaunched = await haveItemStorage('kro_alreadyLaunched')

    // S'il n'existe pas on redirect vers Onboarding
    if (alreadyLaunched) {
      setIsFirstLaunch(false)

      const firstLaunched = await haveItemStorage('kro_firstLaunched')

      if (firstLaunched) {
        await AsyncStorage.removeItem('kro_firstLaunched')
        navigation.reset({
          index: 0,
          routes: [{ name: 'Register' }],
        })
      } else {
        // Est-ce que le user a un auth_token
        const authToken = await haveItemStorage('kro_auth_token')

        // Si le user a un auth_token
        if (authToken) {
          // Permet de supprimer des tentatives incomplete de paiements (evite de ne plus avoir le status active premium)
          await axiosPostWithToken(
            'subscriptions/deleteFails',
            {},
            JSON.parse(authToken)
          )
          // On recherche le user depuis l'api
          const response = await axiosPostWithToken(
            'me',
            {},
            JSON.parse(authToken)
          )

          console.log('me', response.data)

          // On met le user et son authToken dans le store
          if (response.status === 200) {
            userActions.loadUser(response.data)
            userActions.loadAuthToken(JSON.parse(authToken))
            // Redirect sur la HomeScreen piloté par Drawer
            navigation.reset({
              index: 0,
              routes: [{ name: 'Drawer' }],
            })
          } else if (response.status === 401) {
            // Si pas autorisé par sanctum, redirection vers le login
            await AsyncStorage.removeItem('kro_auth_token')
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })
          } else {
            // TODO Modal erreur
            alert(`erreur ${response.status}`)
          }
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        }
      }
    } else {
      setIsFirstLaunch(true)
      navigation.navigate('Onboarding')
    }
  }

  /**
   * Au chargement du screen
   */
  useEffect(() => {
    checkIsFirstLauch()

    // AsyncStorage.removeItem('kro_auth_token')

    AsyncStorage.getItem('darkmode').then((value) => {
      if (value) {
        toggleTheme()
      }
    })
  }, [])

  if (isFirstLaunch == null) {
    // Ici sera le loader Lottie
    return null
  }

  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  )
}

export default SplashScreen
