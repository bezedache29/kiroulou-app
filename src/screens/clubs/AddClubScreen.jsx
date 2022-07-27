import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native'
import React, { useState } from 'react'

import { useTheme } from 'react-native-paper'

import { Formik } from 'formik'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  dangerColor,
  darkColor,
  darkPrimaryColor,
  mr5,
  px20,
} from '../../assets/styles/styles'

import CustomLabelNavigation from '../../components/CustomLabelNavigation'
import InputField from '../../components/InputField'
import CustomBigButton from '../../components/CustomBigButton'

import addClubSchema from '../../validationSchemas/addClubSchema'

const defaultImage = require('../../assets/images/png/default-person.png')

const AddClubScreen = ({ navigation }) => {
  const { colors } = useTheme()

  const [image, setImage] = useState(defaultImage)
  const [clubError, setClubError] = useState(false)

  const submitForm = (values, resetForm) => {
    setClubError(false)
    // Check en DB si le club n'existe pas deja
    // Si oui
    // setClubError(response.message)
    // Sinon
    const data = {
      name: values.name,
      shortName: values.shortName,
      address: values.address,
      country: values.country,
      website: values.website,
    }
    console.log(data)
    resetForm()
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomLabelNavigation
        label="Créer club"
        colors={colors}
        onPress={() => navigation.goBack()}
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
            validationSchema={addClubSchema}
            initialValues={{
              name: '',
              shortName: '',
              address: '',
              country: '',
              website: '',
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
                  label="Nom du club"
                  icon={
                    <MaterialCommunityIcons
                      name="account-tie"
                      size={20}
                      color={
                        (touched.name && errors.name) || clubError
                          ? dangerColor
                          : colors.icon
                      }
                      style={mr5}
                    />
                  }
                  colors={colors}
                  otherError={clubError}
                  error={(touched.name && errors.name) || clubError}
                  name="name"
                  onChange={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />

                <InputField
                  label="Nom raccourci (ex: CDL VTT)"
                  icon={
                    <MaterialCommunityIcons
                      name="shield-account"
                      size={20}
                      color={
                        touched.shortName && errors.shortName
                          ? dangerColor
                          : colors.icon
                      }
                      style={mr5}
                    />
                  }
                  colors={colors}
                  error={touched.shortName && errors.shortName}
                  name="shortName"
                  onChange={handleChange('shortName')}
                  onBlur={handleBlur('shortName')}
                  value={values.shortName}
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

                <InputField
                  label="Site internet"
                  icon={
                    <MaterialCommunityIcons
                      name="web"
                      size={20}
                      color={
                        touched.website && errors.website
                          ? dangerColor
                          : colors.icon
                      }
                      style={mr5}
                    />
                  }
                  colors={colors}
                  error={touched.website && errors.website}
                  name="website"
                  onChange={handleChange('website')}
                  onBlur={handleBlur('website')}
                  value={values.website}
                />

                <CustomBigButton
                  label="Créer mon club"
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

export default AddClubScreen
