import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import * as Animatable from 'react-native-animatable'

import { useTheme } from 'react-native-paper'
import { Formik } from 'formik'

import LinearGradient from 'react-native-linear-gradient'
import registerSchema from '../../validationSchemas/registerSchema'

import {
  authTitle,
  dangerColor,
  darkPrimaryColor,
  defaultContainer,
  defaultText,
  mb30,
  minText,
  ml5,
  mr5,
  primaryColor,
  px25,
  textAlignCenter,
  TitleH3,
  whiteColor,
} from '../../assets/styles/styles'

import RegisterSVG from '../../assets/images/svg/auth/register.svg'
import GoogleSVG from '../../assets/images/svg/auth/icons/google.svg'
import FacebookSVG from '../../assets/images/svg/auth/icons/facebook.svg'
import StravaSVG from '../../assets/images/svg/auth/icons/strava.svg'

import InputField from '../../components/InputField'
import CustomBigButton from '../../components/CustomBigButton'
import CustomSocialButton from '../../components/CustomSocialButton'
import CustomLink from '../../components/CustomLink'
import useAxios from '../../hooks/useAxios'
import CustomAlert from '../../components/CustomAlert'

const RegisterScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const { axiosPostWithoutToken } = useAxios()

  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [messageAlert, setMessageAlert] = useState('')
  const [formData, setFormData] = useState()

  // A la soumission du formulaire, fait pop une modal pour les mentions légales
  const submitForm = (values, resetForm) => {
    setEmailError(false)
    setPasswordError(false)
    const data = {
      email: values.email,
      password: values.password,
    }
    setShowModal(true)
    setFormData(data)
    resetForm()
  }

  /**
   * Envoie les datas du formulaire a l'api pour créer le user
   */
  const createAccount = async () => {
    setShowModal(false)

    // Request API
    const response = await axiosPostWithoutToken('register', formData)

    switch (response.status) {
      case 409:
        // Pop Alert avec le message
        setMessageAlert(response.data.message)
        setShowErrorAlert(true)
        break

      case 422:
        if (response.data.email) {
          setEmailError(response.data.email[0])
        }

        if (response.data.password) {
          setPasswordError(response.data.password[0])
        }
        break

      case 201:
        navigation.navigate('Login')
        break

      default:
    }

    setFormData({})
  }

  return (
    <SafeAreaView
      style={[defaultContainer, { backgroundColor: colors.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={px25}>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.containerSVG}>
              <RegisterSVG width={350} height={290} />
            </View>
          </View>

          <Text style={[authTitle, { color: colors.text }]}>S'enregistrer</Text>
        </View>

        <Animatable.View
          animation="fadeInUpBig"
          style={{ flex: 3, backgroundColor: colors.background }}
        >
          {/* <View style={styles.btnsContainer}> */}
          {/* Bouton Google */}
          {/* <CustomSocialButton onPress={() => {}} color={colors.border}>
              <GoogleSVG height={24} width={24} />
            </CustomSocialButton> */}

          {/* Bouton Facebook */}
          {/* <CustomSocialButton onPress={() => {}} color={colors.border}>
              <FacebookSVG height={24} width={24} />
            </CustomSocialButton> */}

          {/* Bouton Strava */}
          {/* <CustomSocialButton onPress={() => {}} color={colors.border}>
              <StravaSVG height={24} width={24} />
            </CustomSocialButton> */}
          {/* </View> */}

          {/* <Text style={[minText, textAlignCenter, { color: colors.text }]}>
            Ou, s'enregistrer avec une adresse e-mail ...
          </Text> */}

          <Formik
            validationSchema={registerSchema}
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
                        (touched.email && errors.email) || emailError
                          ? dangerColor
                          : colors.icon
                      }
                    />
                  }
                  keyboardType="email-address"
                  colors={colors}
                  // otherError={emailError}
                  error={(touched.email && errors.email) || emailError}
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
                        (touched.password && errors.password) || passwordError
                          ? dangerColor
                          : colors.icon
                      }
                      style={mr5}
                    />
                  }
                  inputType="password"
                  colors={colors}
                  error={(touched.password && errors.password) || passwordError}
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

                <CustomBigButton
                  label="Créer mon compte"
                  onPress={handleSubmit}
                />
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

      {/* Modal pour acccepter les mentions légales */}
      <Modal
        isVisible={showModal}
        animationIn="slideInUp"
        onBackButtonPress={() => {
          setShowModal(false)
        }}
      >
        <View
          style={[
            {
              borderColor: colors.border,
              backgroundColor: colors.background,
            },
            styles.modalContainer,
          ]}
        >
          <Text
            style={[TitleH3, textAlignCenter, mb30, { color: colors.text }]}
          >
            Créer mon compte
          </Text>
          <Text style={[defaultText, mb30, { color: colors.text }]}>
            Afin de pouvoir vous inscrire il vous faut lire et accepter les{' '}
            <CustomLink
              onPress={() => {
                navigation.navigate('LegalNotice')
              }}
              label="mentions légales"
              colors={colors}
            />{' '}
            de l'application mobile.
          </Text>

          <TouchableOpacity onPress={createAccount}>
            <LinearGradient
              colors={[primaryColor, darkPrimaryColor]}
              style={styles.btnCreate}
            >
              <Text style={[defaultText, { color: whiteColor }]}>
                J'ai lu et j'accepte des mentions légales
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Text
              style={[
                defaultText,
                textAlignCenter,
                { textDecorationLine: 'underline', color: colors.link },
              ]}
            >
              Je n'accepte pas les mentions légales
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <CustomAlert
        showAlert={showErrorAlert}
        title="Erreur !"
        message={messageAlert}
        cancelText="Fermer"
        showConfirmButton={false}
        onDismiss={() => {
          setShowErrorAlert(false)
          setMessageAlert('')
        }}
        onConfirmPressed={() => setShowErrorAlert(false)}
        onCancelPressed={() => {
          setShowErrorAlert(false)
          setMessageAlert('')
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  containerSVG: {
    borderRadius: 8,
    overflow: 'hidden',
    width: 350,
    height: 250,
    marginVertical: 20,
  },
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
  modalContainer: {
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: darkPrimaryColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 15,
  },
  btnCreate: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 20,
  },
})

export default RegisterScreen
