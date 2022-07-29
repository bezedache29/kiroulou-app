import { TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { useTheme } from 'react-native-paper'

import { SceneMap } from 'react-native-tab-view'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import CustomLabelNavigation from '../../../components/CustomLabelNavigation'
import LayoutProfile from '../../../components/Profile/LayoutProfile'
import UserInformationsScene from './scenes/informations/UserInformationsScene'
import UserPostsScene from './scenes/posts/UserPostsScene'

const UserProfileScreen = ({ navigation }) => {
  const { colors } = useTheme()

  // Les titres de la TabView
  const [routes] = useState([
    { key: 'informations', title: 'Informations' },
    { key: 'posts', title: 'Articles' },
  ])

  // Les deux vues du tabView
  const renderScene = SceneMap({
    informations: UserInformationsScene,
    posts: UserPostsScene,
  })

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomLabelNavigation
        label="Mon Profil"
        colors={colors}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Drawer' }],
          })
        }}
      />

      {/* Icone en haut a droite qui permet de modifier son profil */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EditUserProfile')
        }}
        style={{ position: 'absolute', top: 10, right: 20 }}
      >
        <MaterialCommunityIcons
          name="account-edit"
          size={28}
          color={colors.text}
        />
      </TouchableOpacity>

      {/* Layout qui ajoute une TabView vide */}
      <LayoutProfile renderScene={renderScene} routes={routes} profile="user" />
    </View>
  )
}
export default UserProfileScreen
