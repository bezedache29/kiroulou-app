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

import {
  blackColor,
  darkColor,
  defaultText,
  primaryColor,
} from '../../assets/styles/styles'
import useFaker from '../../hooks/useFaker'

// Tableau factice pour design
// const images = [1, 2, 3, 4]

const LayoutProfile = ({ renderScene, routes, profile }) => {
  const { colors } = useTheme()

  // Sert pour la TabView
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)

  // Pour les tests
  const [images, setImages] = useState([])
  const { createFakeAlbum } = useFaker()
  useEffect(() => {
    for (let i = 0; i < 4; i++) {
      setImages((oldData) => [...oldData, createFakeAlbum()])
    }
  }, [])

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
                style={{ width: 80, height: 80 }}
                source={{ uri: image.uri }}
              />
            ) : (
              <TouchableOpacity
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={styles.imageContainer}
                onPress={() => {}}
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
        <View style={{ flex: 1 }}>
          <Text>Prochaine Rando prévue le :</Text>
          <Text>Date de la prochaine randonnée VTT</Text>
        </View>
      )}

      {/* TabView (informations / articles) pour le user - (informations / articles / membres) pour le club */}
      <View style={{ flex: 5 }}>
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
    width: 80,
    height: 80,
  },
  darkness: {
    backgroundColor: 'rgba(124,182,109,0.5)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
