import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'

import { useTheme } from 'react-native-paper'

import { Formik } from 'formik'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  dangerColor,
  darkColor,
  darkPrimaryColor,
  mr5,
  px20,
} from '../../../assets/styles/styles'

import CustomLabelNavigation from '../../../components/CustomLabelNavigation'
import editUserSchema from '../../../validationSchemas/editUserSchema'
import InputField from '../../../components/InputField'
import CustomBigButton from '../../../components/CustomBigButton'

const defaultImage = require('../../../assets/images/png/default-person.png')

const EditUserProfileScreen = ({ navigation }) => {
  const { colors } = useTheme()

  const [emailError, setEmailError] = useState(false)
  const [image, setImage] = useState(defaultImage)

  const submitForm = (values, resetForm) => {
    setEmailError(false)
    // Check en DB si le mail n'existe pas deja
    // Si oui
    // setEmailError(response.message)
    // Sinon
    const data = {
      email: values.email,
      firstname: values.firstname,
      lastname: values.lastname,
      address: values.address,
      country: values.country,
    }
    console.log(data)
    resetForm()
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomLabelNavigation
        label="Modifier mon profil"
        colors={colors}
        onPress={() => {
          navigation.goBack()
        }}
      />

      <ScrollView>
        {/* Image / logo du club */}
        <View style={{ alignSelf: 'center', marginTop: 50 }}>
          <TouchableOpacity style={styles.imageContainer} onPress={() => {}}>
            <Image style={styles.image} source={image} />
          </TouchableOpacity>
        </View>

        <View style={px20}>
          <Formik
            validationSchema={editUserSchema}
            initialValues={{
              email: '',
              firstname: '',
              lastname: '',
              address: '',
              country: '',
            }}
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
                  otherError={emailError}
                  error={(touched.email && errors.email) || emailError}
                  name="email"
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />

                <InputField
                  label="Prénom"
                  icon={
                    <MaterialCommunityIcons
                      name="shield-account"
                      size={20}
                      color={
                        touched.firstname && errors.firstname
                          ? dangerColor
                          : colors.icon
                      }
                      style={mr5}
                    />
                  }
                  colors={colors}
                  error={touched.firstname && errors.firstname}
                  name="firstname"
                  onChange={handleChange('firstname')}
                  onBlur={handleBlur('firstname')}
                  value={values.firstname}
                />

                <InputField
                  label="Nom"
                  icon={
                    <MaterialCommunityIcons
                      name="shield-account"
                      size={20}
                      color={
                        touched.lastname && errors.lastname
                          ? dangerColor
                          : colors.icon
                      }
                      style={mr5}
                    />
                  }
                  colors={colors}
                  error={touched.lastname && errors.lastname}
                  name="lastname"
                  onChange={handleChange('lastname')}
                  onBlur={handleBlur('lastname')}
                  value={values.lastname}
                />

                <InputField
                  label="Adresse"
                  icon={
                    <MaterialCommunityIcons
                      name="home-city"
                      size={20}
                      color={
                        touched.address && errors.address
                          ? dangerColor
                          : colors.icon
                      }
                      style={mr5}
                    />
                  }
                  colors={colors}
                  error={touched.address && errors.address}
                  name="address"
                  onChange={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                />

                <InputField
                  label="Département"
                  icon={
                    <MaterialCommunityIcons
                      name="home-group"
                      size={20}
                      color={
                        touched.country && errors.country
                          ? dangerColor
                          : colors.icon
                      }
                      style={mr5}
                    />
                  }
                  colors={colors}
                  error={touched.country && errors.country}
                  name="country"
                  onChange={handleChange('country')}
                  onBlur={handleBlur('country')}
                  value={values.country}
                />

                <CustomBigButton
                  label="Modifier mon profil"
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  )
}

export default EditUserProfileScreen

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: darkPrimaryColor,
    borderRadius: 80,
    padding: 5,
    marginBottom: 20,
    shadowColor: darkColor,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 0.35,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 150,
  },
  image: {
    padding: 5,
    width: '100%',
    height: '100%',
    borderRadius: 80,
  },
})
