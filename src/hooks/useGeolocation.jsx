import { PermissionsAndroid } from 'react-native'

export default function useGeolocation() {
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Permission de geolocation',
          message:
            'KiRoulOu a besoins de votre localisation pour utiliser cette fonctionnalité',
          buttonNeutral: 'Demander plus tard',
          buttonNegative: 'Annuler',
          buttonPositive: 'Accepter',
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location')
        return true
      }
      console.log('Location permission denied')
      return false
    } catch (err) {
      console.warn(err)
      return false
    }
  }

  return {
    requestLocationPermission,
  }
}
