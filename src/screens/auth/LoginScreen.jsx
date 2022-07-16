import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import React from 'react'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import * as Animatable from 'react-native-animatable'

import { useTheme } from 'react-native-paper'

import {
  authTitle,
  defaultContainer,
  defaultText,
  mb30,
  minText,
  ml5,
  mr5,
  ph25,
  textAlignCenter,
} from '../../assets/styles/styles'

import LoginSVG from '../../assets/images/svg/auth/login.svg'
import GoogleSVG from '../../assets/images/svg/auth/icons/google.svg'
import FacebookSVG from '../../assets/images/svg/auth/icons/facebook.svg'
import StravaSVG from '../../assets/images/svg/auth/icons/strava.svg'
import InputField from '../../components/InputField'
import AuthButton from '../../components/AuthButton'
import CustomSocialButton from '../../components/CustomSocialButton'

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme()

  return (
    <SafeAreaView
      style={[defaultContainer, { backgroundColor: colors.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={ph25}>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                borderRadius: 8,
                overflow: 'hidden',
                width: 350,
                height: 250,
                marginVertical: 20,
              }}
            >
              <LoginSVG width={350} height={290} />
            </View>
          </View>

          <Text style={[authTitle, mb30, { color: colors.text }]}>
            Se connecter
          </Text>
        </View>

        <Animatable.View
          animation="fadeInUpBig"
          style={{ flex: 3, backgroundColor: colors.background }}
        >
          <InputField
            label="Adresse e-mail"
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color={colors.icon}
              />
            }
            keyboardType="email-address"
            color={colors.text}
          />

          <InputField
            label="Mot de passe"
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color={colors.icon}
                style={mr5}
              />
            }
            inputType="password"
            color={colors.text}
          />

          <AuthButton label="Je me connecte" onPress={() => {}} />

          <Text
            style={[minText, textAlignCenter, mb30, { color: colors.text }]}
          >
            Ou, se connecter avec une adresse e-mail ...
          </Text>

          <View style={styles.btnsContainer}>
            {/* Bouton Google */}
            <CustomSocialButton onPress={() => {}} color={colors.border}>
              <GoogleSVG height={24} width={24} />
            </CustomSocialButton>

            {/* Bouton Facebook */}
            <CustomSocialButton onPress={() => {}} color={colors.border}>
              <FacebookSVG height={24} width={24} />
            </CustomSocialButton>

            {/* Bouton Strava */}
            <CustomSocialButton onPress={() => {}} color={colors.border}>
              <StravaSVG height={24} width={24} />
            </CustomSocialButton>
          </View>

          <View style={styles.footer}>
            <Text style={[defaultText, { color: colors.text }]}>
              Nouveau sur l'application ?
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Register' }],
                })
              }
            >
              <Text style={[defaultText, ml5, { color: colors.link }]}>
                S'enregistrer
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
})

export default LoginScreen
