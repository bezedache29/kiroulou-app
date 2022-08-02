import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { TabView, TabBar } from 'react-native-tab-view'

import { useNavigation } from '@react-navigation/native'

import {
  blackColor,
  darkColor,
  defaultText,
  mt10,
  primaryColor,
  textAlignCenter,
  TitleH3,
  TitleH4,
  warningColor,
} from '../../assets/styles/styles'

import useFaker from '../../hooks/useFaker'
import useUtils from '../../hooks/useUtils'

const LayoutProfile = ({
  renderScene,
  routes,
  profile,
  hikeDate = false,
  // data = {}, Ici on peut passer le club pour le profil du club ou le user pour le user
}) => {
  const { colors } = useTheme()
  const { formatDate } = useUtils()
  const navigation = useNavigation()

  // Sert pour la TabView
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)

  const [dateHike, setDateHike] = useState('')

  // Pour les tests
  const [images, setImages] = useState([])
  const { createFakeAlbum } = useFaker()
  useEffect(() => {
    for (let i = 0; i < 4; i++) {
      setImages((oldData) => [...oldData, createFakeAlbum()])
    }
  }, [])

  /**
   * On récupère la date de la rando du club
   * Si pas de date, ou date passé par rapport a celle d'aujourd'hui : On indique pas de rando
   * Sinon : On indique la date de la futur rando, formatée
   * Sert uniquement pour le profil des clubs
   */
  useEffect(() => {
    if (hikeDate) {
      console.log(hikeDate)
      if (hikeDate >= Date.now()) {
        setDateHike(formatDate(hikeDate))
      } else {
        setDateHike('Pas de encore de date')
      }
    }
  }, [hikeDate])

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
    />
  )

  return (
    <View style={{ flex: 1 }}>
      {/* Les 4 dernière images du user/club. La denière est un bouton pour voir toutes les autres images */}
      <View style={styles.imagesContainer}>
        {images &&
          images.map((image, index) =>
            images.length !== index + 1 ? (
              <ImageBackground
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={styles.imageContainer}
                source={{ uri: image.url }}
              />
            ) : (
              <TouchableOpacity
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={styles.imageContainer}
                onPress={() => {
                  navigation.navigate('ImagesProfile', { profile })
                }}
              >
                <ImageBackground
                  imageStyle={{ opacity: 0.5 }}
                  source={{ uri: image.uri }}
                >
                  <View style={styles.darkness}>
                    <Text style={[defaultText, { color: darkColor }]}>+XX</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )
          )}
      </View>

      {/* Si le profile est un club on affiche une information pour la date de la rando */}
      {profile && profile === 'club' && (
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
      <View style={{ flex: profile && profile === 'club' ? 5 : 6 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={handleIndexChange}
          initialLayout={{ width: layout.width }}
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
})
