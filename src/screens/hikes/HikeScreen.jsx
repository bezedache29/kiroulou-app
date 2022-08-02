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
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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
  defaultLink,
  darkPrimaryColor,
  whiteColor,
} from '../../assets/styles/styles'

import useFaker from '../../hooks/useFaker'

import CustomContainer from '../../components/CustomContainer'
import CustomDivider from '../../components/CustomDivider'
import CustomBox from '../../components/CustomBox'
import CustomIconButton from '../../components/CustomIconButton'
import CommentHikeCard from '../../components/Hikes/CommentHikeCard'
import CustomCarousel from '../../components/CustomCarousel'
import RouteHike from '../../components/Hikes/RouteHike'
import AvatarHype from '../../components/Hikes/AvatarHype'
import CustomLabelNavigation from '../../components/CustomLabelNavigation'
import CustomImageViewer from '../../components/CustomImageViewer'

const { width, height } = Dimensions.get('window')
const CARD_HEIGHT = 220
const CARD_WIDTH = width * 0.8

const HikeScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { createFakeAlbum } = useFaker()

  const [hike, setHike] = useState({})
  const [images, setImages] = useState([])
  const [isHype, setIsHype] = useState(false)
  const [showFlyer, setShowFlyer] = useState(false)
  const [showImages, setShowImages] = useState(false)
  const [index, setIndex] = useState(0)

  const animation = new Animated.Value(0)

  // On récupère la randonnée via les paramètres de la route
  useEffect(() => {
    if (route.params.hike) {
      setHike(route.params.hike)
    }
  }, [route.params])

  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      setImages((oldData) => [...oldData, createFakeAlbum()])
    }
  }, [])

  return (
    <CustomContainer
      pressBack={() => navigation.goBack()}
      label="Détails de la rando"
    >
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.container}>
            <CustomBox style={styles.leftBox}>
              <TouchableOpacity
                onPress={() => setShowFlyer(true)}
                style={styles.leftContainer}
              >
                <ImageBackground
                  source={{ uri: hike?.flyer }}
                  style={styles.flyer}
                  resizeMode="stretch"
                />
              </TouchableOpacity>

              <View style={{ marginTop: 'auto' }}>
                <CustomIconButton
                  text={isHype ? 'Unhype' : 'Hype'}
                  onPress={() => setIsHype(!isHype)}
                  size="100%"
                  cancel={!!isHype}
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
                Nom de la rando
              </Text>
              <Text style={[defaultText, mb5, { color: colors.textBox }]}>
                Nom du club
              </Text>

              <Text style={[littleTitle, textAlignCenter, my10, styles.date]}>
                11 juin 2022
              </Text>

              <View style={[rowCenter, my10]}>
                <View style={{ flex: 5 }}>
                  <Text style={[defaultText, mb5, { color: colors.textBox }]}>
                    prix public :
                  </Text>
                  <Text style={[defaultText, { color: colors.textBox }]}>
                    prix licencié :
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[defaultText, { color: colors.textBox }]}>
                    5 €
                  </Text>
                  <Text style={[defaultText, { color: colors.textBox }]}>
                    6 €
                  </Text>
                </View>
              </View>

              <CustomDivider addStyle={my5} />

              <Text style={[littleTitle, mt10, { color: colors.textBox }]}>
                Adresse :
              </Text>
              <Text style={[defaultText, { color: colors.textBox }]}>
                Stade George Martin
              </Text>
              <Text style={[defaultText, { color: colors.textBox }]}>
                29260 Lesneven
              </Text>
            </CustomBox>
          </View>

          <CustomBox style={[rowCenter]}>
            <Text style={[mr20, defaultText, { color: colors.textBox }]}>
              Personnes Hypes :
            </Text>
            <View style={[rowCenter]}>
              <AvatarHype />
              <AvatarHype />
              <AvatarHype />
              <AvatarHype />
              <AvatarHype />
              <AvatarHype />
            </View>
          </CustomBox>

          <CustomBox>
            <Text style={[littleTitle, mb20, { color: colors.textBox }]}>
              X parcours :
            </Text>
            <RouteHike />
            <RouteHike />
            <RouteHike />
          </CustomBox>

          <CustomBox>
            <Text style={[littleTitle, mb5, { color: colors.textBox }]}>
              Description :
            </Text>
            <Text style={[defaultText, { color: colors.textBox }]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              recusandae, quisquam maiores repellendus excepturi, quia molestiae
              voluptas illum cumque impedit ad reprehenderit beatae labore nobis
              placeat neque. Doloremque, inventore recusandae.
            </Text>
          </CustomBox>

          {/* Carousel d'images */}
          <CustomBox>
            <Text style={[littleTitle, { color: colors.textBox }]}>
              Images / Photos :
            </Text>
            {images.length ? (
              <CustomCarousel snapToInterval={CARD_WIDTH} animation={animation}>
                {images.map((image, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setIndex(index)
                      setShowImages(true)
                    }}
                    key={image.id}
                    style={[
                      styles.card,
                      { backgroundColor: colors.background },
                    ]}
                  >
                    <ImageBackground
                      source={{ uri: image.url }}
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
          <CustomBox>
            <Text>Application Météo</Text>
          </CustomBox>

          {/* Commentaires */}
          <CustomBox>
            <Text style={[littleTitle, { color: colors.textBox }]}>
              Commentaires
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={[defaultLink, { color: darkPrimaryColor }]}>
                Ajouter un commentaire
              </Text>
            </TouchableOpacity>
            <View>
              <CommentHikeCard goToProfile={() => {}} />
              <CommentHikeCard goToProfile={() => {}} />
            </View>
          </CustomBox>
        </ScrollView>

        {/* Permet de voir le flyer en fullScreen */}
        <CustomImageViewer
          showModal={showFlyer}
          setShowModal={setShowFlyer}
          imageUrls={[{ url: hike.flyer }]}
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
          imageUrls={images}
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
      </View>
    </CustomContainer>
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
    padding: 10,
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
