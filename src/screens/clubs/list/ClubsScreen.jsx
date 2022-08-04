import { View, useWindowDimensions, Text } from 'react-native'
import React, { useState } from 'react'

import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

import { useTheme } from 'react-native-paper'

import TabContainer from '../../../components/Navigation/TabContainer'
import HeaderDrawer from '../../../components/Navigation/HeaderDrawer'

import {
  blackColor,
  darkColor,
  defaultText,
  primaryColor,
} from '../../../assets/styles/styles'

import ClubsByName from './ClubsByName/ClubsByName'
import ClubsByCity from './ClubsByCity/ClubsByCity'

const ClubsScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: 'Nom du club' },
    { key: 'second', title: 'Ville du club' },
  ])

  // Les deux vues du tabView
  const renderScene = SceneMap({
    first: ClubsByName, // Vue recherche par nom de club
    second: ClubsByCity, // Vue recherche par ville de club
  })

  // Change l'index a quand on clic sur le btn
  const handleIndexChange = (index) => setIndex(index)

  // View d'un bouton
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor={darkColor}
      inactiveColor={blackColor}
      indicatorStyle={{ backgroundColor: colors.indicator }}
      renderLabel={({ route, color }) => (
        <Text style={[defaultText, { color }]}>{route.title}</Text>
      )}
      style={{ backgroundColor: primaryColor }}
    />
  )

  return (
    <TabContainer>
      <View style={{ flex: 1 }}>
        {/* Header avec avatar */}
        <HeaderDrawer
          title="Les clubs"
          onPress={() => navigation.openDrawer()}
        />

        <View style={{ flex: 5 }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={handleIndexChange}
            initialLayout={{ width: layout.width }}
          />
        </View>
      </View>
    </TabContainer>
  )
}

export default ClubsScreen
