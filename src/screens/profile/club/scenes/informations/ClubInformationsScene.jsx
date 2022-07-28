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
  primaryColor,
  secondaryColor,
  TitleH4,
} from '../../../../../assets/styles/styles'

import CustomButtonInfo from '../../../../../components/CustomButtonInfo'

const ClubInformationsScene = () => {
  const { colors } = useTheme()

  const navigation = useNavigation()

  return (
    <ScrollView style={{ backgroundColor: secondaryColor }}>
      <View style={{ flex: 1 }}>
        <View style={[mx20, mt40, styles.header]}>
          <ImageBackground
            source={{
              uri: 'http://lh3.ggpht.com/-OdRx9XAYxkc/TusHxirp8uI/AAAAAAAABpw/lk-2NDvmJY0/Banana%252520Alien%25255B3%25255D.jpg?imgmax=800',
            }}
            style={[mr20, styles.avatar]}
            imageStyle={styles.avatarStyle}
          />
          <View style={{ flex: 4 }}>
            <Text style={[littleTitle, { color: darkColor }]}>Nom du club</Text>
            <Text style={[defaultText, mt10, { color: darkColor }]}>
              Ville, DEPARTEMENT
            </Text>
          </View>
        </View>

        <View style={[my30, mx20]}>
          <Text style={[TitleH4, mt10, mb5, { color: darkColor }]}>
            Adresse du club
          </Text>
          <Text style={[defaultText, { color: darkColor }]}>
            Stade Georges Martin
          </Text>
          <Text style={[defaultText, mb10, { color: darkColor }]}>
            29260 LESNEVEN
          </Text>
          <Text
            onPress={() => {
              Linking.openURL('http://cotedeslegendesvtt.free.fr/')
            }}
            style={[defaultLink]}
          >
            http://cotedeslegendesvtt.free.fr/
          </Text>
        </View>

        <View style={mt20}>
          <CustomButtonInfo
            title="Les randos organisées par le club"
            colors={colors}
            onPress={() => {
              navigation.navigate('ComingSoon')
            }}
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
