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

import RegisterSVG from '../../assets/images/svg/auth/register.svg'
import GoogleSVG from '../../assets/images/svg/auth/icons/google.svg'
import FacebookSVG from '../../assets/images/svg/auth/icons/facebook.svg'
import StravaSVG from '../../assets/images/svg/auth/icons/strava.svg'

import InputField from '../../components/InputField'
import AuthButton from '../../components/AuthButton'
import CustomSocialButton from '../../components/CustomSocialButton'

const registerSchema = yup.object().shape({
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
  passwordConfirm: yup
    .string()
    .min(6, 'trop petit')
    .max(30, 'trop long!')
    .required('La confirmation de mot de passe est obligatoire')
    .oneOf(
      [yup.ref('password'), null],
      'Le mot de passe de confirmation ne correspond pas'
    ),
})

const RegisterScreen = ({ navigation }) => {
  const { colors } = useTheme()

  const [emailError, setEmailError] = useState(false)

  const submitForm = (values) => {
    setEmailError(false)
    // Check en DB si le mail n'existe pas deja
    // Si oui
    // setEmailError(response.message)
    // Sinon
    const data = {
      email: values.email,
      password: values.password,
    }
    console.log(data)
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
              <RegisterSVG width={350} height={290} />
            </View>
          </View>

          <Text style={[authTitle, mb30, { color: colors.text }]}>
            S'enregistrer
          </Text>
        </View>

        <Animatable.View
          animation="fadeInUpBig"
          style={{ flex: 3, backgroundColor: colors.background }}
        >
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

          <Text style={[minText, textAlignCenter, { color: colors.text }]}>
            Ou, s'enregistrer avec une adresse e-mail ...
          </Text>

          <Formik
            validationSchema={registerSchema}
            initialValues={{ email: '', password: '', passwordConfirm: '' }}
            onSubmit={submitForm}
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
                        (touched.email && errors.email) || emailError
                          ? dangerColor
                          : colors.icon
                      }
                    />
                  }
                  keyboardType="email-address"
                  colors={colors}
                  otherError={emailError}
                  error={touched.email && errors.email}
                  name="email"
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
                  error={touched.password && errors.password}
                  name="password"
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />

                <InputField
                  label="Confirmer le mot de passe"
                  icon={
                    <Ionicons
                      name="ios-lock-closed-outline"
                      size={20}
                      color={
                        touched.passwordConfirm && errors.passwordConfirm
                          ? dangerColor
                          : colors.icon
                      }
                      style={mr5}
                    />
                  }
                  inputType="password"
                  colors={colors}
                  error={touched.passwordConfirm && errors.passwordConfirm}
                  name="passwordConfirm"
                  onChange={handleChange('passwordConfirm')}
                  onBlur={handleBlur('passwordConfirm')}
                  value={values.passwordConfirm}
                />

                <AuthButton label="Créer mon compte" onPress={handleSubmit} />
              </>
            )}
          </Formik>

          <View style={styles.footer}>
            <Text style={[defaultText, { color: colors.text }]}>
              Déjà enregistré ?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[defaultText, ml5, { color: colors.link }]}>
                Se connecter
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

export default RegisterScreen
