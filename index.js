/**
 * @format
 */
import { AppRegistry, LogBox, Platform } from 'react-native'
import PushNotification from 'react-native-push-notification'
import App from './App'
import { name as appName } from './app.json'
import 'react-native-gesture-handler'

// Enleve les messages warning quand je passe des dates dans les params de navigation
// Utilisé pour le dev. Les dates seront placées dans le store en fin de dev
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'new NativeEventEmitter',
])

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

PushNotification.configure({
  largeIcon: 'ic_launcher',
  smallIcon: 'ic_notification',
  onNotification(notification) {
    console.log('NOTIFICATION:', notification)

    // if (notification.userinteraction) {
    //   navigation.navigate("Details")
    // }
  },
  requestPermissions: Platform.OS === 'ios',
  //  requestPermissions: true,
})

AppRegistry.registerComponent(appName, () => App)
