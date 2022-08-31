import MultipleImagePicker from '@baronha/react-native-multiple-image-picker'
import { darkPrimaryColor } from '../assets/styles/styles'
import useImages from './useImages'

const usePicker = () => {
  const { compressImage, checkExtension } = useImages()

  const openImagePicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        mediaType: 'image',
        singleSelectedMode: true,
        doneTitle: 'Valider',
        cancelTitle: 'Annuler',
        selectedColor: darkPrimaryColor,
      })

      // On check que ce sont bien des images qui sont upload (jpeg / jpg / png only)
      if (checkExtension(response.mime)) {
        const compress = await compressImage(`file://${response.realPath}`)
        return compress
      }
      return null
    } catch (e) {
      console.log(e.code, e.message)
      return null
    }
  }

  return {
    openImagePicker,
  }
}

export default usePicker
