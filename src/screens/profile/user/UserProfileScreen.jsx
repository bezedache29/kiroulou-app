import { TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { SceneMap } from 'react-native-tab-view'

import { useStoreState } from 'easy-peasy'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import CustomLabelNavigation from '../../../components/CustomLabelNavigation'
import LayoutProfile from '../../../components/Profile/LayoutProfile'
import UserInformationsScene from './scenes/informations/UserInformationsScene'
import UserPostsScene from './scenes/posts/UserPostsScene'
import useAxios from '../../../hooks/useAxios'

const UserProfileScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { axiosGetWithToken } = useAxios()

  const { userId } = route.params

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const [userName, setUserName] = useState('')
  const [userProfile, setUserProfile] = useState(false)

  // Les titres de la TabView
  const [routes] = useState([
    { key: 'informations', title: 'Informations' },
    { key: 'posts', title: 'Articles' },
  ])

  // Les deux vues du tabView
  const renderScene = ({ route }) => {
    if (route.key === 'informations' && userProfile) {
      return <UserInformationsScene userProfile={userProfile} />
    }
    if (route.key === 'posts' && userProfile) {
      return <UserPostsScene userProfile={userProfile} />
    }

    return null
  }

  useEffect(() => {
    if (user.id !== userId) {
      loadUserProfile()
    } else {
      setUserProfile(user)
    }
  }, [])

  // Permet de récupérer le nom du user a qui appartient le profil
  useEffect(() => {
    if (userProfile) {
      setUserName(
        userProfile.firstname
          ? `${userProfile.firstname} ${userProfile.lastname}`
          : userProfile.email
      )
    }
  }, [userProfile])

  const loadUserProfile = async () => {
    const response = await axiosGetWithToken(`users/${userId}`)

    setUserProfile(response.data)
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomLabelNavigation
        label={userId === user.id ? 'Mon Profil' : `Profil de ${userName}`}
        colors={colors}
        onPress={() => {
          navigation.goBack()
        }}
      />

      {/* Icone en haut a droite qui permet de modifier son profil */}
      {userId === user.id && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditUserProfile', { userProfile })
          }}
          style={{ position: 'absolute', top: 10, right: 20 }}
        >
          <MaterialCommunityIcons
            name="account-edit"
            size={28}
            color={colors.text}
          />
        </TouchableOpacity>
      )}

      {/* Layout qui ajoute une TabView vide */}
      {
        // TODO Possible de mettre un loader ici si trop long
      }
      {userProfile && (
        <LayoutProfile
          renderScene={renderScene}
          routes={routes}
          profile="users"
          data={userProfile}
        />
      )}
    </View>
  )
}
export default UserProfileScreen
