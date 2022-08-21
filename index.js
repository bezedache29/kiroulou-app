/**
 * @format
 */
import { AppRegistry, LogBox } from 'react-native'
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

AppRegistry.registerComponent(appName, () => App)
