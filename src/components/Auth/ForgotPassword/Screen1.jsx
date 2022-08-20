import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useTheme } from 'react-native-paper'

import { Formik } from 'formik'
import * as yup from 'yup'

import {
  dangerColor,
  defaultText,
  my20,
  px25,
} from '../../../assets/styles/styles'

import ForgotPwdSVG from '../../../assets/images/svg/auth/pwd-forgot.svg'

import useAxios from '../../../hooks/useAxios'
import InputField from '../../InputField'
import CustomBigButton from '../../CustomBigButton'

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("L'email doit être un email valide")
    .min(5, 'trop petit')
    .max(40, 'trop long!')
    .required("L'email est obligatoire"),
})

const Screen1 = ({ setEmail, setScreen }) => {
  const { colors } = useTheme()
  const { axiosPostWithoutToken } = useAxios()

  const submitForm = async (values, resetForm) => {
    const data = {
      email: values.email,
    }

    const response = await axiosPostWithoutToken('forgot', data)

    if (response.status === 201) {
      setEmail(values.email)
      setScreen(2)
      resetForm()
    }
  }
  return (
    <>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.svgContainer}>
          <ForgotPwdSVG width={350} height={290} />
        </View>
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        style={[px25, { flex: 3, backgroundColor: colors.background }]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: colors.background }}
        >
          <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <Text style={[defaultText, my20, { color: colors.text }]}>
              Envoyez-moi un e-mail afin de redéfinir mon mot de passe.
            </Text>

            <Formik
              validationSchema={forgotPasswordSchema}
              initialValues={{ email: '' }}
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
                    colors={colors}
                    error={touched.email && errors.email}
                    name="email"
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />

                  <CustomBigButton
                    label="Recevoir l'email"
                    onPress={handleSubmit}
                  />
                </>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </ScrollView>
      </Animatable.View>
    </>
  )
}

export default Screen1

const styles = StyleSheet.create({
  svgContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    width: 350,
    height: 250,
    marginVertical: 20,
  },
})
