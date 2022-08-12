import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import React, { useState } from 'react'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import * as Animatable from 'react-native-animatable'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { useTheme } from 'react-native-paper'
import { Formik } from 'formik'
import * as yup from 'yup'

import {
  authTitle,
  dangerColor,
  defaultContainer,
  defaultText,
  mb30,
  minText,
  ml5,
  mr5,
  px25,
  textAlignCenter,
} from '../../assets/styles/styles'

import LoginSVG from '../../assets/images/svg/auth/login.svg'
import GoogleSVG from '../../assets/images/svg/auth/icons/google.svg'
import FacebookSVG from '../../assets/images/svg/auth/icons/facebook.svg'
import StravaSVG from '../../assets/images/svg/auth/icons/strava.svg'
import InputField from '../../components/InputField'
import CustomBigButton from '../../components/CustomBigButton'
import CustomSocialButton from '../../components/CustomSocialButton'
import useAxios from '../../hooks/useAxios'

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("L'email doit être un email valide")
    .min(5, 'trop petit')
    .max(40, 'trop long!')
    .required("L'email est obligatoire"),
  password: yup
    .string()
    .min(6, 'trop petit')
    .max(30, 'trop long!')
    .required('Le mot de passe est obligatoire'),
})

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const { axiosPostWithoutToken } = useAxios()

  const [error, setError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  /**
   * A la soumission du formulaire si la validation est bonne :
   * Request API et suivant la réponse :
   * A - Stock un jwt et redirect HomeScreen
   * B - Erreur
   * Reset les values des inputs
   */
  const submitForm = async (values, resetForm) => {
    setError(false)
    setEmailError(false)
    setPasswordError(false)

    const data = {
      email: values.email,
      password: values.password,
    }

    // Request API
    const response = await axiosPostWithoutToken('login', data)

    console.log(response)

    switch (response.status) {
      case 422:
        if (response.data.email) {
          setEmailError(response.data.email[0])
        }
        if (response.data.password) {
          setPasswordError(response.data.password[0])
        }
        break

      case 403:
        setError(response.data.message)
        break

      case 200:
        // navigation.navigate('Login')
        console.log(response.data.auth_token)
        await AsyncStorage.setItem(
          'kro_auth_token',
          JSON.stringify(response.data.auth_token)
        )

        resetForm()

        navigation.reset({
          index: 0,
          routes: [{ name: 'Splash' }],
        })
        break

      default:
    }

    // Request API des datas
    // Retour erreur ?
    // setError(response.message)
    // Sinon

    // JWT dans le localstorage

    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Drawer' }],
    // })
  }

  return (
    <SafeAreaView
      style={[defaultContainer, { backgroundColor: colors.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={px25}>
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
          {/* Début Formulaire de connexion */}
          <Formik
            validationSchema={loginSchema}
            initialValues={{ email: '', password: '', passwordConfirm: '' }}
            onSubmit={(values, { resetForm }) => {
              submitForm(values, resetForm)
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <InputField
                  label="Adresse e-mail"
                  icon={
                    <MaterialIcons
                      name="alternate-email"
                      size={20}
                      color={
                        touched.email && errors.email
                          ? dangerColor
                          : colors.icon
                      }
                    />
                  }
                  keyboardType="email-address"
                  name="email"
                  colors={colors}
                  otherError={error || emailError}
                  error={touched.email && errors.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />

                <InputField
                  label="Mot de passe"
                  icon={
                    <Ionicons
                      name="ios-lock-closed-outline"
                      size={20}
                      color={
                        touched.password && errors.password
                          ? dangerColor
                          : colors.icon
                      }
                      style={mr5}
                    />
                  }
                  inputType="password"
                  colors={colors}
                  otherError={error || passwordError}
                  fieldButtonLabel="Oublié ?"
                  fieldButtonFunction={() => {
                    navigation.navigate('ForgotPassword')
                  }}
                  error={touched.password && errors.password}
                  name="password"
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />

                <CustomBigButton
                  label="Je me connecte"
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
          {/* Fin Formulaire de connexion */}

          <Text
            style={[minText, textAlignCenter, mb30, { color: colors.text }]}
          >
            Ou, se connecter avec une adresse e-mail ...
          </Text>

          {/* Début Icones pour connexion réseaux sociaux */}
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
          {/* Fin Icones pour connexion réseaux sociaux */}

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
