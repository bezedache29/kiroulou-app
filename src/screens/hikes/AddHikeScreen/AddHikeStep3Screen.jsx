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

import { useStoreState } from 'easy-peasy'

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
import useServices from '../../../hooks/useServices'
import useCustomToast from '../../../hooks/useCustomToast'
import CustomLoader from '../../../components/CustomLoader'

const { width, height } = Dimensions.get('window')
const CARD_HEIGHT = 220
const CARD_WIDTH = width * 0.8

const AddHikeStep3Screen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { sendImageToServer, compressImage, checkExtension } = useImages()
  const { axiosPostWithToken, axiosGetWithToken } = useAxios()
  const { checkIfAddressExist, createAddress } = useServices()
  const { toastShow } = useCustomToast()

  const { dataSteps } = route.params
  const { trips, address } = dataSteps

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const [flyer, setFlyer] = useState(false)
  const [originalImages, setOriginalImages] = useState([])
  const [images, setImages] = useState([])
  const [showDeleteImages, setShowDeleteImages] = useState(false)
  const [loading, setLoading] = useState(false)

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
      setLoading(true)
      console.log('dataSteps', dataSteps)

      let hikeData = dataSteps
      let addressToDBError = false
      let hikeError = false
      let flyerError = false
      let imagesError = false
      let tripError = false
      let postError = false

      Reflect.deleteProperty(hikeData, 'trips')
      Reflect.deleteProperty(hikeData, 'address')

      // console.log('data--', hikeData)
      // console.log('trips--', trips)
      // console.log('address--', address)

      // 1 - Address
      const isExist = await checkIfAddressExist(address)

      if (isExist.status === 404) {
        const addressCreated = await createAddress(address)

        if (addressCreated.status === 201) {
          hikeData = {
            ...hikeData,
            address_id: addressCreated.data.address.id,
          }
        } else {
          toastShow({
            title: 'Action impossible !',
            message: `Il y a une erreur au niveau de l'adresse (${isExist.status})`,
            type: 'toast_danger',
          })

          addressToDBError = true
          setLoading(false)
        }
      } else if (isExist.status === 201) {
        hikeData = {
          ...hikeData,
          address_id: isExist.data.isAlreadyExist.id,
        }
        addressToDBError = false
      } else {
        toastShow({
          title: 'Action impossible !',
          message: `Erreur au niveau de l'addresse (${isExist.status})`,
          type: 'toast_danger',
        })

        addressToDBError = true
        setLoading(false)
      }

      // 2 - Hike
      if (!addressToDBError) {
        hikeData = {
          ...hikeData,
          club_id: user.club_id,
        }

        const hike = await axiosPostWithToken('hikes/vtt', hikeData)

        if (hike.status !== 201) {
          toastShow({
            title: 'Action impossible !',
            message: `Impossible d'ajouter une randonée vtt pour le moment (${hike.status})`,
            type: 'toast_danger',
          })

          hikeError = true
        } else {
          // 3 - Flyer
          // On met le type d'image a upload et l'extension du fichier
          const title = `flyer|${flyer.split('.').pop()}`
          // On envoie l'image pour stockage
          const isSend = await sendImageToServer(
            `hikes/vtt/${hike.data.hike_vtt_id}/storeImage`,
            {
              name: 'flyer',
              uri: flyer,
              title,
            }
          )

          if (isSend.respInfo.status !== 201) {
            toastShow({
              title: 'Action impossible !',
              message: `Il y a une erreur avec votre flyer (${isSend.respInfo.status})`,
              type: 'toast_danger',
            })

            flyerError = true
          }

          if (!flyerError) {
            // 4 - Images
            // On check s'il y a des images a upload
            if (images.length > 0) {
              for (const image of images) {
                if (!imagesError) {
                  // Type d'image & extension du fichier
                  const title = `image|${image.split('.').pop()}`
                  const send = await sendImageToServer(
                    `hikes/vtt/${hike.data.hike_vtt_id}/storeImage`,
                    {
                      name: 'image',
                      uri: image,
                      title,
                    }
                  )

                  if (send.respInfo.status !== 201) {
                    imagesError = true

                    toastShow({
                      title: "Erreur d'images",
                      message: `Il y a une erreur avec une de vos images (${send.respInfo.status})`,
                      type: 'toast_danger',
                    })
                  }
                }
              }
            }

            // Parcours
            // eslint-disable-next-line no-lonely-if
            if (trips && trips.length > 0) {
              for (const trip of trips) {
                if (!tripError) {
                  const res = await axiosPostWithToken(
                    `hikes/vtt/${hike.data.hike_vtt_id}/storeTrip`,
                    trip
                  )

                  if (res.status !== 201) {
                    tripError = true
                    toastShow({
                      title: 'Erreur sur un parcours !',
                      message: `Un parcours n'a pas pu être ecréé (${res.status})`,
                      type: 'toast_danger',
                    })
                  }
                }
              }
            }
          }
        }

        if (!hikeError && !flyerError) {
          // Créer le club post
          // On récupère la rando vtt depuis le server
          const hikeVtt = await axiosGetWithToken(
            `hikes/vtt/${hike.data.hike_vtt_id}`
          )

          if (hikeVtt.status === 200) {
            const data = {
              title: hikeVtt.data.name,
              description: hikeVtt.data.description,
              hike_vtt_id: hikeVtt.data.id,
            }
            const response = await axiosPostWithToken(
              `clubs/${user.club_id}/posts`,
              data
            )

            if (response.status !== 201) {
              postError = true
              toastShow({
                title: 'Erreur article',
                message: `Votre article n'a pas pu être créé (${response.status})`,
                type: 'toast_danger',
              })
            }
          }

          if (!imagesError && !tripError && !postError) {
            if (!postError && !tripError && !imagesError) {
              toastShow({
                title: 'Randonnée créé !',
                message:
                  'Votre randonnée vtt a bien été créé et partagé auprès de la communauté :)',
              })
            } else {
              toastShow({
                title: 'Randonnée créé !',
                message:
                  'Votre randonnée vtt a bien été créé et partagé auprès de la communauté, sans toutes les options',
              })
            }
            navigation.navigate('Hike', { hikeId: hikeVtt.data.id })
          }
        }
      }
      setLoading(false)
    },
  })

  const compressImages = async () => {
    const img = []
    for (const originalImage of originalImages) {
      img.push(await compressImage(`file://${originalImage.realPath}`))
    }
    setImages(img)
  }

  // Le Flyer est obligatoire pour créer une rando.
  // On check si y a un flyer
  const createHike = () => {
    if (flyer) {
      formik.handleSubmit()
    } else {
      toastShow({
        title: 'Flyer obligatoire !',
        message: 'Le flyer est obligatoire avant de créer la rando',
        type: 'toast_danger',
      })
    }
  }

  const deleteImages = () => {
    setOriginalImages([])
    setImages([])
    setShowDeleteImages(false)
  }

  // TODO Refacto
  const openPicker = async () => {
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
        setFlyer(compress)
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

  if (loading) {
    return <CustomLoader />
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
                    isText
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
