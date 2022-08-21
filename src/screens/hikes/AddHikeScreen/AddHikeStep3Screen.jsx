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
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import MultipleImagePicker from '@baronha/react-native-multiple-image-picker'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
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

const { width, height } = Dimensions.get('window')
const CARD_HEIGHT = 220
const CARD_WIDTH = width * 0.8

const AddHikeStep3Screen = ({ navigation, route }) => {
  const { colors } = useTheme()

  const { dataSteps } = route.params

  const [flyer, setFlyer] = useState(false)
  const [images, setImages] = useState([])
  const [imgs, setImgs] = useState([])

  const animation = new Animated.Value(0)

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
    console.log('imgs', imgs)
  }, [imgs])

  useEffect(() => {
    console.log('images', images)
    const img = []
    images.forEach((image) => {
      img.push(`file://${image.realPath}`)
    })
    setImgs(img)
  }, [images])

  const createHike = () => {
    if (flyer) {
      // On envoie la request a l'API grace a RNFetchBlob
      // Doit on passer par Formik pour envoyer l'image ??
      // Peut on boucler dans RNFetchBlob pour envoyer le tableau d'images avec ??
    }

    const dataStep3 = {
      flyer: `file://${flyer.realPath}`,
      images: imgs,
    }

    const data = {
      ...dataSteps,
      ...dataStep3,
    }

    console.log('dataAllSteps', data)
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
      setFlyer(response)
      // setImages(response)
    } catch (e) {
      console.log(e.code, e.message)
    }
  }

  const openPickerMultiple = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        selectedAssets: images,
        mediaType: 'image',
        singleSelectedMode: false,
        doneTitle: 'Valider',
        cancelTitle: 'Annuler',
        selectedColor: darkPrimaryColor,
      })
      console.log('response: ', response)
      setImages(response)
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
        <ScrollView showsVerticalScrollIndicator={false}>
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
                          uri: `file://${flyer.realPath}`,
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
                      onPress={() => openPickerMultiple()}
                    >
                      <MaterialCommunityIcons
                        name="plus-circle"
                        size={30}
                        color={darkPrimaryColor}
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
                              uri: `file://${
                                image?.crop?.cropPath ?? image.realPath
                              }`,
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
    resizeMode: 'stretch',
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
