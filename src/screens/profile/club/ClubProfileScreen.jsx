import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { useTheme } from 'react-native-paper'

import { SceneMap } from 'react-native-tab-view'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import CustomLabelNavigation from '../../../components/CustomLabelNavigation'
import LayoutProfile from '../../../components/Profile/LayoutProfile'
import ClubInformationsScene from './scenes/informations/ClubInformationsScene'
import ClubPostsScene from './scenes/informations/ClubPostsScene'
import ClubMembersScene from './scenes/informations/ClubMembersScene'

const ClubProfileScreen = ({ navigation }) => {
  const { colors } = useTheme()

  // Les titres de la TabView
  const [routes] = useState([
    { key: 'informations', title: 'Informations' },
    { key: 'posts', title: 'Articles' },
    { key: 'members', title: 'Membres' },
  ])

  // Les deux vues du tabView
  const renderScene = SceneMap({
    informations: ClubInformationsScene,
    posts: ClubPostsScene,
    members: ClubMembersScene,
  })

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomLabelNavigation
        label="Mon club"
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
        onPress={() => {}}
        style={{ position: 'absolute', top: 10, right: 20 }}
      >
        <MaterialCommunityIcons
          name="account-edit"
          size={28}
          color={colors.text}
        />
      </TouchableOpacity>

      {/* Layout qui ajoute une TabView vide */}
      <LayoutProfile renderScene={renderScene} routes={routes} profile="club" />
    </View>
  )
}
export default ClubProfileScreen

const styles = StyleSheet.create({})
