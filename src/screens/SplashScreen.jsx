import React, { useContext, useEffect, useState } from 'react'

import Lottie from 'lottie-react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { useStoreActions } from 'easy-peasy'

import { Alert } from 'react-native'
import { AppContext } from '../context/Context'
import useConnection from '../hooks/useConnection'
import useAxios from '../hooks/useAxios'
import useNotifications from '../hooks/useNotifications'

const SplashScreen = ({ navigation }) => {
  const { toggleTheme } = useContext(AppContext)

  const { haveItemStorage } = useConnection()
  const { axiosPostWithToken, axiosPutWithToken } = useAxios()
  const { scheduleNotif, createChannels } = useNotifications()

  const userActions = useStoreActions((actions) => actions.user)

  const [isFirstLaunch, setIsFirstLaunch] = useState(null)
  const [loader, setLoader] = useState(true)

  // Création chanels pour localnotification
  useEffect(() => {
    createChannels()
  }, [])

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

          // Met à jour la dernière date de connexion du user
          await axiosPutWithToken('lastConnexion', {}, JSON.parse(authToken))

          // On recherche le user depuis l'api
          const response = await axiosPostWithToken(
            'me',
            {},
            JSON.parse(authToken)
          )

          console.log('me', response.data)

          // On met le user et son authToken dans le store
          if (response.status === 200) {
            scheduleNotif({ id: response.data.id }) // Notification dans 5 jours
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
            Alert.alert(
              "L'application n'a pas pu démarrer",
              "Relancez l'application, si l'erreur est persistante, contacter le support :\n\nbezedache29@gmail.com",
              [{ text: 'Relancer', onPress: () => start() }]
            )
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

    setLoader(false)
  }

  /**
   * Au chargement du screen
   */
  useEffect(() => {
    start()
  }, [])

  const start = () => {
    setLoader(true)
    // AsyncStorage.removeItem('kro_auth_token')
    AsyncStorage.getItem('darkmode').then((value) => {
      if (value) {
        toggleTheme()
      }
    })

    const timer = setTimeout(() => {
      checkIsFirstLauch()
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }

  if (isFirstLaunch == null || loader) {
    // Ici sera le loader Lottie
    // return null
    return (
      <Lottie
        source={require('../assets/lottie/loader-splash.json')}
        autoPlay
      />
    )
  }

  return (
    // <Lottie source={require('../assets/lottie/10812-cycle.json')} autoPlay />
    null
  )
}

export default SplashScreen
