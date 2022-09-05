import React, { useEffect, useState } from 'react'
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { LeafletView } from 'react-native-leaflet-view'
import { useTheme } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'

import { useStoreState } from 'easy-peasy'

import { GOELOCATION_KEY } from 'react-native-dotenv'

import Geolocation from 'react-native-geolocation-service'
import axios from 'axios'

import Modal from 'react-native-modal'

import {
  cancelColor,
  darkColor,
  darkPrimaryColor,
  defaultText,
  defaultTextBold,
  grayColor,
  littleTitle,
  my20,
  textAlignCenter,
  TitleH3,
  whiteColor,
} from '../../assets/styles/styles'

import CustomContainer from '../../components/CustomContainer'
import CustomDivider from '../../components/CustomDivider'
import CustomButton from '../../components/CustomButton'
import InputField from '../../components/InputField'
import CustomCarousel from '../../components/CustomCarousel'
import HikesCardCarousel from '../../components/Hikes/HikesCardCarousel'
import useGeolocation from '../../hooks/useGeolocation'
import CustomLoader from '../../components/CustomLoader'
import useCustomToast from '../../hooks/useCustomToast'
import useAxios from '../../hooks/useAxios'
import useServices from '../../hooks/useServices'
import CustomModal from '../../components/CustomModal'
import useUtils from '../../hooks/useUtils'

const { width, height } = Dimensions.get('window')
const CARD_WIDTH = width * 0.8

const mapOptions = {
  attributionControl: false,
  zoomControl: Platform.OS === 'web',
}

