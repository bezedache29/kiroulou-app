import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native'
import React, { useContext } from 'react'

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'

import { Drawer, TouchableRipple, useTheme } from 'react-native-paper'

import Ionicons from 'react-native-vector-icons/Ionicons'

import {
  dangerColor,
  darkColor,
  defaultText,
  defaultTextBold,
  mt20,
  p20,
  px20,
  py10,
  secondaryColor,
  whiteColor,
} from '../../assets/styles/styles'

import { AppContext } from '../../context/Context'

const imageBackground = require('../../assets/images/png/navigation/drawer.png')

const CustomDrawer = (props) => {
  const { colors } = useTheme()
  const paperTheme = useTheme() // Recupère la valeur du darkmode
  const { toggleTheme } = useContext(AppContext)

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

          <Drawer.Section title="Préférences" style={mt20}>
            {/* Switch dark mode */}
            <TouchableRipple onPress={toggleTheme}>
              <View style={styles.preferences}>
                <Text style={[defaultText, { color: colors.text }]}>
                  Thème Sombre
                </Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
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
        <TouchableOpacity onPress={() => {}} style={py10}>
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
