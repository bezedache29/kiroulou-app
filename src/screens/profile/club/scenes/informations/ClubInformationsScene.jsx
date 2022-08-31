import {
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

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
import CustomAlert from '../../../../../components/CustomAlert'
import useAxios from '../../../../../hooks/useAxios'
import useCustomToast from '../../../../../hooks/useCustomToast'
import useServices from '../../../../../hooks/useServices'

const ClubInformationsScene = ({ club }) => {
  console.log(club)
  const { colors } = useTheme()
  const { axiosPostWithToken, axiosGetWithToken } = useAxios()
  const { toastShow } = useCustomToast()
  const { getValidUrl } = useServices()

  const navigation = useNavigation()

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const [showAlertPremium, setShowAlertPremium] = useState(false)
  const [follow, setFollow] = useState(false)

  useEffect(() => {
    checkIfClubFollowed()
  }, [])

  const goToHikesClub = () => {
    if (user.premium === 'active') {
      navigation.navigate('HikesClub')
    } else {
      setShowAlertPremium(true)
    }
  }

  const pressFollow = async () => {
    setFollow(!follow)

    const response = await axiosPostWithToken(
      `clubs/${club.id}/followOrUnfollow`
    )

    if (response.status === 201) {
      toastShow({
        title: 'Club Follow !',
        message: `Vous suiviez désormais ${club.name}`,
      })

      // TODO Notification
    }

    if (response.status === 202) {
      toastShow({
        title: 'Club Unfollow !',
        message: `Vous ne suiviez plus ${club.name}`,
      })

      // TODO Notification
    }
  }

  const checkIfClubFollowed = async () => {
    const response = await axiosGetWithToken(`clubs/${club.id}/isClubFollowed`)

    if (response.status === 200) {
      setFollow(true)
    }
  }

  return (
    <ScrollView style={{ backgroundColor: secondaryColor }}>
      <View style={[pb20, { flex: 1 }]}>
        <View style={[mx20, mt40, styles.header]}>
          <ImageBackground
            source={{
              uri: `${URL_SERVER}/storage/${club.avatar}`,
            }}
            style={[mr20, styles.avatar]}
            imageStyle={styles.avatarStyle}
          />
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
                Linking.openURL(getValidUrl(club.website))
              }}
              style={[defaultLink]}
            >
              {getValidUrl(club.website.toLowerCase())}
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

          {user.club_id !== club.id && (
            <CustomButtonInfo
              title={follow ? 'Ne plus suivre le club' : 'Suivre le club'}
              colors={colors}
              onPress={pressFollow}
              backgroundColor={primaryColor}
              style={mt20}
              iconRight={
                <MaterialIcons
                  name={follow ? 'star' : 'star-outline'}
                  size={30}
                  color={darkColor}
                />
              }
            />
          )}
        </View>
      </View>

      <CustomAlert
        showAlert={showAlertPremium}
        title="Accès refusé !"
        message="Vous devez avoir un compte Premium de niveau 1 minimum pour accéder a cette page"
        onDismiss={() => setShowAlertPremium(false)}
        onCancelPressed={() => setShowAlertPremium(false)}
        onConfirmPressed={() => {
          setShowAlertPremium(false)
          navigation.navigate('Subs')
        }}
        confirmText="Voir les premiums"
        cancelText="Fermer"
      />
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
