import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native'
import React, { useCallback, useContext, useRef, useState } from 'react'

import { useTheme, TouchableRipple } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { GestureHandlerRootView } from 'react-native-gesture-handler'

import {
  cancelColor,
  darkColor,
  darkPrimaryColor,
  defaultText,
  defaultTextBold,
  grayColor,
  littleText,
  mb10,
  mb30,
  ml10,
  ml20,
  mlAuto,
  mr10,
  mr20,
  mt10,
  mt20,
  my10,
  my20,
  primaryColor,
  rowCenter,
  secondaryColor,
  textAlignCenter,
  textItalic,
  TitleH4,
} from '../assets/styles/styles'

import CustomLabelNavigation from '../components/CustomLabelNavigation'
import CustomDivider from '../components/CustomDivider'
import LayoutSection from '../components/Settings/LayoutSection'
import { AppContext } from '../context/Context'
import BottomSheet from '../components/BottomSheet'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const SettingsScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const paperTheme = useTheme() // Recupère la valeur du darkmode
  const { toggleTheme } = useContext(AppContext)

  const animation = useRef(new Animated.Value(0)).current

  // State pour changer couleur et zindex quand le bottomSheet est ouvert / fermer
  const [overlay, setOverlay] = useState(false)

  const sub = 'free'
  const notifications = {
    push: true,
    email: false,
  }
  const showProfile = 'all'

  // Ref pour la bottomSheet du choix de la vue de profil
  const bottomSheetRef = useRef(null)

  // Permet d'ouvrir la bottomSheet pour choisir le type de vue de profil
  const openBottomSheet = useCallback(() => {
    setOverlay(true)
    bottomSheetRef?.current?.scrollTo(-SCREEN_HEIGHT / 1.8)
  }, [])

  // Permet de fermer la bottomSheet pour choisir le type de vue de profil
  const closeBottomSheet = useCallback(() => {
    setOverlay(false)
    bottomSheetRef?.current?.scrollTo(0)
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <CustomLabelNavigation
        label="Paramètres"
        colors={colors}
        onPress={() => navigation.goBack()}
      />

      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* Overlay quand on clic sur le changement de vue du profil */}
        {/* Change la couleur de l'arriere plan et le zindex */}
        {overlay && (
          <Animated.View
            style={[
              styles.overlay,
              {
                backgroundColor: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [grayColor, darkColor],
                }),
              },
            ]}
          />
        )}

        {/* BottomSheet pour choisir la vue du profile */}
        <BottomSheet ref={bottomSheetRef}>
          <View style={styles.panelHeader}>
            <Text
              style={[
                textAlignCenter,
                TitleH4,
                mt10,
                mb30,
                { color: darkColor },
              ]}
            >
              Qui peut voir mon profil ?
            </Text>

            <TouchableOpacity
              onPress={() => {}}
              disabled={showProfile === 'all'}
              style={[
                styles.panelButton,
                {
                  backgroundColor:
                    showProfile === 'all' ? primaryColor : darkPrimaryColor,
                },
              ]}
            >
              <Text style={[defaultTextBold, { color: colors.reverseText }]}>
                Tout le monde
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}} style={styles.panelButton}>
              <Text style={[defaultTextBold, { color: colors.reverseText }]}>
                Mes abonnés
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}} style={styles.panelButton}>
              <Text style={[defaultTextBold, { color: colors.reverseText }]}>
                Seulement moi
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={closeBottomSheet}
              style={[styles.panelButton, { backgroundColor: cancelColor }]}
            >
              <Text style={[defaultTextBold, { color: colors.reverseText }]}>
                Annuler
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>

        <ScrollView>
          {/* MON COMPTE */}
          <LayoutSection
            title="Compte"
            icon={
              <MaterialCommunityIcons
                name="account-cog"
                size={24}
                color={colors.icon}
              />
            }
          >
            <View style={[rowCenter, my20]}>
              {/* Première option Abonnements */}
              <Text
                style={[ml20, defaultText, { flex: 2, color: colors.text }]}
              >
                Abonnement actuel :
              </Text>
              <Text
                style={[
                  sub === 'free' ? textItalic : defaultText,
                  mr20,
                  {
                    flex: 1,
                    color: sub === 'free' ? colors.text : darkPrimaryColor,
                    textAlign: 'right',
                  },
                ]}
              >
                Gratuit
              </Text>
            </View>

            {/* Deuxième option pour choisir qui peut voir le profil */}
            <TouchableRipple onPress={openBottomSheet}>
              <View style={[rowCenter, my20]}>
                <Text
                  style={[ml20, defaultText, { flex: 2, color: colors.text }]}
                >
                  Qui peut voir mon profil ?
                </Text>
                <Text
                  style={[
                    defaultText,
                    mr20,
                    {
                      flex: 1,
                      color: colors.text,
                      textAlign: 'right',
                    },
                  ]}
                >
                  Tout le monde
                </Text>
              </View>
            </TouchableRipple>
          </LayoutSection>

          <CustomDivider addStyle={[mt20, mb10]} />

          {/* PREFERENCES */}
          <LayoutSection
            title="Préférences"
            icon={
              <MaterialCommunityIcons
                name="cog"
                size={24}
                color={colors.icon}
              />
            }
          >
            {/* Dark Mode */}
            <TouchableRipple onPress={toggleTheme}>
              <View style={[styles.preferences, my10]}>
                <Text style={[defaultText, ml20, { color: colors.text }]}>
                  Thème Sombre
                </Text>
                <View pointerEvents="none" style={[mlAuto, mr10]}>
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>

            {/* Notifications */}
            <View style={[rowCenter, my10]}>
              <Text style={[ml20, defaultText, { color: colors.text }]}>
                Notifications
              </Text>
              <View style={[rowCenter, mlAuto, mr20]}>
                {/* PUSH */}
                <TouchableOpacity onPress={() => {}}>
                  <MaterialCommunityIcons
                    name={
                      notifications.push
                        ? 'cellphone-message'
                        : 'cellphone-message-off'
                    }
                    size={30}
                    color={notifications.push ? colors.icon : colors.text}
                    style={mr10}
                  />
                </TouchableOpacity>

                {/* EMAIL */}
                <TouchableOpacity onPress={() => {}}>
                  <MaterialCommunityIcons
                    name={notifications.email ? 'email' : 'email-off'}
                    size={30}
                    color={notifications.email ? colors.icon : colors.text}
                    style={ml10}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LayoutSection>

          <CustomDivider addStyle={[mt20, mb10]} />

          {/* AIDES */}
          <LayoutSection
            title="Aide"
            icon={
              <MaterialCommunityIcons
                name="help-circle"
                size={24}
                color={colors.icon}
              />
            }
          >
            {/* FAQ */}
            <TouchableRipple
              onPress={() => {
                navigation.navigate('SupportAndQuestions')
              }}
              style={mt20}
            >
              <Text style={[defaultText, my10, ml20, { color: colors.text }]}>
                Assistance
              </Text>
            </TouchableRipple>

            {/* Conditions Générales */}
            <TouchableRipple
              onPress={() => {
                navigation.navigate('TermsAndConditions')
              }}
              style={mt10}
            >
              <Text style={[defaultText, my10, ml20, { color: colors.text }]}>
                Conditions Générales
              </Text>
            </TouchableRipple>

            {/* Infos Légales */}
            <TouchableRipple
              onPress={() => {
                navigation.navigate('LegalNotice')
              }}
              style={mt10}
            >
              <Text style={[defaultText, my10, ml20, { color: colors.text }]}>
                Infos Légales
              </Text>
            </TouchableRipple>
          </LayoutSection>
        </ScrollView>
      </GestureHandlerRootView>

      {/* Numéro de version de l'application */}
      <View style={[rowCenter, styles.footerContainer]}>
        <Text style={[ml20, mb10, littleText, { color: colors.text, flex: 1 }]}>
          Version
        </Text>
        <Text
          style={[
            littleText,
            mb10,
            mr20,
            styles.versionNumber,
            { color: colors.text },
          ]}
        >
          v1.0.0
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  preferences: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
  },
  versionNumber: {
    textAlign: 'right',
    flex: 1,
  },
  panelHeader: {
    flex: 1,
    backgroundColor: secondaryColor,
    zIndex: 2,
    paddingHorizontal: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: darkPrimaryColor,
    alignItems: 'center',
    marginVertical: 7,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    opacity: 0.2,
    backgroundColor: 'red',
  },
})

export default SettingsScreen
