import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import React, { useContext, useRef } from 'react'

import { useTheme, TouchableRipple } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'

import CustomLabelNavigation from '../components/CustomLabelNavigation'
import {
  darkColor,
  darkPrimaryColor,
  defaultText,
  defaultTextBold,
  littleText,
  mb10,
  ml10,
  ml20,
  mlAuto,
  mr10,
  mr20,
  mt10,
  mt20,
  my10,
  my20,
  rowCenter,
  secondaryColor,
  textItalic,
  whiteColor,
} from '../assets/styles/styles'
import CustomDivider from '../components/CustomDivider'
import LayoutSection from '../components/Settings/LayoutSection'
import { AppContext } from '../context/Context'

const SettingsScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const paperTheme = useTheme() // Recupère la valeur du darkmode
  const { toggleTheme } = useContext(AppContext)

  const bs = useRef()
  const fall = new Animated.Value(1)

  const sub = 'free'
  const notifications = {
    push: true,
    email: false,
  }

  const renderInner = () => (
    <View style={[styles.panel, { backgroundColor: secondaryColor }]}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Qui peut voir mon profil ?</Text>
        <Text style={styles.panelSubtitle}>Choisis parmi la liste</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={() => {}}>
        <Text style={[defaultTextBold, styles.panelButtonTitle]}>
          Tout le monde
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={() => {}}>
        <Text style={[defaultTextBold, styles.panelButtonTitle]}>
          Mes abonnées
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={() => {}}>
        <Text style={[defaultTextBold, styles.panelButtonTitle]}>
          Seulement moi
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}
      >
        <Text style={[defaultTextBold, styles.panelButtonTitle]}>Annuler</Text>
      </TouchableOpacity>
    </View>
  )

  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: secondaryColor }]}>
      <View style={styles.panelHeader}>
        <View style={[styles.panelHandle, { backgroundColor: colors.text }]} />
      </View>
    </View>
  )

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction
        renderContent={renderInner}
        renderHeader={renderHeader}
        enabledHeaderGestureInteraction
        enabledContentGestureInteraction
        enabledBottomInitialAnimation
      />
      <CustomLabelNavigation
        label="Paramètres"
        colors={colors}
        onPress={() => navigation.goBack()}
      />

      <Animated.View
        style={{
          flex: 1,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}
      >
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
            <TouchableRipple
              onPress={() => {
                bs.current.snapTo(0)
              }}
            >
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
                  {/* Mes abonnés */}
                  {/* Seulement moi */}
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

        {/* Numéro de version de l'application */}
        <View style={[rowCenter, styles.footerContainer]}>
          <Text
            style={[ml20, mb10, littleText, { color: colors.text, flex: 1 }]}
          >
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
      </Animated.View>
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
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: 'red',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    elevation: 4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    color: darkColor,
  },
  panelSubtitle: {
    fontSize: 14,
    color: darkColor,
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: darkPrimaryColor,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    color: whiteColor,
  },
})

export default SettingsScreen
