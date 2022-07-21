import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import React, { useContext } from 'react'

import { useTheme, TouchableRipple } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import CustomLabelNavigation from '../components/CustomLabelNavigation'
import {
  darkPrimaryColor,
  defaultText,
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
  textItalic,
} from '../assets/styles/styles'
import CustomDivider from '../components/CustomDivider'
import LayoutSection from '../components/Settings/LayoutSection'
import { AppContext } from '../context/Context'

const SettingsScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const paperTheme = useTheme() // Recupère la valeur du darkmode
  const { toggleTheme } = useContext(AppContext)

  const sub = 'free'
  const notifications = {
    push: true,
    email: false,
  }

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <CustomLabelNavigation
        label="Paramètres"
        colors={colors}
        onPress={() => navigation.goBack()}
      />
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
            <Text style={[ml20, defaultText, { flex: 2, color: colors.text }]}>
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
          <View style={[rowCenter, my20]}>
            <Text style={[ml20, defaultText, { flex: 2, color: colors.text }]}>
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
        </LayoutSection>

        <CustomDivider addStyle={[mt20, mb10]} />

        {/* PREFERENCES */}
        <LayoutSection
          title="Préférences"
          icon={
            <MaterialCommunityIcons name="cog" size={24} color={colors.icon} />
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
})

export default SettingsScreen
