import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { URL_SERVER } from 'react-native-dotenv'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { useStoreState } from 'easy-peasy'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useIsFocused } from '@react-navigation/native'
import {
  defaultText,
  littleTitle,
  rowCenter,
  my5,
  warningColor,
  mb5,
  mt10,
  my10,
  textAlignCenter,
  darkColor,
  mr20,
  mb20,
  whiteColor,
  mr10,
} from '../../assets/styles/styles'

import CustomContainer from '../../components/CustomContainer'
import CustomDivider from '../../components/CustomDivider'
import CustomBox from '../../components/CustomBox'
import CustomIconButton from '../../components/CustomIconButton'
import CustomCarousel from '../../components/CustomCarousel'
import RouteHike from '../../components/Hikes/RouteHike'
import AvatarHype from '../../components/Hikes/AvatarHype'
import CustomLabelNavigation from '../../components/CustomLabelNavigation'
import CustomImageViewer from '../../components/CustomImageViewer'
import Weather from '../../components/Weather/Weather'
import CustomModal from '../../components/CustomModal'
import PoepleHypeModal from '../../components/Hikes/Hike/PoepleHypeModal'
import useAxios from '../../hooks/useAxios'
import CustomLoader from '../../components/CustomLoader'
import CustomBSModal from '../../components/CustomBSModal'
import ButtonBS from '../../components/ButtonBS'
import CustomOverlay from '../../components/CustomOverlay'
import CustomAlert from '../../components/CustomAlert'
import useUtils from '../../hooks/useUtils'
import useCustomToast from '../../hooks/useCustomToast'

const { width, height } = Dimensions.get('window')
const CARD_HEIGHT = 220
const CARD_WIDTH = width * 0.8

const HikeScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { axiosGetWithToken, axiosPostWithToken, axiosDeleteWithToken } =
    useAxios()
  const { formatDate } = useUtils()
  const { toastShow } = useCustomToast()

  const isFocused = useIsFocused()

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const { hikeId } = route.params

  const [hike, setHike] = useState(false)
  const [isHype, setIsHype] = useState(false)
  const [showFlyer, setShowFlyer] = useState(false)
  const [showImages, setShowImages] = useState(false)
  const [index, setIndex] = useState(0)
  const [showHypes, setShowHypes] = useState(false)
  const [loading, setLoading] = useState(true)
  const [overlay, setOverlay] = useState(false)
  const [showAlertCancelHike, setShowAlertCancelHike] = useState(false)
  const [imagesViewer, setImagesViewer] = useState([])

  const animation = new Animated.Value(0)

  // Au chargement
  useEffect(() => {
    if (isFocused) {
      closeBottomSheet()
      loadHike()
    }
  }, [isFocused])

  // Permet de formater un tableau pour voir les images dans le viewer
  useEffect(() => {
    if (imagesViewer.length > 0) {
      setShowImages(true)
    }
  }, [imagesViewer])

  // Ref pour la bottomSheet Type
  const optionsHike = useRef(null)

  const closeBottomSheet = () => {
    setOverlay(false)
    optionsHike?.current?.closeBottomSheet()
  }

  // Permet d'ouvrir et fermer la bottomSheet pour choisir le type de vélo
  const toggleBottomSheet = () => {
    if (overlay) {
      closeBottomSheet()
    } else {
      setOverlay(true)
      optionsHike?.current?.openBottomSheet()
    }
  }

  // Charge la rando depuis l'api
  const loadHike = async () => {
    const response = await axiosGetWithToken(`hikes/vtt/${hikeId}`)

    setHike(response.data)
    if (response.data.hike_vtt_hypes.length > 0) {
      setIsHype(checkIfUserHyped(response.data.hike_vtt_hypes))
    }
    setLoading(false)
  }

  // Permet de voir si le user est hype
  const checkIfUserHyped = (hypers) => {
    let hyped = false
    for (const hyper of hypers) {
      if (user.id === hyper.user_id) {
        hyped = true
        return true
      }
    }
    if (!hyped) {
      return false
    }

    return false
  }

  const cancelHike = async () => {
    setShowAlertCancelHike(false)
    closeBottomSheet()

    const response = await axiosDeleteWithToken(`hikes/vtt/${hike.id}`)

    if (response.status === 201) {
      toastShow({
        title: 'Rando annulée !',
        message: 'La rando a bien été annulée 😭',
      })

      // TODO Notifications aux personnes hypes + membres du club

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Drawer',
          },
        ],
      })
    }
  }

  const createImagesArray = () => {
    const images = []
    for (const image of hike.hike_vtt_images) {
      images.push({ url: `${URL_SERVER}/storage/${image.image}` })
    }

    setImagesViewer(images)
  }

  const hype = async () => {
    setIsHype(!isHype)

    const response = await axiosPostWithToken(
      `hikes/vtt/${hike.id}/hypeOrUnhype`
    )

    if (response.status === 201) {
      toastShow({
        title: 'Hyped ! Super !',
        message: 'On vous attends le jour de la rando 😉',
      })
      setHike(response.data.hike_vtt)

      // TODO Notification a l'admin
    }

    if (response.status === 202) {
      toastShow({
        title: 'UnHyped !',
        message: 'Zut ! Les organisateurs vous attendaient 😥',
      })
      setHike(response.data.hike_vtt)
    }
  }

  if (loading) {
    return <CustomLoader />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <CustomContainer
          pressBack={() =>
            route.params?.create
              ? navigation.navigate('Drawer')
              : navigation.goBack()
          }
          label="Détails de la rando"
          iconName="file-edit"
          editIcon={user.club_id === hike.club_id && user.is_club_admin === 1}
          onPressEdit={toggleBottomSheet}
        >
          <View style={{ flex: 1 }}>
            {overlay && <CustomOverlay />}
            <ScrollView>
              <View style={styles.container}>
                <CustomBox style={styles.leftBox}>
                  <TouchableOpacity
                    onPress={() => setShowFlyer(true)}
                    style={styles.leftContainer}
                  >
                    <ImageBackground
                      source={{ uri: `${URL_SERVER}/storage/${hike.flyer}` }}
                      style={styles.flyer}
                      resizeMode="stretch"
                    />
                  </TouchableOpacity>

                  <View style={{ marginTop: 'auto' }}>
                    <CustomIconButton
                      text={isHype ? 'Unhype' : 'Hype'}
                      onPress={hype}
                      size="100%"
                      cancel={!!isHype}
                      disabled={user.club_id === hike.club_id}
                      icon={
                        <MaterialCommunityIcons
                          name={isHype ? 'alarm-light' : 'alarm-light-outline'}
                          size={24}
                          color={whiteColor}
                        />
                      }
                    />
                  </View>
                </CustomBox>

                <CustomBox style={styles.rightBox}>
                  <Text style={[littleTitle, mb5, { color: colors.textBox }]}>
                    {hike.name}
                  </Text>
                  <Text style={[defaultText, mb5, { color: colors.textBox }]}>
                    {hike.club_name}
                  </Text>

                  <Text
                    style={[littleTitle, textAlignCenter, my10, styles.date]}
                  >
                    {formatDate(new Date(hike.date))}
                  </Text>

                  <View style={[rowCenter, my10]}>
                    <View style={{ flex: 5 }}>
                      <Text
                        style={[defaultText, mb5, { color: colors.textBox }]}
                      >
                        prix public :
                      </Text>
                      <Text style={[defaultText, { color: colors.textBox }]}>
                        prix licencié :
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[defaultText, { color: colors.textBox }]}>
                        {Math.trunc(hike.public_price)} €
                      </Text>
                      <Text style={[defaultText, { color: colors.textBox }]}>
                        {hike.private_price !== null
                          ? `${Math.trunc(hike.private_price)} €`
                          : '-'}
                      </Text>
                    </View>
                  </View>

                  <CustomDivider addStyle={my5} />

                  <Text style={[littleTitle, mt10, { color: colors.textBox }]}>
                    Adresse :
                  </Text>
                  <Text style={[defaultText, { color: colors.textBox }]}>
                    {hike.address.street_address}
                  </Text>
                  <Text style={[defaultText, { color: colors.textBox }]}>
                    {hike.address.zipcode.code} {hike.address.city.name}
                  </Text>
                </CustomBox>
              </View>

              <CustomBox>
                <TouchableOpacity
                  onPress={() => setShowHypes(true)}
                  style={rowCenter}
                >
                  <Text style={[mr20, defaultText, { color: colors.textBox }]}>
                    Personnes Hypes :
                  </Text>
                  <View style={[rowCenter]}>
                    {/* On boucle sur les personnes hypes jusqu'a en avoir 5 */}
                    {hike.hike_vtt_hypes.length > 0 &&
                      hike.hike_vtt_hypes.map(
                        (user, index) =>
                          index <= 4 && (
                            <AvatarHype
                              key={user.user_id}
                              userId={user.user_id}
                            />
                          )
                      )}
                    {/* Si 6 personnes hype on affiche le 6 ème */}
                    {hike.hike_vtt_hypes.length === 6 && (
                      <AvatarHype userId={hike.hike_vtt_hypes[5]} />
                    )}
                    {/* Si plus de 6 personnes hype, on affiche le compteur des personnes restante sur le 6 eme */}
                    {hike.hike_vtt_hypes.length > 6 && (
                      <AvatarHype
                        userId={hike.hike_vtt_hypes[5]}
                        nbUsers={hike.hike_vtt_hypes.length - 6}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </CustomBox>

              <CustomBox>
                <Text style={[littleTitle, mb20, { color: colors.textBox }]}>
                  {hike.hike_vtt_trips.length} parcours :
                </Text>
                {hike.hike_vtt_trips.map((trip) => (
                  <RouteHike key={trip.id} trip={trip} />
                ))}
              </CustomBox>

              <CustomBox>
                <Text style={[littleTitle, mb5, { color: colors.textBox }]}>
                  Description :
                </Text>
                <Text style={[defaultText, { color: colors.textBox }]}>
                  {hike.description}
                </Text>
              </CustomBox>

              {/* Carousel d'images */}
              <CustomBox>
                <Text style={[littleTitle, { color: colors.textBox }]}>
                  Images / Photos :
                </Text>
                {hike.hike_vtt_images.length > 0 ? (
                  <CustomCarousel
                    snapToInterval={CARD_WIDTH}
                    animation={animation}
                  >
                    {hike.hike_vtt_images.map((image, index) => (
                      <TouchableOpacity
                        onPress={() => {
                          setIndex(index)
                          createImagesArray()
                        }}
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
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    ))}
                  </CustomCarousel>
                ) : (
                  <Text style={[defaultText, mt10, { color: colors.textBox }]}>
                    Pas d'images ou de photos a montrer
                  </Text>
                )}
              </CustomBox>

              {/* Météo */}
              <CustomBox>{hike && <Weather hike={hike} />}</CustomBox>

              {/* Commentaires */}
              <CustomBox>
                <Text style={[littleTitle, { color: colors.textBox }]}>
                  Commentaires
                </Text>
                <CustomIconButton
                  isText
                  text={`Voir les commentaires (${hike.post.comments_count})`}
                  size="100%"
                  onPress={() =>
                    navigation.navigate('Comments', { item: hike.post })
                  }
                  iconLeft={
                    <MaterialCommunityIcons
                      name="comment-text-outline"
                      size={24}
                      color={whiteColor}
                      style={mr10}
                    />
                  }
                />
              </CustomBox>
            </ScrollView>

            {/* Permet de voir le flyer en fullScreen */}
            <CustomImageViewer
              showModal={showFlyer}
              setShowModal={setShowFlyer}
              imageUrls={[{ url: `${URL_SERVER}/storage/${hike.flyer}` }]}
              renderHeader={() => (
                <View style={{ backgroundColor: colors.background }}>
                  <CustomLabelNavigation
                    label="Flyer"
                    colors={colors}
                    onPress={() => setShowFlyer(false)}
                  />
                </View>
              )}
            />

            {/* Permet de voir les images / photos en fullScreen et de les swipe */}
            <CustomImageViewer
              showModal={showImages}
              setShowModal={setShowImages}
              imageUrls={imagesViewer}
              index={index}
              renderHeader={() => (
                <View style={{ backgroundColor: colors.background }}>
                  <CustomLabelNavigation
                    label="Photos / Images"
                    colors={colors}
                    onPress={() => setShowImages(false)}
                  />
                </View>
              )}
            />

            {/* Modal pour montrer les personnes hypes */}
            <CustomModal
              showModal={showHypes}
              closeModal={() => setShowHypes(false)}
            >
              <PoepleHypeModal peopleHype={hike.hike_vtt_hypes} />
            </CustomModal>
          </View>

          {/* BottomSheet pour les les options d'edit de randonnée */}
          <CustomBSModal
            title="Que souhaitez vous faire ?"
            SP={['25%', '30%']}
            ref={optionsHike}
            onDismiss={closeBottomSheet}
          >
            <ButtonBS onPress={() => setShowAlertCancelHike(true)} cancel>
              Annuler la randonnée VTT
            </ButtonBS>
            <ButtonBS
              onPress={() => {
                // Mettre la rando dans un store ?
                navigation.navigate('AddHikeStep1', { hikeEdit: hike })
              }}
            >
              Modifier la randonnée
            </ButtonBS>
          </CustomBSModal>

          <CustomAlert
            showAlert={showAlertCancelHike}
            title="Attention !"
            message="Etes vous sur de vouloir annuler la rando ?"
            onDismiss={() => setShowAlertCancelHike(false)}
            onCancelPressed={() => setShowAlertCancelHike(false)}
            onConfirmPressed={cancelHike}
          />
        </CustomContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default HikeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftBox: {
    width: width / 2.5,
    margin: 10,
    marginRight: 5,
    padding: 2,
  },
  leftContainer: {
    paddingBottom: 5,
    maxHeight: height / 3,
  },
  flyer: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
  rightBox: {
    flex: 1,
    marginleft: 5,
    padding: 10,
  },
  date: {
    color: darkColor,
    backgroundColor: warningColor,
    paddingVertical: 10,
    borderRadius: 5,
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
