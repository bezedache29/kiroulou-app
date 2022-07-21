import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import React from 'react'

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'

import { useTheme } from 'react-native-paper'

import Ionicons from 'react-native-vector-icons/Ionicons'

import { DrawerActions, useNavigation } from '@react-navigation/native'

import {
  dangerColor,
  darkColor,
  defaultText,
  defaultTextBold,
  p20,
  px20,
  py10,
  secondaryColor,
  whiteColor,
} from '../../assets/styles/styles'

const imageBackground = require('../../assets/images/png/navigation/drawer.png')

const CustomDrawer = (props) => {
  const { colors } = useTheme()

  const navigation = useNavigation()

  /**
   * Permet de fermer le drawer avant d'etre redirigé vers la route voulu
   */
  const goTo = (route) => {
    navigation.dispatch(DrawerActions.closeDrawer())
    navigation.navigate(route)
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: colors.backgroundNav,
          height: '100%',
          paddingTop: -5,
        }}
      >
        <ImageBackground source={imageBackground} style={p20}>
          <Image
            source={{
              uri: 'http://lh3.ggpht.com/-OdRx9XAYxkc/TusHxirp8uI/AAAAAAAABpw/lk-2NDvmJY0/Banana%252520Alien%25255B3%25255D.jpg?imgmax=800',
            }}
            style={[
              styles.avatar,
              {
                borderColor: whiteColor,
              },
            ]}
          />
          <Text style={[defaultText, styles.textHeader]}>Simon Strueux</Text>
          <Text
            style={[
              defaultTextBold,
              styles.textHeader,
              { color: secondaryColor },
            ]}
          >
            CDL VTT
          </Text>
        </ImageBackground>

        <View
          style={{
            flex: 1,
            paddingTop: 10,
            backgroundColor: colors.backgroundNav,
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View
        style={[
          px20,
          py10,
          {
            borderTopWidth: 1,
            borderTopColor: colors.border,
            backgroundColor: colors.backgroundNav,
          },
        ]}
      >
        <TouchableOpacity onPress={() => goTo('Settings')} style={py10}>
          <View style={styles.btnFooter}>
            <Ionicons name="settings-outline" size={22} color={colors.text} />
            <Text style={[defaultText, { marginLeft: 5, color: colors.text }]}>
              Paramètres
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={py10}>
          <View style={styles.btnFooter}>
            <Ionicons name="exit-outline" size={22} color={dangerColor} />
            <Text style={[defaultText, { marginLeft: 5, color: dangerColor }]}>
              Se deconnecter
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
    marginLeft: 'auto',
    borderWidth: 2,
  },
  textHeader: {
    color: whiteColor,
    marginLeft: 'auto',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 50,
    textShadowColor: darkColor,
  },
  btnFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  preferences: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})

export default CustomDrawer
