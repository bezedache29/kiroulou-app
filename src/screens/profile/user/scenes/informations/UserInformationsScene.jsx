import {
  ImageBackground,
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
  defaultText,
  littleTitle,
  mr20,
  mt10,
  mt20,
  mt40,
  mt50,
  mx20,
  primaryColor,
  secondaryColor,
} from '../../../../../assets/styles/styles'

import CustomButtonInfo from '../../../../../components/CustomButtonInfo'

const UserInformationsScene = () => {
  const { colors } = useTheme()

  const navigation = useNavigation()

  return (
    <ScrollView style={{ backgroundColor: secondaryColor }}>
      <View style={[mx20, mt40, styles.header]}>
        <ImageBackground
          source={{
            uri: 'http://lh3.ggpht.com/-OdRx9XAYxkc/TusHxirp8uI/AAAAAAAABpw/lk-2NDvmJY0/Banana%252520Alien%25255B3%25255D.jpg?imgmax=800',
          }}
          style={[mr20, styles.avatar]}
          imageStyle={styles.avatarStyle}
        />
        <View style={{ flex: 4 }}>
          <Text style={[littleTitle, { color: darkColor }]}>Prénom Nom</Text>
          <Text style={[defaultText, mt10, { color: darkColor }]}>
            Ville, DEPARTEMENT
          </Text>
        </View>
      </View>

      {/* Si le user est membre d'un club */}
      <View style={mt50}>
        <CustomButtonInfo
          title="Club : Nom du Club"
          colors={colors}
          onPress={() => {}}
          backgroundColor={primaryColor}
        />
      </View>

      {/* Liste des vélos du user, qui serviront pour l'algo des entretiens / recherches de pièces */}
      <View style={mt20}>
        <CustomButtonInfo
          title="Mes vélos"
          colors={colors}
          onPress={() => {
            navigation.navigate('BikesUser')
          }}
          backgroundColor={primaryColor}
        />
      </View>

      {/* Liste les randos que le user hype, pour avoir un aperçu */}
      <View style={mt20}>
        <CustomButtonInfo
          title="Les clubs que je suis"
          colors={colors}
          onPress={() => {
            navigation.navigate('ClubsUserFollow')
          }}
          backgroundColor={primaryColor}
        />
      </View>

      <View style={mt20}>
        <CustomButtonInfo
          title="Les personnes que je suis"
          colors={colors}
          onPress={() => {
            navigation.navigate('UsersUserFollow')
          }}
          backgroundColor={primaryColor}
        />
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

export default UserInformationsScene
