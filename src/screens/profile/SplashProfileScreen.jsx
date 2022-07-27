// import { CommonActions } from '@react-navigation/native'
import { useEffect } from 'react'
import { BackHandler } from 'react-native'

const SplashProfileScreen = ({ route, navigation }) => {
  useEffect(() => {
    switch (route.params.params) {
      case 'my-profile':
        navigation.navigate('UserProfile')
        break
      case 'my-club-profile':
        navigation.navigate('ClubProfile')
        break

      default:
        navigation.reset({
          index: 0,
          routes: [{ name: 'Drawer' }],
        })
    }
  }, [])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  const backAction = () => {
    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: 'Splash' }],
    //   })
    // )
    navigation.reset({
      index: 0,
      routes: [{ name: 'Splash' }],
    })
  }

  return null
}

export default SplashProfileScreen
