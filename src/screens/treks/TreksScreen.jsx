import React, { useEffect, useState } from 'react'
import {
  Alert,
  Animated,
  Dimensions,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { LeafletView } from 'react-native-leaflet-view'
import { useTheme } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {
  cancelColor,
  darkColor,
  defaultText,
  defaultTextBold,
  grayColor,
  littleTitle,
  mt5,
  textAlignCenter,
  whiteColor,
} from '../../assets/styles/styles'

import CustomContainer from '../../components/CustomContainer'
import CustomDivider from '../../components/CustomDivider'
import CustomButton from '../../components/CustomButton'
import CustomOverlay from '../../components/CustomOverlay'

const { width } = Dimensions.get('window')
const CARD_HEIGHT = 220
const CARD_WIDTH = width * 0.8
const SPACING_FOR_CARD_INSET = width * 0.1 - 10

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

const mapMarkers = [
  {
    id: '1',
    position: { lat: 48.6049675528421, lng: -4.368736230974384 },
    // icon: '📍',
    icon: `
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9 1a8.6 8.6 0 00-8.6 8.6c0 4.35 7.2 12.05 8.42 13.33a.24.24 0 00.35 0c1.22-1.27 8.42-9 8.42-13.33A8.6 8.6 0 0011.9 1zm0 11.67A3.07 3.07 0 1115 9.6a3.07 3.07 0 01-3.1 3.07z"/>
    </svg>
    `,
    size: [24, 24],
    imgUrl: 'https://picsum.photos/id/11/200/300',
    name: 'Randonnée 1',
    flyer:
      'https://www.ats-sport.com/admin/fichiers_epreuves/FLYER-RandoVTTdesVignes_2021_D_page-0001-2021-11-04-13-51-25.jpg',
    price: '5 €',
    description:
      'Lorem ipsum dolor sit amet. Et debitis nihil nam distinctio exercitationem et voluptatem ipsam. In ullam iste est consequatur sequi et earum dolorem ut repellendus pariatur qui corporis suscipit aut adipisci dolorum At sunt consequatur?',
  },
  {
    id: '2',
    position: { lat: 48.56275203887253, lng: -4.2655111831095045 },
    // icon: '😴',
    icon: `
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9 1a8.6 8.6 0 00-8.6 8.6c0 4.35 7.2 12.05 8.42 13.33a.24.24 0 00.35 0c1.22-1.27 8.42-9 8.42-13.33A8.6 8.6 0 0011.9 1zm0 11.67A3.07 3.07 0 1115 9.6a3.07 3.07 0 01-3.1 3.07z"/>
    </svg>
    `,
    size: [24, 24],
    imgUrl: 'https://picsum.photos/id/10/200/300',
    name: 'Randonnée 2',
    flyer:
      'https://www.ats-sport.com/admin/fichiers_epreuves/FLYER-RandoVTTdesVignes_2021_D_page-0001-2021-11-04-13-51-25.jpg',
    price: '5 €',
    description:
      'Lorem ipsum dolor sit amet. Et debitis nihil nam distinctio exercitationem et voluptatem ipsam. In ullam iste est consequatur sequi et earum dolorem ut repellendus pariatur qui corporis suscipit aut adipisci dolorum At sunt consequatur?',
  },
  {
    id: '3',
    position: { lat: 48.50044705226551, lng: -4.425040802537101 },
    // icon: 'https://www.catster.com/wp-content/uploads/2018/07/Savannah-cat-long-body-shot.jpg',
    icon: `
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9 1a8.6 8.6 0 00-8.6 8.6c0 4.35 7.2 12.05 8.42 13.33a.24.24 0 00.35 0c1.22-1.27 8.42-9 8.42-13.33A8.6 8.6 0 0011.9 1zm0 11.67A3.07 3.07 0 1115 9.6a3.07 3.07 0 01-3.1 3.07z"/>
    </svg>
    `,
    size: [24, 24],
    imgUrl: 'https://picsum.photos/id/12/200/300',
    name: 'Randonnée 3',
    flyer:
      'https://www.ats-sport.com/admin/fichiers_epreuves/FLYER-RandoVTTdesVignes_2021_D_page-0001-2021-11-04-13-51-25.jpg',
    price: '5 €',
    description:
      'Lorem ipsum dolor sit amet. Et debitis nihil nam distinctio exercitationem et voluptatem ipsam. In ullam iste est consequatur sequi et earum dolorem ut repellendus pariatur qui corporis suscipit aut adipisci dolorum At sunt consequatur?',
  },
]

const TreksScreen = ({ navigation }) => {
  const { colors } = useTheme()

  const [inputSearch, setInputSearch] = useState(false)
  const [search, setSearch] = useState('')

  // Les coordonées initial
  const [coordonate, setCoordonate] = useState({
    lat: 48.6049675528421,
    lng: -4.368736230974384,
  })

  let mapIndex = 0
  const mapAnimation = new Animated.Value(0)

  // On écoute quand le user fait une action sur la scrollview en bas
  useEffect(() => {
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
  })

  return (
    <CustomContainer
      label="Trouver une rando"
      pressBack={() => navigation.goBack()}
    >
      {/* Icone ouverture / fermeture de la searchBar */}
      <TouchableOpacity
        onPress={() =>
          inputSearch ? setInputSearch(false) : setInputSearch(true)
        }
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
        {inputSearch && <CustomOverlay />}

        {/* La map Leaflet */}
        <LeafletView
          mapCenterPosition={coordonate}
          zoom={12}
          mapMarkers={mapMarkers}
          mapOptions={mapOptions}
          mapLayers={mapLayers}
          onMessageReceived={(message) => {
            if (message.event === 'onMapMarkerClicked') {
              Alert.alert(
                `Map Marker Touched, ID: ${
                  message.payload.mapMarkerID || 'unknown'
                }`
              )
            }
            if (message.event === 'onMoveEnd') {
              // Ici on fera un fetch des randos dans une distance de XX km
              // Ou faire un bouton de recherche qui sera actionner par le user
              // Alert.alert(
              //   `Map mouved to lat: ${message.payload.mapCenterPosition.lat}, lng: ${message.payload.mapCenterPosition.lng}`
              // )
            }
          }}
        />

        {/* Bouton qui permet de relocaliser le user */}
        <TouchableOpacity onPress={() => {}} style={styles.crosshair}>
          <MaterialCommunityIcons
            name="crosshairs"
            size={35}
            color={grayColor}
          />
        </TouchableOpacity>

        {/* SearchBar */}
        {inputSearch && (
          <View
            style={[styles.searchBox, { backgroundColor: colors.background }]}
          >
            <TextInput
              placeholder="Rechercher ici"
              placeholderTextColor={colors.text}
              autoCapitalize="none"
              autoFocus
              value={search}
              onChangeText={setSearch}
              style={[
                defaultText,
                {
                  flex: 1,
                  padding: 0,
                  color: colors.text,
                  backgroundColor: colors.background,
                },
              ]}
            />
            <Ionicons name="ios-search" size={20} color={colors.text} />
          </View>
        )}

        {/* Les cards en bas de la map */}
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          disableIntervalMomentum
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          pagingEnabled
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          contentInset={{
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET,
          }}
          contentContainerStyle={{
            paddingHorizontal:
              Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
        >
          {mapMarkers.map((marker) => (
            <View
              key={marker.id}
              style={[styles.card, { backgroundColor: colors.background }]}
            >
              <View style={[styles.semiCard, { borderTopLeftRadius: 8 }]}>
                <ImageBackground
                  source={{
                    uri: marker.flyer,
                  }}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <View
                style={[
                  styles.semiCard,
                  {
                    borderTopLeftRadius: 8,
                    backgroundColor: colors.background,
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      defaultTextBold,
                      textAlignCenter,
                      { color: colors.text, padding: 5 },
                    ]}
                  >
                    La Côte des légendes VTT
                  </Text>

                  <CustomDivider />

                  <Text
                    style={[
                      littleTitle,
                      textAlignCenter,
                      { color: colors.text, padding: 5 },
                    ]}
                  >
                    16/09/2022
                  </Text>

                  <View style={styles.addressContainer}>
                    <Text
                      style={[
                        defaultText,
                        textAlignCenter,
                        { color: colors.text, fontSize: 14 },
                      ]}
                    >
                      Stade George Martin
                    </Text>
                    <Text
                      style={[
                        defaultText,
                        textAlignCenter,
                        mt5,
                        { color: colors.text, fontSize: 14 },
                      ]}
                    >
                      29260 Lesneven
                    </Text>
                  </View>

                  <View style={styles.btnContainer}>
                    <CustomButton onPress={() => {}}>Voir détails</CustomButton>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    </CustomContainer>
  )
}

export default TreksScreen

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
  card: {
    flex: 1,
    flexDirection: 'row',
    elevation: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: darkColor,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  semiCard: {
    width: '50%',
    overflow: 'hidden',
  },
  addressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    marginHorizontal: 10,
    marginTop: 'auto',
    marginBottom: 10,
  },
  crosshair: {
    position: 'absolute',
    right: 10,
    top: 70,
    backgroundColor: whiteColor,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: grayColor,
    padding: 5,
  },
})
