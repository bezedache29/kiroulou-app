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

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import CustomLabelNavigation from '../../../components/CustomLabelNavigation'
import {
  dangerColor,
  darkColor,
  darkPrimaryColor,
  mr5,
  mt30,
  px20,
} from '../../../assets/styles/styles'
import addClubSchema from '../../../validationSchemas/addClubSchema'
import InputField from '../../../components/InputField'
import CustomBigButton from '../../../components/CustomBigButton'

const defaultImage = require('../../../assets/images/png/default-person.png')

const EditClubProfileScreen = ({ navigation }) => {
  const { colors } = useTheme()

  const [image, setImage] = useState(defaultImage)

  const submitForm = (values, resetForm) => {
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
        label="Modifier mon club"
        colors={colors}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        {/* Image / logo du club */}
        <View style={[mt30, { alignSelf: 'center' }]}>
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
                        touched.name && errors.name ? dangerColor : colors.icon
                      }
                      style={mr5}
                    />
                  }
                  colors={colors}
                  error={touched.name && errors.name}
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
                  label="Modifier mon club"
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

export default EditClubProfileScreen

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
