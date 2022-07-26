import { useEffect } from 'react'

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
          routes: [{ name: 'Splash' }],
        })
    }
  }, [])

  return null
}

export default SplashProfileScreen
