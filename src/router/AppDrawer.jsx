import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { createDrawerNavigator } from '@react-navigation/drawer'

import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useTheme } from 'react-native-paper'
import { useStoreState } from 'easy-peasy'
import {
  dangerColor,
  darkPrimaryColor,
  defaultText,
  whiteColor,
} from '../assets/styles/styles'

import CustomDrawer from '../components/Navigation/CustomDrawer'

import AppTabs from './AppTabs'
import OnboardingScreen from '../screens/OnboardingScreen'
import UserProfileScreen from '../screens/profile/user/UserProfileScreen'
import ClubProfileScreen from '../screens/profile/club/ClubProfileScreen'
import SubsScreen from '../screens/subs/SubsScreen'

const Drawer = createDrawerNavigator()

const AppDrawer = () => {
  const { colors } = useTheme()

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

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
        name="Mon Profil"
        component={UserProfileScreen}
        initialParams={{ userId: user.id }}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={22}
              color={color}
            />
          ),
        }}
      />

      {user.club_id !== null && (
        <Drawer.Screen
          name="Mon Club"
          component={ClubProfileScreen}
          initialParams={{ clubId: user.club_id }}
          options={{
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-group-outline"
                size={22}
                color={color}
              />
            ),
            drawerLabel: ({ color }) => (
              <View
                style={{
                  marginLeft: -25,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text style={[defaultText, { color }]}>Mon Club</Text>
                {user.user_join_requests_count !== null &&
                  user.user_join_requests_count !== null &&
                  user.user_join_requests_count !== 0 && (
                    <Text style={[defaultText, styles.badge]}>
                      {user.user_join_requests_count}
                    </Text>
                  )}
              </View>
            ),
          }}
        />
      )}

      <Drawer.Screen
        name="Tarifs"
        component={SubsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="euro" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Guide"
        component={OnboardingScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cellphone-information"
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  label: {
    marginLeft: -25,
  },
  badge: {
    marginLeft: 10,
    backgroundColor: dangerColor,
    paddingHorizontal: 6,
    borderRadius: 50,
    color: whiteColor,
    fontSize: 15,
  },
})

export default AppDrawer
