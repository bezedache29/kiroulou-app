import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { useTheme } from 'react-native-paper'

import MultipleImagePicker from '@baronha/react-native-multiple-image-picker'
import { useFormik } from 'formik'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  cancelColor,
  darkColor,
  darkPrimaryColor,
  defaultText,
  littleTitle,
  ml10,
  mt10,
  rowCenter,
} from '../../../assets/styles/styles'

import AddHikeLayout from '../../../components/Hikes/AddHikeLayout'
import CustomIconButton from '../../../components/CustomIconButton'
import CustomCarousel from '../../../components/CustomCarousel'
import useImages from '../../../hooks/useImages'
import useAxios from '../../../hooks/useAxios'
import CustomAlert from '../../../components/CustomAlert'

const { width, height } = Dimensions.get('window')
const CARD_HEIGHT = 220
const CARD_WIDTH = width * 0.8

const AddHikeStep3Screen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { sendImageToServer, compressImage, checkExtension } = useImages()
  const { axiosPostWithToken } = useAxios()

  const { dataSteps } = route.params
  const { trips } = dataSteps

  const [flyer, setFlyer] = useState(false)
  const [originalImages, setOriginalImages] = useState([])
  const [images, setImages] = useState([])
  const [showDeleteImages, setShowDeleteImages] = useState(false)

  const animation = new Animated.Value(0)

  const screenEndRef = useRef(null)

  useEffect(() => {
    if (route.params?.hikeEdit) {
      console.log('hikeEdit', route.params.hikeEdit)
      setFlyer(route.params.hikeEdit.flyer)
    }
  }, [route.params?.hikeEdit])

  useEffect(() => {
    console.log('flyer', flyer)
  }, [flyer])

  useEffect(() => {
    console.log('originalImages', originalImages)
    if (originalImages.length > 0) {
      compressImages()
    }
  }, [originalImages])

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      console.log('dataSteps', dataSteps)

      const hikeData = dataSteps

      Reflect.deleteProperty(hikeData, 'trips')

      console.log('data--', hikeData)
      console.log('trips--', trips)

      const hike = await axiosPostWithToken('hikes/vtt', hikeData)

      console.log('hike', hike.data)

      if (hike.status === 201) {
        if (trips && trips.length > 0) {
          // On request la création des parcours
          for (const trip of trips) {
            const res = await axiosPostWithToken(
              `hikes/vtt/${hike.data.hike_vtt_id}/storeTrip`,
              trip
            )

            if (res.status !== 201) {
              // TODO Modal erreur
              console.log('Error Trip')
            }
          }
        }

        // On met le type d'image a upload et l'extension du fichier
        const title = `images-${flyer.split('.').pop()}`
        // On envoie l'image pour stockage
        const isSend = await sendImageToServer(
          `hikes/vtt/${hike.data.hike_vtt_id}/storeImage`,
          {
            name: 'flyer',
            uri: flyer,
            title,
          }
        )

        console.log('isSend', isSend)

        if (isSend.respInfo.status !== 201) {
          // TODO Modal error
          console.log('ERREUR')
        }

        // On check s'il y a des images a upload
        if (images.length > 0) {
          for (const image of images) {
            // Type d'image & extension du fichier
            const title = `image-${image.split('.').pop()}`
            const send = await sendImageToServer(
              `hikes/vtt/${hike.data.hike_vtt_id}/storeImage`,
              {
                name: 'image',
                uri: image,
                title,
              }
            )

            console.log('send', send)
          }
        }

        // TODO Créer un post avec le le nom de la rando et le descriptif
      }
    },
  })

  const compressImages = async () => {
    const img = []
    for (const originalImage of originalImages) {
      img.push(await compressImage(`file://${originalImage.realPath}`))
    }
    setImages(img)
  }

  const createHike = () => {
    if (flyer) {
      // Peut on boucler dans RNFetchBlob pour envoyer le tableau d'images avec ??
      formik.handleSubmit()
    }

    // const dataStep3 = {
    //   flyer: `file://${flyer.realPath}`,
    //   images: imgs,
    // }

    // const data = {
    //   ...dataSteps,
    //   ...dataStep3,
    // }

    // console.log('dataAllSteps', data)
  }

  const deleteImages = () => {
    setOriginalImages([])
    setImages([])
    setShowDeleteImages(false)
  }

  const openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        mediaType: 'image',
        singleSelectedMode: true,
        doneTitle: 'Valider',
        cancelTitle: 'Annuler',
        selectedColor: darkPrimaryColor,
      })
      console.log('response: ', response)

      // On check que ce sont bien des images qui sont upload (jpeg / jpg / png only)
      if (checkExtension(response.mime)) {
        const compress = await compressImage(`file://${response.realPath}`)
        console.log('compress', compress)
        setFlyer(compress)
        // setFlyer(`file://${response.realPath}`)
      }
    } catch (e) {
      console.log(e.code, e.message)
    }
  }

  const openPickerMultiple = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        selectedAssets: originalImages,
        maxSelectedAssets: 10,
        mediaType: 'image',
        singleSelectedMode: false,
        doneTitle: 'Valider',
        cancelTitle: 'Annuler',
        selectedColor: darkPrimaryColor,
      })
      console.log('response: ', response)
      setOriginalImages(response)
    } catch (e) {
      console.log(e.code, e.message)
    }
  }

  return (
    <AddHikeLayout
      label={route.params?.hikeEdit ? 'Modifier une rando' : 'Créer une rando'}
      step={3}
      subTitle="Partagez votre flyer et diverses images / photos en relation avec votre randonnée."
      nextStepCondition={flyer}
      buttonLabel={
        route.params?.hikeEdit ? 'Modifier la rando' : 'Créer la rando'
      }
      buttonPress={createHike}
    >
      {/* <CustomDivider /> */}

      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={screenEndRef}
          onContentSizeChange={() =>
            screenEndRef.current.scrollToEnd({ animated: true })
          }
        >
          <View style={{ flex: 1 }}>
            <View style={[[rowCenter, mt10], { flex: 1 }]}>
              <Text style={[littleTitle, { color: colors.text }]}>
                Ajouter un flyer
              </Text>
              <Text
                style={[
                  defaultText,
                  ml10,
                  { color: colors.text, fontSize: 16 },
                ]}
              >
                (Cliquez sur l'image)
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => openPicker()}
                style={styles.flyerBtn}
              >
                <Image
                  source={
                    !flyer
                      ? require('../../../assets/images/png/default-flyer.png')
                      : {
                          // ici URI du flyer depuis l'api
                          // uri: 'https://www.nafix.fr/tracts/2022_tract/tract_72407.jpg',
                          uri: flyer,
                        }
                  }
                  style={[
                    {
                      borderRadius: !flyer ? 8 : 0,
                    },
                    styles.flyer,
                  ]}
                />
              </TouchableOpacity>

              <View>
                <View style={[rowCenter, mt10]}>
                  <Text style={[littleTitle, { color: colors.text }]}>
                    Ajouter des images / photos
                  </Text>

                  {images.length > 0 && (
                    <TouchableOpacity
                      style={styles.iconPlus}
                      onPress={() => setShowDeleteImages(true)}
                    >
                      <MaterialCommunityIcons
                        name="trash-can"
                        size={30}
                        color={cancelColor}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                {images.length === 0 ? (
                  <CustomIconButton
                    onPress={() => openPickerMultiple()}
                    text="Ajouter des images / photos"
                    size="100%"
                  />
                ) : (
                  <View style={{ flex: 1, marginBottom: 80 }}>
                    <CustomCarousel
                      snapToInterval={CARD_WIDTH}
                      animation={animation}
                    >
                      {images.map((image, index) => (
                        <TouchableOpacity
                          onPress={() => openPickerMultiple()}
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          style={[
                            styles.card,
                            { backgroundColor: colors.background },
                          ]}
                        >
                          <ImageBackground
                            source={{
                              uri: image,
                            }}
                            style={{ width: '100%' }}
                            resizeMode="cover"
                          />
                        </TouchableOpacity>
                      ))}
                    </CustomCarousel>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <CustomAlert
        showAlert={showDeleteImages}
        title="Attention !"
        message="Etes vous sur de vouloir supprimer les images ?"
        onDismiss={() => setShowDeleteImages(false)}
        onCancelPressed={() => setShowDeleteImages(false)}
        onConfirmPressed={() => deleteImages()}
      />
    </AddHikeLayout>
  )
}

export default AddHikeStep3Screen

const styles = StyleSheet.create({
  flyerBtn: {
    width: width / 1.8,
    height: height / 2.2,
    alignSelf: 'center',
    marginTop: 20,
  },
  flyer: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  iconPlus: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    elevation: 5,
    borderRadius: 10,
    margin: 10,
    shadowColor: darkColor,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH - 20,
    overflow: 'hidden',
  },
})
