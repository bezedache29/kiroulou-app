import PushNotification, { Importance } from 'react-native-push-notification'
import { darkPrimaryColor } from '../assets/styles/styles'

export default function useNotifications() {
  const createChannels = (
    channelId = 'channel-id',
    channelName = 'My channel',
    channelDescription = 'A channel to categorise your notifications'
  ) => {
    PushNotification.createChannel(
      {
        channelId, // (required)
        channelName, // (required)
        channelDescription, // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    )
  }

  // Notification qui se déclenchera dans 5 jours et meme appli eteinte
  const scheduleNotif = ({ id }) => {
    // Supprime l'ancienne notification programmé
    PushNotification.cancelLocalNotification({ id })

    // Créé une nouvelle notification programmé
    PushNotification.localNotificationSchedule({
      channelId: 'channel-id',
      title: 'Popoooop ! 🚴‍♂️',
      message: 'Tu roules ce week-end ? Viens voir les nouvelles randos 🤙',
      playSound: true,
      soundName: 'default',
      color: darkPrimaryColor,
      // 60 * 60 * 24 * 5 = 5 jours
      date: new Date(Date.now() + 60 * 60 * 24 * 5 * 1000), // Date a laquel la notif ce trigger
      allowWhileIdle: true, // Permet de lancer la notification, meme si l'app est éteinte
      id,
    })
  }

  return {
    createChannels,
    scheduleNotif,
  }
}
