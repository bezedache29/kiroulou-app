import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'

import { useTheme } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  darkPrimaryColor,
  defaultText,
  littleTitle,
  ml10,
  mt10,
  rowCenter,
} from '../../../assets/styles/styles'

import AddHikeLayout from '../../../components/Hikes/AddHikeLayout'
import CustomDivider from '../../../components/CustomDivider'
import CustomIconButton from '../../../components/CustomIconButton'

const { width, height } = Dimensions.get('window')

const AddHikeStep3Screen = ({ navigation, route }) => {
  const { colors } = useTheme()

  const { dataSteps } = route.params

  const [flyer, setFlyer] = useState(false)
  const [images, setImages] = useState([])

  const createHike = () => {
    const dataStep3 = {
      flyer: '', // Nom du flyer stocké en DB
      images: [], // Nom des images stockées en DB
    }

    const data = {
      ...dataSteps,
      ...dataStep3,
    }

    console.log('dataAllSteps', data)
  }

  return (
    <AddHikeLayout
      label="Créer une rando"
      step={3}
      subTitle="Partagez votre flyer et diverses images / photos en relation avec votre randonnée."
      nextStepCondition={flyer}
      buttonLabel="Créer la rando"
      buttonPress={createHike}
    >
      <CustomDivider />

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
              <TouchableOpacity onPress={() => {}} style={styles.flyerBtn}>
                <Image
                  source={
                    !flyer
                      ? require('../../../assets/images/png/default-flyer.png')
                      : {
                          // ici URI du flyer depuis l'api
                          uri: 'https://www.nafix.fr/tracts/2022_tract/tract_72407.jpg',
                        }
                  }
                  style={[
                    {
                      borderRadius: !flyer && 8,
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
                    <TouchableOpacity style={styles.iconPlus}>
                      <MaterialCommunityIcons
                        name="plus-circle"
                        size={30}
                        color={darkPrimaryColor}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                {images.length === 0 && (
                  <CustomIconButton
                    onPress={() => {}}
                    text="Ajouter des images / photos"
                    size="100%"
                  />
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
})
