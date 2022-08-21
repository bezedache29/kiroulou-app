import RNFetchBlob from 'rn-fetch-blob'
import { URL_API } from 'react-native-dotenv'

import { Image as ImageCompressor } from 'react-native-compressor'

import { useStoreState } from 'easy-peasy'

const useImages = () => {
  const userStore = useStoreState((state) => state.user)
  const { authToken } = userStore

  const sendImageToServer = async (url, data) => {
    const response = await RNFetchBlob.fetch(
      'POST',
      `${URL_API}/${url}`,
      {
        'Content-Type': 'multipart/form-data',
        Authorization: `${authToken.type} ${authToken.token}`,
      },
      [
        {
          name: data.name,
          filename: `file://${data.uri}`,
          type: data.type ? data.type : 'image/jpeg',
          data: RNFetchBlob.wrap(`file://${data.uri}`),
        },
        {
          name: 'title',
          data: data.title,
        },
      ]
    )

    return response
  }

  const compressImage = async (uri) => {
    const result = await ImageCompressor.compress(uri, {
      compressionMethod: 'auto', // Image compressé comme la méthode WhatsApp
    })

    return result
  }

  const checkExtension = (mime) => {
    if (mime === 'image/jpeg' || mime === 'image/png' || mime === 'image/jpg') {
      return true
    }

    return false
  }

  return {
    sendImageToServer,
    compressImage,
    checkExtension,
  }
}

export default useImages
