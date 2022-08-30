import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { URL_SERVER } from 'react-native-dotenv'

import { useStoreState } from 'easy-peasy'

import { TabView, TabBar } from 'react-native-tab-view'

import { useIsFocused, useNavigation } from '@react-navigation/native'

import {
  blackColor,
  dangerColor,
  darkColor,
  defaultText,
  mt10,
  primaryColor,
  textAlignCenter,
  TitleH3,
  TitleH4,
  warningColor,
  whiteColor,
} from '../../assets/styles/styles'

import useUtils from '../../hooks/useUtils'
import useAxios from '../../hooks/useAxios'

const LayoutProfile = ({
  renderScene,
  routes,
  profile,
  hikeDate = false,
  data = {}, // Ici on peut passer le club pour le profil du club ou le user pour le user
}) => {
  const { colors } = useTheme()
  const { formatDate, dateToTimestamp, timestampToDate } = useUtils()
  const { axiosGetWithToken } = useAxios()

  const navigation = useNavigation()

  const isFocused = useIsFocused()

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  // Sert pour la TabView
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)

  const [dateHike, setDateHike] = useState('')
  const [images, setImages] = useState([])
  const [imagesNb, setImagesNb] = useState(0)
  const [loading, setLoading] = useState(false)

  // charges les 4 images pour afficher sur le profile
  useEffect(() => {
    if (isFocused) {
      console.log('FOCUS', 'FOCUS')
      console.log('data', data)
      setLoading(true)
      loadImagesProfile()
      loadImagesNumber()
    }
  }, [isFocused])

  // Va chercher la date de la prochaine rando pour le profile club
  useEffect(() => {
    if (data.next_hike && data.next_hike !== null) {
      if (hikeDate) {
        setDateHike(formatDate(new Date(hikeDate)))
      }
    } else {
      setDateHike('Pas encore de date')
    }
  }, [hikeDate])

  // Permet de récupérer les 4 images du profile
  const loadImagesProfile = async () => {
    const response = await axiosGetWithToken(
      `${profile}/${data.id}/profileImages`
    )

    console.log('images profile', response.data)

    setImages(response.data)
    setLoading(false)
  }

  const loadImagesNumber = async () => {
    const response = await axiosGetWithToken(
      `${profile}/${data.id}/allImagesCount`
    )

    if (response.status === 200) {
      setImagesNb(response.data.count - 4)
    }
  }

  // Change l'index a quand on clic sur le btn
  const handleIndexChange = (index) => setIndex(index)

  // View d'un bouton
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor={darkColor}
      inactiveColor={blackColor}
      indicatorStyle={{ backgroundColor: colors.indicator }}
      renderLabel={({ route, color }) => (
        <Text style={[defaultText, { color }]}>{route.title}</Text>
      )}
      style={{ backgroundColor: primaryColor }}
      renderBadge={({ route }) => {
        if (profile === 'clubs') {
          if (route.key === 'members') {
            if (user.club_id === data.id && user.is_club_admin === 1) {
              if (
                user.user_join_requests_count &&
                user.user_join_requests_count !== null &&
                user.user_join_requests_count !== 0
              ) {
                return (
                  <Text style={[defaultText, styles.badge]}>
                    {user.user_join_requests_count}
                  </Text>
                )
              }
            }
          }
        }

        return null
      }}
    />
  )

  return (
    <View style={{ flex: 1 }}>
      {/* Les 4 dernière images du user/club. La denière est un bouton pour voir toutes les autres images */}
      {images.length > 0 || !loading ? (
        <View style={styles.imagesContainer}>
          {images.length > 0 &&
            images.map((image, index) =>
              images.length !== index + 1 ? (
                <ImageBackground
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  style={styles.imageContainer}
                  source={{ uri: `${URL_SERVER}/storage/${image.image}` }}
                />
              ) : (
                <TouchableOpacity
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  style={styles.imageContainer}
                  onPress={() => {
                    navigation.navigate('ImagesProfile', { profile, data })
                  }}
                >
                  <ImageBackground
                    imageStyle={{ opacity: 0.5 }}
                    source={{ uri: `${URL_SERVER}/storage/${image.image}` }}
                  >
                    <View style={styles.darkness}>
                      <Text style={[defaultText, { color: darkColor }]}>
                        +{imagesNb}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              )
            )}
          {images.length === 0 && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={[defaultText, { color: colors.text }]}>
                Aucune images
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator />
        </View>
      )}

      {/* Si le profile est un club on affiche une information pour la date de la rando */}
      {profile && profile === 'clubs' && (
        <View
          style={{
            backgroundColor: warningColor,
            marginBottom: 5,
            padding: 10,
          }}
        >
          <Text style={[TitleH4, textAlignCenter, { color: darkColor }]}>
            Prochaine Rando prévue le :
          </Text>
          <Text style={[mt10, textAlignCenter, TitleH3, { color: darkColor }]}>
            {dateHike}
          </Text>
        </View>
      )}

      {/* TabView (informations / articles) pour le user - (informations / articles / membres) pour le club */}
      <View style={{ flex: profile && profile === 'clubs' ? 5 : 6 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={handleIndexChange}
          initialLayout={{ width: layout.width }}
          lazy
        />
      </View>
    </View>
  )
}

export default LayoutProfile

const styles = StyleSheet.create({
  imagesContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageContainer: {
    width: 90,
    height: 90,
  },
  darkness: {
    backgroundColor: 'rgba(124,182,109,0.5)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    marginRight: 5,
    marginTop: 3,
    backgroundColor: dangerColor,
    paddingHorizontal: 6,
    borderRadius: 50,
    color: whiteColor,
    fontSize: 15,
  },
})
