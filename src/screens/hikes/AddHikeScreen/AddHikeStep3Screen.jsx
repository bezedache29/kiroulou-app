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

import Lottie from 'lottie-react-native'

import { URL_SERVER } from 'react-native-dotenv'

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
  mt20,
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
import usePicker from '../../../hooks/usePicker'

const { width, height } = Dimensions.get('window')
const CARD_HEIGHT = 220
const CARD_WIDTH = width * 0.8

const AddHikeStep3Screen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { sendImageToServer, compressImage } = useImages()
  const {
    axiosPostWithToken,
    axiosGetWithToken,
    axiosPutWithToken,
    axiosDeleteWithToken,
  } = useAxios()
  const { checkIfAddressExist, createAddress } = useServices()
  const { toastShow } = useCustomToast()
  const { openImagePicker } = usePicker()

  const { dataSteps } = route.params
  const { trips, address } = dataSteps

  // console.log('dataSteps on 3', dataSteps)

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const [hikeEdit, setHikeEdit] = useState(false)
  const [flyer, setFlyer] = useState(false)
  const [oldFlyer, setOldFlyer] = useState(false)
  const [originalImages, setOriginalImages] = useState([])
  const [images, setImages] = useState([])
  const [showDeleteImages, setShowDeleteImages] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imagesEditHike, setImagesEditHike] = useState(false)
  const [loader, setLoader] = useState(false)
  const [showDeleteImagesEditHike, setShowDeleteImagesEditHike] =
    useState(false)

  const animation = new Animated.Value(0)

  const screenEndRef = useRef(null)

  useEffect(() => {
    if (route.params?.hikeEdit) {
      // console.log('hikeEdit', route.params.hikeEdit)

      setHikeEdit(true)

      setFlyer(`${URL_SERVER}/storage/${route.params.hikeEdit.flyer}`)
      setOldFlyer(route.params.hikeEdit.flyer)

      if (route.params.hikeEdit.hike_vtt_images.length > 0) {
        setImagesEditHike(route.params.hikeEdit.hike_vtt_images)
      }
    }
  }, [route.params?.hikeEdit])

  useEffect(() => {
    if (originalImages.length > 0) {
      compressImages()
    }
  }, [originalImages])

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      setLoader(true)

      let hikeData = dataSteps
      let addressToDBError = false
      let hikeError = false
      let flyerError = false
      let imagesError = false
      let tripError = false
      let postError = false
      let imagesEditHikeError = false

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
          setLoader(false)
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
        setLoader(false)
      }

      // 2 - Hike
      if (!addressToDBError) {
        hikeData = {
          ...hikeData,
          club_id: user.club_id,
        }

        let hike

        if (!hikeEdit) {
          hike = await axiosPostWithToken('hikes/vtt', hikeData)
        } else {
          hike = await axiosPutWithToken(
            `hikes/vtt/${route.params?.hikeEdit.id}`,
            hikeData
          )
        }

        if (hike.status !== 201) {
          toastShow({
            title: 'Action impossible !',
            message: `Impossible d'ajouter une randonée vtt pour le moment (${hike.status})`,
            type: 'toast_danger',
          })

          hikeError = true
        } else {
          // 3 - Flyer
          const checkOrigin = flyer.substring(0, 4)

          if (checkOrigin === 'file') {
            // On met l'extension du fichier & l'ancien path si update
            const title = `flyer|${flyer.split('.').pop()}|${
              hikeEdit ? oldFlyer : 'create'
            }`
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
          }

          if (!flyerError) {
            // 4 - Images
            // On check s'il y a des images a upload
            if (images.length > 0) {
              for (const image of images) {
                if (!imagesError) {
                  // Type d'image & extension du fichier
                  const title = `image|${image.split('.').pop()}|create`
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

            if (imagesEditHike.length && imagesEditHike.lenght === 0) {
              for (const image of imagesEditHike) {
                if (!imagesEditHikeError) {
                  // Type d'image & extension du fichier
                  const title = `image|${image.split('.').pop()}|delete`
                  const send = await sendImageToServer(
                    `hikes/vtt/${hike.data.hike_vtt_id}/storeImage`,
                    {
                      name: 'image',
                      uri: image,
                      title,
                    }
                  )

                  if (send.respInfo.status !== 201) {
                    imagesEditHikeError = true

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
              // On check que dans le tableau, nos parcours n'ont pas d'id.
              // Si pas d'id cela veut dire que ce sont des parcours a créé en DB
              for (const trip of trips) {
                if (!tripError && !trip.id) {
                  const res = await axiosPostWithToken(
                    `hikes/vtt/${hike.data.hike_vtt_id}/trip`,
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
                title: `Randonnée ${hikeEdit ? 'modifiée' : 'créée'} !`,
                message: `Votre randonnée vtt a bien été ${
                  hikeEdit
                    ? 'modifiée'
                    : 'créée et partagée auprès de la communauté :)'
                }`,
              })
            } else {
              toastShow({
                title: `Randonnée ${hikeEdit ? 'modifiée' : 'créée'} !`,
                message: `Votre randonnée vtt a bien été ${
                  hikeEdit
                    ? 'modifiée'
                    : 'créée et partagée auprès de la communauté :)'
                }, sans toutes les options`,
              })
            }
          }
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Hike',
                params: { hikeId: hikeVtt.data.id, create: true },
              },
            ],
          })
        }
      }
      setLoader(false)
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

  const deleteOldImages = async () => {
    setLoading(true)
    setShowDeleteImagesEditHike(false)
    setImagesEditHike(false)

    const response = await axiosDeleteWithToken(
      `hikes/vtt/${route.params?.hikeEdit.id}/deleteImages`
    )

    if (response.status === 201) {
      toastShow({
        title: 'Images supprimées !',
        message: 'Les anciennes images de la rando ont bien été supprimées',
      })
    } else {
      toastShow({
        title: 'Images non supprimées',
        message: `Les anciennes images de la rando n'ont pas pu être supprimées (${response.status})`,
        type: 'toast_danger',
      })
    }

    setLoading(false)
  }

  const openPicker = async () => {
    const image = await openImagePicker()

    if (image !== null) {
      setFlyer(image)
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
      setOriginalImages(response)
    } catch (e) {
      console.log(e.code, e.message)
    }
  }

  if (loading) {
    return <CustomLoader />
  }

  if (loader) {
    return (
      <Lottie
        source={require('../../../assets/lottie/create-hike.json')}
        autoPlay
      />
    )
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
          <View style={{ flex: 1, paddingBottom: imagesEditHike ? 100 : 0 }}>
            <View style={[[rowCenter, mt10], { flex: 1 }]}>
              <Text style={[littleTitle, { color: colors.text }]}>
                {`${
                  route.params?.hikeEdit ? 'Modifier le' : 'Ajouter un '
                } flyer`}
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

              {imagesEditHike && (
                <>
                  <View
                    style={[
                      mt20,
                      { flexDirection: 'row', alignItems: 'center' },
                    ]}
                  >
                    <Text style={[littleTitle, { color: colors.text }]}>
                      Les images / photos de la rando
                    </Text>

                    {imagesEditHike.length > 0 && (
                      <TouchableOpacity
                        style={styles.iconPlus}
                        onPress={() => setShowDeleteImagesEditHike(true)}
                      >
                        <MaterialCommunityIcons
                          name="trash-can"
                          size={30}
                          color={cancelColor}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  <View style={{ flex: 1, marginBottom: 20 }}>
                    <CustomCarousel
                      snapToInterval={CARD_WIDTH}
                      animation={animation}
                    >
                      {imagesEditHike.map((image) => (
                        <View
                          key={image.id}
                          style={[
                            styles.card,
                            { backgroundColor: colors.background },
                          ]}
                        >
                          <ImageBackground
                            source={{
                              uri: `${URL_SERVER}/storage/${image.image}`,
                            }}
                            style={{ width: '100%' }}
                            resizeMode="cover"
                          />
                        </View>
                      ))}
                    </CustomCarousel>
                  </View>
                </>
              )}

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

      <CustomAlert
        showAlert={showDeleteImagesEditHike}
        title="Attention !"
        message="Etes vous sur de vouloir supprimer les anciennes images ?"
        onDismiss={() => setShowDeleteImagesEditHike(false)}
        onCancelPressed={() => setShowDeleteImagesEditHike(false)}
        onConfirmPressed={() => deleteOldImages()}
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
