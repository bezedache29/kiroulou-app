import {
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import { useNavigation } from '@react-navigation/native'

import { useStoreState } from 'easy-peasy'

import { URL_SERVER } from 'react-native-dotenv'

import {
  darkColor,
  defaultLink,
  defaultText,
  littleTitle,
  mb10,
  mb5,
  mr20,
  mt10,
  mt20,
  mt40,
  mx20,
  my30,
  pb20,
  primaryColor,
  secondaryColor,
  TitleH4,
} from '../../../../../assets/styles/styles'

import CustomButtonInfo from '../../../../../components/CustomButtonInfo'

const ClubInformationsScene = ({ club }) => {
  const { colors } = useTheme()

  const navigation = useNavigation()

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const goToHikesClub = () => {
    if (user.premium === 'active') {
      navigation.navigate('HikesClub')
    } else {
      // TODO Alert avec lien premium
      alert('achetez un premium pour voir cette page')
    }
  }

  return (
    <ScrollView style={{ backgroundColor: secondaryColor }}>
      <View style={[pb20, { flex: 1 }]}>
        <View style={[mx20, mt40, styles.header]}>
          {
            // TODO Mettre l'avatar
          }
          {/* <ImageBackground
            source={{
              uri: `${URL_SERVER}/storage/${club.avatar}`,
            }}
            style={[mr20, styles.avatar]}
            imageStyle={styles.avatarStyle}
          /> */}
          <View style={{ flex: 4 }}>
            <Text style={[littleTitle, { color: darkColor }]}>{club.name}</Text>
            <Text style={[defaultText, mt10, { color: darkColor }]}>
              {club.address.city.name}
            </Text>
          </View>
        </View>

        <View style={[my30, mx20]}>
          <Text style={[TitleH4, mt10, mb5, { color: darkColor }]}>
            Adresse du club
          </Text>
          <Text style={[defaultText, { color: darkColor }]}>
            {club.address.street_address}
          </Text>
          <Text style={[defaultText, mb10, { color: darkColor }]}>
            {club.address.zipcode.code} {club.address.city.name}
          </Text>
          {club.website !== null ? (
            <Text
              onPress={() => {
                Linking.openURL('http://cotedeslegendesvtt.free.fr/')
              }}
              style={[defaultLink]}
            >
              http://cotedeslegendesvtt.free.fr/
            </Text>
          ) : (
            <Text style={[defaultLink]}>Pas de site internet</Text>
          )}
        </View>

        <View style={mt20}>
          <CustomButtonInfo
            title="Les randos organisées par le club"
            colors={colors}
            onPress={goToHikesClub}
            backgroundColor={primaryColor}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
  },
  avatarStyle: {
    borderRadius: 50,
  },
})

export default ClubInformationsScene
