import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { useNavigation } from '@react-navigation/native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { URL_SERVER } from 'react-native-dotenv'

import { useStoreState } from 'easy-peasy'

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
import useAxios from '../../../../../hooks/useAxios'
import useCustomToast from '../../../../../hooks/useCustomToast'

const UserInformationsScene = ({ userProfile }) => {
  const { colors } = useTheme()
  const { axiosPostWithToken, axiosGetWithToken } = useAxios()
  const { toastShow } = useCustomToast()

  const navigation = useNavigation()

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  // console.log('userProfile', userProfile)

  const [follow, setFollow] = useState(false)
  const [username, setUsername] = useState('')
  const [userInfo, setUserInfo] = useState(false)

  useEffect(() => {
    checkIfUserFollowed()
    if (user.id === userProfile.id) {
      setUserInfo(true)
      setUsername(
        user.firstname ? `${user.firstname} ${user.lastname}` : user.email
      )
    } else {
      setUsername(
        userProfile.firstname
          ? `${userProfile.firstname} ${userProfile.lastname}`
          : userProfile.email
      )
    }
  }, [])

  const pressFollow = async () => {
    setFollow(!follow)

    const response = await axiosPostWithToken(
      `users/${userInfo ? user.id : userProfile.id}/followOrUnfollow`
    )

    if (response.status === 201) {
      toastShow({
        title: 'Utilisateur Follow !',
        message: `Vous suiviez désormais ${username}`,
      })

      // TODO Notification
    }

    if (response.status === 202) {
      toastShow({
        title: 'Utilisateur Unfollow !',
        message: `Vous ne suiviez plus ${username}`,
      })

      // TODO Notification
    }
  }

  const checkIfUserFollowed = async () => {
    const response = await axiosGetWithToken(
      `users/${userInfo ? user.id : userProfile.id}/isUserFollowed`
    )

    if (response.status === 200) {
      setFollow(true)
    }
  }

  return (
    <ScrollView style={{ backgroundColor: secondaryColor }}>
      <View style={[mb20, { flex: 1 }]}>
        <View style={[mx20, mt40, styles.header]}>
          <ImageBackground
            source={
              user.avatar !== null
                ? {
                    uri: `${URL_SERVER}/storage/${
                      userInfo ? user.avatar : userProfile.avatar
                    }`,
                  }
                : require('../../../../../assets/images/png/default-avatar.png')
            }
            style={[mr20, styles.avatar]}
            imageStyle={styles.avatarStyle}
          />
          <View style={{ flex: 4 }}>
            <Text style={[littleTitle, { color: darkColor }]}>{username}</Text>
            <Text style={[defaultText, mt10, { color: darkColor }]}>
              {userInfo
                ? user.address
                  ? `${user.address.city.name} ${user.address.department}`
                  : 'Adresse non renseigné'
                : userProfile.address
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

        {userProfile.id !== user.id && (
          <CustomButtonInfo
            title={follow ? `Ne plus suivre ${username}` : `Suivre ${username}`}
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
