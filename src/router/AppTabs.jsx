import { StyleSheet } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { useTheme } from 'react-native-paper'

import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { whiteColor, darkColor, secondaryColor } from '../assets/styles/styles'

import { useTabMenu } from '../context/TabContext'

import HomeScreen from '../screens/HomeScreen'
import CustomTabBarIcon from '../components/Navigation/CustomTabBarIcon'
import CustomTabBarButton from '../components/Navigation/CustomTabBarButton'
import CalendarScreen from '../screens/CalendarScreen'
import ClubsScreen from '../screens/clubs/list/ClubsScreen'
import HikesScreen from '../screens/hikes/HikesScreen'

const Tab = createBottomTabNavigator()

const AppTabs = () => {
  const { colors } = useTheme()
  const { opened, toggleOpened } = useTabMenu()

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          backgroundColor: secondaryColor,
          borderWidth: 1,
          borderTopColor: whiteColor,
          borderColor: colors.tabBar,
          borderRadius: 15,
          height: 60,
          shadowColor: darkColor,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home2"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              label="ACCUEIL"
              colors={colors}
              focused={focused || false}
              icon={
                <Ionicons
                  name="home"
                  color={focused ? colors.activeLink : colors.inactiveLink}
                  size={24}
                />
              }
            />
          ),
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />

      <Tab.Screen
        name="Clubs"
        component={ClubsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              label="CLUBS"
              colors={colors}
              focused={focused || false}
              icon={
                <MaterialIcons
                  name="workspaces-filled"
                  color={focused ? colors.activeLink : colors.inactiveLink}
                  size={24}
                />
              }
            />
          ),
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />

      {/* Custom Button au milieu de la tabbar */}
      <Tab.Screen
        name="Add"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="add" color={whiteColor} size={45} />
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton
              {...props}
              opened={opened}
              toggleOpened={toggleOpened}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              label="CALENDRIER"
              colors={colors}
              focused={focused || false}
              icon={
                <Ionicons
                  name="calendar-outline"
                  color={focused ? colors.activeLink : colors.inactiveLink}
                  size={24}
                />
              }
            />
          ),
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />

      <Tab.Screen
        name="Hikes"
        component={HikesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              label="RANDOS"
              colors={colors}
              focused={focused || false}
              icon={
                <MaterialCommunityIcons
                  name="map-search-outline"
                  color={focused ? colors.activeLink : colors.inactiveLink}
                  size={24}
                />
              }
            />
          ),
          tabBarStyle: { display: 'none' }, // Permet de ne pas afficher la BottomTabBar sur cette View
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },
})

export default AppTabs
