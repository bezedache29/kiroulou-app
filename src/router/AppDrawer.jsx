import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer'

import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useTheme } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import CustomDrawer from '../components/Navigation/CustomDrawer'

import AppTabs from './AppTabs'
import ClubScreen from '../screens/clubs/ClubScreen'
import PricesScreen from '../screens/prices/PricesScreen'
import {
  darkPrimaryColor,
  defaultText,
  whiteColor,
} from '../assets/styles/styles'

const Drawer = createDrawerNavigator()

const AppDrawer = () => {
  const { colors } = useTheme()

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: darkPrimaryColor,
        drawerActiveTintColor: whiteColor,
        drawerInactiveTintColor: colors.text,
        drawerPosition: 'right',
        drawerLabelStyle: [styles.label, defaultText],
      }}
    >
      <Drawer.Screen
        name="Accueil"
        component={AppTabs}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Mon Club"
        component={ClubScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-group-outline"
              size={22}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Tarifs"
        component={PricesScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="euro" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  label: {
    marginLeft: -25,
    fontSize: 15,
  },
})

export default AppDrawer
