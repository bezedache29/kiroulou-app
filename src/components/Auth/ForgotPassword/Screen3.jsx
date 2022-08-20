import { SafeAreaView, Text } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'

import Ionicons from 'react-native-vector-icons/Ionicons'

import { useTheme } from 'react-native-paper'

import { Formik } from 'formik'
import * as yup from 'yup'

import { useNavigation } from '@react-navigation/native'

import {
  dangerColor,
  defaultText,
  mr5,
  my20,
  px25,
} from '../../../assets/styles/styles'

import useAxios from '../../../hooks/useAxios'

import CustomBigButton from '../../CustomBigButton'
import InputField from '../../InputField'

const newPasswordSchema = yup.object().shape({
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

const Screen3 = ({ setScreen, email, token }) => {
  const { colors } = useTheme()
  const { axiosPostWithoutToken } = useAxios()

  const [passwordError, setPasswordError] = useState(false)

  const navigation = useNavigation()

  const submitForm = async (values, resetForm) => {
    const data = {
      email,
      token,
      password: values.password,
    }

    const response = await axiosPostWithoutToken('resetPassword', data)

    if (response.status === 201) {
      setScreen(1)
      resetForm()
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    }

    if (response.status === 422) {
      setPasswordError(response.data.errors.password[0])
    }
  }

  return (
    <Animatable.View
      animation="fadeInUpBig"
      style={{ flex: 3, backgroundColor: colors.background }}
    >
      <SafeAreaView
        style={[px25, { flex: 1, backgroundColor: colors.background }]}
      >
        <Text style={[defaultText, my20, { color: colors.text }]}>
          Vous pouvez maintenant changer le mot de passe de votre compte.
        </Text>

        <Formik
          validationSchema={newPasswordSchema}
          initialValues={{ password: '', confirmPassword: '' }}
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
                autoFocus
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

              <CustomBigButton label="Valider" onPress={handleSubmit} />
            </>
          )}
        </Formik>
      </SafeAreaView>
    </Animatable.View>
  )
}

export default Screen3
