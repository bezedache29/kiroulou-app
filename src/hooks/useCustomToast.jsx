import { useToast } from 'react-native-toast-notifications'

const useCustomToast = () => {
  const toast = useToast()

  const toastShow = ({
    title,
    message,
    type = 'toast_success',
    duration = 100,
  }) => {
    toast.show(message, {
      type,
      animationDuration: duration,
      data: {
        title,
      },
    })
  }

  return {
    toastShow,
  }
}

export default useCustomToast