const mapLayers = [
  {
    attribution:
      '<a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    baseLayerIsChecked: true,
    baseLayerName: 'OpenStreetMap',
    layerType: 'TileLayer',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
  {
    attribution: '<a href="https://www.mapbox.com/">Mapbox</a> contributors',
    baseLayerIsChecked: false,
    baseLayer: true,
    baseLayerName: 'Mapbox',
    layerType: 'TileLayer',
    url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2hlcmVzbXl3YXZlcyIsImEiOiJjanJ6cGZtd24xYmU0M3lxcmVhMDR2dWlqIn0.QQSWbd-riqn1U5ppmyQjRw`,
  },
]

// const mapMarkers = [
//   {
//     id: '1',
//     position: { lat: 48.6049675528421, lng: -4.368736230974384 },
//     // icon: '📍',
//     icon: `
//     <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
//       <path d="M11.9 1a8.6 8.6 0 00-8.6 8.6c0 4.35 7.2 12.05 8.42 13.33a.24.24 0 00.35 0c1.22-1.27 8.42-9 8.42-13.33A8.6 8.6 0 0011.9 1zm0 11.67A3.07 3.07 0 1115 9.6a3.07 3.07 0 01-3.1 3.07z"/>
//     </svg>
//     `,
//     size: [24, 24],
//     imgUrl: 'https://picsum.photos/id/11/200/300',
//     name: 'Randonnée 1',
//     flyer:
//       'https://www.ats-sport.com/admin/fichiers_epreuves/FLYER-RandoVTTdesVignes_2021_D_page-0001-2021-11-04-13-51-25.jpg',
//     price: '5 €',
//     description:
//       'Lorem ipsum dolor sit amet. Et debitis nihil nam distinctio exercitationem et voluptatem ipsam. In ullam iste est consequatur sequi et earum dolorem ut repellendus pariatur qui corporis suscipit aut adipisci dolorum At sunt consequatur?',
//   },
//   {
//     id: '2',
//     position: { lat: 48.56275203887253, lng: -4.2655111831095045 },
//     // icon: '😴',
//     icon: `
//     <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
//       <path d="M11.9 1a8.6 8.6 0 00-8.6 8.6c0 4.35 7.2 12.05 8.42 13.33a.24.24 0 00.35 0c1.22-1.27 8.42-9 8.42-13.33A8.6 8.6 0 0011.9 1zm0 11.67A3.07 3.07 0 1115 9.6a3.07 3.07 0 01-3.1 3.07z"/>
//     </svg>
//     `,
//     size: [24, 24],
//     imgUrl: 'https://picsum.photos/id/10/200/300',
//     name: 'Randonnée 2',
//     flyer:
//       'https://www.ats-sport.com/admin/fichiers_epreuves/FLYER-RandoVTTdesVignes_2021_D_page-0001-2021-11-04-13-51-25.jpg',
//     price: '5 €',
//     description:
//       'Lorem ipsum dolor sit amet. Et debitis nihil nam distinctio exercitationem et voluptatem ipsam. In ullam iste est consequatur sequi et earum dolorem ut repellendus pariatur qui corporis suscipit aut adipisci dolorum At sunt consequatur?',
//   },
//   {
//     id: '3',
//     position: { lat: 48.50044705226551, lng: -4.425040802537101 },
//     // icon: 'https://www.catster.com/wp-content/uploads/2018/07/Savannah-cat-long-body-shot.jpg',
//     icon: `
//     <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
//       <path d="M11.9 1a8.6 8.6 0 00-8.6 8.6c0 4.35 7.2 12.05 8.42 13.33a.24.24 0 00.35 0c1.22-1.27 8.42-9 8.42-13.33A8.6 8.6 0 0011.9 1zm0 11.67A3.07 3.07 0 1115 9.6a3.07 3.07 0 01-3.1 3.07z"/>
//     </svg>
//     `,
//     size: [24, 24],
//     imgUrl: 'https://picsum.photos/id/12/200/300',
//     name: 'Randonnée 3',
//     flyer:
//       'https://www.ats-sport.com/admin/fichiers_epreuves/FLYER-RandoVTTdesVignes_2021_D_page-0001-2021-11-04-13-51-25.jpg',
//     price: '5 €',
//     description:
//       'Lorem ipsum dolor sit amet. Et debitis nihil nam distinctio exercitationem et voluptatem ipsam. In ullam iste est consequatur sequi et earum dolorem ut repellendus pariatur qui corporis suscipit aut adipisci dolorum At sunt consequatur?',
//   },
// ]

const HikesScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const { requestLocationPermission } = useGeolocation()
  const { toastShow } = useCustomToast()
  const { axiosPostWithToken, axiosGetWithToken } = useAxios()
  const { getDistance } = useServices()
  const { formatDateHike } = useUtils()

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const [inputSearch, setInputSearch] = useState(false)
  const [search, setSearch] = useState('')
  const [hasLocationPermission, setHasLocationPermission] = useState(false)
  const [loading, setLoading] = useState(true)
  const [zoom, setZoom] = useState(12)
  const [mapMarkers, setMapMarkers] = useState([])
  const [isLocationLoad, setIsLocationLoad] = useState(false)
  const [position, setPosition] = useState(false)
  const [hikeInfo, setHikeInfo] = useState({
    open: false,
    hike: false,
  })
  const [loader, setLoader] = useState(false)
  const [coordonate, setCoordonate] = useState(false)

  let mapIndex = 0
  const mapAnimation = new Animated.Value(0)

  useEffect(() => {
    // console.log('user', user)
    loadLocation()
  }, [])

  useEffect(() => {
    if (isLocationLoad) {
      loadHikes()
      setIsLocationLoad(false)
    }
  }, [isLocationLoad])

  useEffect(() => {
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log('position', position)
          const options = {
            method: 'GET',
            url: `https://us1.locationiq.com/v1/reverse.php?key=${GOELOCATION_KEY}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`,
          }
          axios
            .request(options)
            .then((response) => {
              console.log('axios', response.data)
              setCoordonate({ lat: response.data.lat, lng: response.data.lon })
              setLoading(false)
              setIsLocationLoad(true)
            })
            .catch((error) => {
              console.error('error', error.message)
              if (error.response.status === 401) {
                toastShow({
                  title: 'Oops !',
                  message: `Cette écran est temporairement indisponible (${error.response.status})`,
                  type: 'toast_danger',
                })

                navigation.goBack()
              }
              setLoading(false)
            })
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message)
          setLoading(false)
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      )
    }
  }, [hasLocationPermission])

  // On écoute quand le user fait une action sur la scrollview en bas
  useEffect(() => {
    if (!loading) {
      mapAnimation.addListener(({ value }) => {
        let index = Math.floor(value / CARD_WIDTH + 0.3)

        if (index >= mapMarkers.length) {
          index = mapMarkers.length - 1
        }
        if (index <= 0) {
          index = 0
        }

        // eslint-disable-next-line no-use-before-define
        clearTimeout(regionTimeout)

        const regionTimeout = setTimeout(() => {
          if (mapIndex !== index) {
            mapIndex = index
            const { position } = mapMarkers[index]
            setCoordonate(position)
          }
        }, 10)
      })
    }
  })

  const loadLocation = () => {
    if (user.address !== null) {
      setCoordonate({ lat: user.address.lat, lng: user.address.lng })
      setZoom(12)
      setLoading(false)
      setIsLocationLoad(true)
    } else {
      requestLocationPermission().then((res) => {
        if (res) {
          setHasLocationPermission(true)
        } else {
          setCoordonate({
            lat: 48.57307365781657,
            lng: -4.333331497869044,
          })
          setLoading(false)
          setIsLocationLoad(true)
        }
      })
    }
  }

  const loadHikes = async (atPoint = false) => {
    let data = false
    if (atPoint) {
      // setLoading(true)
      setCoordonate(position)
      setMapMarkers([])
      data = {
        lat: position.lat,
        lng: position.lng,
        distance: getDistance(zoom),
      }
    } else {
      data = {
        lat: coordonate.lat,
        lng: coordonate.lng,
        distance: getDistance(zoom),
      }
    }

    console.log('DATA', data)
    const response = await axiosPostWithToken('hikes/vtt/search', data)

    console.log('response hikes', response.data)

    if (response.status === 200) {
      setMapMarkers(response.data.hikes)
      // setLoading(false)
    }
  }

  const loadHikesById = async (id) => {
    setLoader(true)
    const response = await axiosGetWithToken(`hikes/vtt/${id}`)

    if (response.status === 200) {
      setLoader(false)
      setHikeInfo({
        open: true,
        hike: response.data,
      })
    }
  }

  useEffect(() => {
    console.log('hikeInfo', hikeInfo)
  }, [hikeInfo])

  return (
    <CustomContainer
      label="Trouver une rando"
      pressBack={() => navigation.goBack()}
    >
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          {/* Icone ouverture / fermeture de la searchBar */}
          <TouchableOpacity
            // onPress={() =>
            //   inputSearch ? setInputSearch(false) : setInputSearch(true)
            // }
            onPress={() => alert('Bienôt disponible !')}
            style={styles.iconRight}
          >
            <MaterialCommunityIcons
              name="map-search"
              size={28}
              color={inputSearch ? cancelColor : colors.text}
            />
          </TouchableOpacity>

          {/* Content */}
          <View style={{ flex: 1 }}>
            {/* La map Leaflet */}
            <LeafletView
              mapCenterPosition={coordonate}
              zoom={zoom}
              debugEnabled={false}
              mapMarkers={mapMarkers}
              mapOptions={mapOptions}
              mapLayers={mapLayers}
              onMessageReceived={(message) => {
                if (message.event === 'onMapMarkerClicked') {
                  setHikeInfo({ ...hikeInfo, open: true })
                  loadHikesById(message.payload.mapMarkerID)
                }
                if (message.event === 'onMoveEnd') {
                  setPosition({
                    lat: message.payload.mapCenterPosition.lat,
                    lng: message.payload.mapCenterPosition.lng,
                  })
                  setZoom(message.payload.zoom)
                  // console.log('PAYLOAD', message.payload)
                  // Ici on fera un fetch des randos dans une distance de XX km
                  // Ou faire un bouton de recherche qui sera actionner par le user
                  // Alert.alert(
                  //   `Map mouved to lat: ${message.payload.mapCenterPosition.lat}, lng: ${message.payload.mapCenterPosition.lng}`
                  // )
                }
              }}
            />

            {/* Bouton qui permet de relocaliser le user */}
            <TouchableOpacity
              onPress={loadLocation}
              style={[styles.icon, { top: 65 }]}
            >
              <MaterialCommunityIcons
                name="crosshairs"
                size={28}
                color={grayColor}
              />
            </TouchableOpacity>

            {/* Bouton qui permet de rechercher au point ou le user est sur la carte */}
            <TouchableOpacity
              onPress={() => loadHikes(true)}
              style={[styles.icon, { top: 120 }]}
            >
              <Feather name="refresh-cw" size={28} color={grayColor} />
            </TouchableOpacity>

            {/* SearchBar */}
            <Modal
              isVisible={inputSearch}
              animationIn="slideInDown"
              animationOut="slideOutUp"
              backdropOpacity={0.6}
              backdropTransitionInTiming={800}
              backdropTransitionOutTiming={800}
              animationInTiming={800}
              animationOutTiming={800}
              onBackdropPress={() => setInputSearch(false)}
              style={styles.modal}
            >
              <View
                style={[
                  styles.modalContainer,
                  {
                    backgroundColor: colors.background,
                  },
                ]}
              >
                <Text
                  style={[
                    littleTitle,
                    textAlignCenter,
                    { color: colors.text, paddingVertical: 10 },
                  ]}
                >
                  Rechercher autour d'une ville
                </Text>

                <CustomDivider />

                <View style={{ marginBottom: 50 }}>
                  <InputField
                    label="Stade Georges Martin ..."
                    colors={colors}
                    value={search}
                    onChange={setSearch}
                    icon={
                      <MaterialCommunityIcons
                        name="home-search"
                        size={22}
                        color={darkPrimaryColor}
                      />
                    }
                  />

                  {/* Résultats de la recherche */}
                  {/* <View style={{ zIndex: 2, backgroundColor: colors.background }}>
                <Text style={{ borderBottomWidth: 1, padding: 10 }}>ici</Text>
                <Text style={{ borderBottomWidth: 1, padding: 10 }}>ici</Text>
                <Text style={{ borderBottomWidth: 1, padding: 10 }}>ici</Text>
                <Text style={{ borderBottomWidth: 1, padding: 10 }}>ici</Text>
                <Text style={{ borderBottomWidth: 1, padding: 10 }}>ici</Text>
                <Text style={{ borderBottomWidth: 1, padding: 10 }}>ici</Text>
                <Text style={{ borderBottomWidth: 1, padding: 10 }}>ici</Text>
                <Text style={{ borderBottomWidth: 1, padding: 10 }}>ici</Text>
                <Text style={{ borderBottomWidth: 1, padding: 10 }}>ici</Text>
              </View> */}
                </View>

                <View style={{ marginTop: 'auto' }}>
                  <CustomButton onPress={() => setInputSearch(false)}>
                    Rechercher
                  </CustomButton>
                </View>
              </View>
            </Modal>

            {/* Les cards en bas de la map */}
            <CustomCarousel
              snapToInterval={CARD_WIDTH + 20}
              style={styles.scrollView}
              animation={mapAnimation}
            >
              {mapMarkers.map((marker) => (
                <HikesCardCarousel
                  key={marker.id}
                  hike={marker}
                  goToHike={() =>
                    navigation.navigate('Hike', { hikeId: marker.id })
                  }
                />
              ))}
            </CustomCarousel>

            <CustomModal
              showModal={hikeInfo.open}
              closeModal={() => setHikeInfo({ ...hikeInfo, open: false })}
              animation="fade"
              transparent
              closeRight
              style={{
                width: '60%',
                alignSelf: 'center',
                marginTop: 250,
                marginBottom: 350,
                borderRadius: 8,
              }}
            >
              {loader ? (
                <CustomLoader />
              ) : (
                <View>
                  <Text
                    style={[
                      defaultTextBold,
                      textAlignCenter,
                      { color: colors.text },
                    ]}
                  >
                    {hikeInfo.hike.name}
                  </Text>

                  <Text
                    style={[
                      TitleH3,
                      textAlignCenter,
                      my20,
                      { color: darkPrimaryColor },
                    ]}
                  >
                    {formatDateHike(hikeInfo.hike.date)}
                  </Text>
                  <Text
                    style={[
                      defaultText,
                      textAlignCenter,
                      { color: colors.text, fontSize: 14 },
                    ]}
                  >
                    Organisé par :
                  </Text>
                  <Text
                    style={[
                      defaultText,
                      textAlignCenter,
                      { color: colors.text },
                    ]}
                  >
                    {hikeInfo.hike.club_name}
                  </Text>
                </View>
              )}
            </CustomModal>
          </View>
        </>
      )}
    </CustomContainer>
  )
}

export default HikesScreen

const styles = StyleSheet.create({
  iconRight: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: darkColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    borderWidth: 1,
    zIndex: 2,
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  icon: {
    position: 'absolute',
    right: 10,
    backgroundColor: whiteColor,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: grayColor,
    padding: 8,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width / 1.2,
    maxHeight: height / 2,
    borderRadius: 10,
    elevation: 10,
    padding: 10,
  },
})
