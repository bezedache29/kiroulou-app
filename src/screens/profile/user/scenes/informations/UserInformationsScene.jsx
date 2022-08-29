import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useEffect } from 'react'

import { useTheme } from 'react-native-paper'

import { useNavigation } from '@react-navigation/native'

import { URL_SERVER } from 'react-native-dotenv'

import {
  darkColor,
  defaultText,
  littleTitle,
  mb20,
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

const UserInformationsScene = ({ userProfile }) => {
  const { colors } = useTheme()

  const navigation = useNavigation()

  console.log('userProfile', userProfile)

  return (
    <ScrollView style={{ backgroundColor: secondaryColor }}>
      <View style={[mb20, { flex: 1 }]}>
        <View style={[mx20, mt40, styles.header]}>
          <ImageBackground
            source={{
              uri: `${URL_SERVER}/storage/${userProfile.avatar}`,
            }}
            style={[mr20, styles.avatar]}
            imageStyle={styles.avatarStyle}
          />
          <View style={{ flex: 4 }}>
            <Text style={[littleTitle, { color: darkColor }]}>
              {userProfile.firstame
                ? `${userProfile.firstame} ${userProfile.lastname}`
                : userProfile.email}
            </Text>
            <Text style={[defaultText, mt10, { color: darkColor }]}>
              {userProfile.address
                ? `${userProfile.address.city.name} ${userProfile.address.department}`
                : 'Adresse non renseigné'}
            </Text>
          </View>
        </View>
        {/* Si le user est membre d'un club */}
        <CustomButtonInfo
          title={`Club : ${userProfile.club_name}`}
          colors={colors}
          onPress={() =>
            navigation.navigate('ClubProfile', { clubId: userProfile.club_id })
          }
          disabled={userProfile.club_id === null}
          backgroundColor={primaryColor}
          style={mt50}
        />
        {/* Liste des vélos du user, qui serviront pour l'algo des entretiens / recherches de pièces */}
        <CustomButtonInfo
          title="Mes vélos"
          colors={colors}
          onPress={() => {
            navigation.navigate('BikesUser', { userId: userProfile.id })
          }}
          backgroundColor={primaryColor}
          style={mt20}
        />
        {/* Liste les randos que le user hype, pour avoir un aperçu */}
        <CustomButtonInfo
          title="Les clubs que je suis"
          colors={colors}
          onPress={() => {
            navigation.navigate('ClubsUserFollow', { userId: userProfile.id })
          }}
          backgroundColor={primaryColor}
          style={mt20}
        />
        <CustomButtonInfo
          title="Les personnes que je suis"
          colors={colors}
          onPress={() => {
            navigation.navigate('UsersUserFollow', { userId: userProfile.id })
          }}
          backgroundColor={primaryColor}
          style={mt20}
        />
        {
          // TODO Bouton follow / Unfollow
        }
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
