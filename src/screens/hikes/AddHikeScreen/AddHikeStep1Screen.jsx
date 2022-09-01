import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { Formik } from 'formik'

import addHikeSchema from '../../../validationSchemas/addHikeSchema'

import {
  dangerColor,
  defaultText,
  mb20,
  mr5,
  mt10,
  my20,
  primaryColor,
  px10,
} from '../../../assets/styles/styles'

import CustomBigButton from '../../../components/CustomBigButton'
import CustomContainer from '../../../components/CustomContainer'
import InputField from '../../../components/InputField'

const AddHikeStep1Screen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const [hikeEdit, setHikeEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (route.params?.hikeEdit) {
      setLoading(true)
      setHikeEdit(route.params.hikeEdit)
      console.log('hikeEdit', route.params.hikeEdit)
    }
  }, [route.params?.hikeEdit])

  useEffect(() => {
    if (hikeEdit) {
      setLoading(false)
    }
  }, [hikeEdit])

  if (loading) {
    return null
  }

  return (
    <CustomContainer
      label={hikeEdit ? 'Modifier une rando' : 'Créer une rando'}
      pressBack={() => navigation.goBack()}
    >
      <View style={[px10, { flex: 1 }]}>
        <Text style={[defaultText, mt10, styles.step]}>Etape 1/3</Text>
        <Text style={[defaultText, my20, { color: colors.text }]}>
          Formulaire pour {hikeEdit ? 'modifier' : 'créer'} une randonnée VTT.
        </Text>
        <Text style={[defaultText, mb20, { color: colors.text }]}>
          Vous devez complétez et valider les 3 étapes pour que votre randonnée
          soit enregistrée et partagée auprès de la communautée.
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <Formik
              validationSchema={addHikeSchema}
              initialValues={{
                name: hikeEdit ? hikeEdit.name : '',
                description: hikeEdit ? hikeEdit.description : '',
                publicPrice: hikeEdit ? hikeEdit.publicPrice.toString() : '',
                privatePrice: hikeEdit
                  ? hikeEdit.privatePrice.toString()
                  : null,
              }}
              onSubmit={(values, { resetForm }) => {
                const data = {
                  name: values.name,
                  description: values.description,
                  // Remplace les virgules par des points, et on max 2 chiffres après la virgule arrondi au supérieur
                  public_price: (
                    Math.round(+values.publicPrice.replace(',', '.') * 100) /
                    100
                  ).toFixed(2),
                  private_price:
                    values.privatePrice !== null
                      ? (
                          Math.round(
                            +values.privatePrice.replace(',', '.') * 100
                          ) / 100
                        ).toFixed(2)
                      : null,
                }
                // Envoie les infos a la part 2
                console.log('DATA STEP 1 ', data)
                // resetForm()

                navigation.navigate('AddHikeStep2', {
                  dataStep1: data,
                  hikeEdit,
                })
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
                <View>
                  {/* NOM */}
                  <InputField
                    label="Nom de la rando"
                    icon={
                      <MaterialCommunityIcons
                        name="drama-masks"
                        size={20}
                        color={
                          touched.name && errors.name
                            ? dangerColor
                            : colors.icon
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

                  {/* DESCRIPTION */}
                  <InputField
                    label="Description"
                    maxLength={250}
                    multiline
                    numberOfLines={4}
                    icon={
                      <MaterialCommunityIcons
                        name="comment-processing-outline"
                        size={20}
                        color={
                          touched.description && errors.description
                            ? dangerColor
                            : colors.icon
                        }
                        style={mr5}
                      />
                    }
                    colors={colors}
                    error={touched.description && errors.description}
                    name="description"
                    onChange={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                  />

                  {/* PRIX PUBLIC */}
                  <InputField
                    label="Prix public (€)"
                    icon={
                      <MaterialCommunityIcons
                        name="currency-eur"
                        size={20}
                        color={
                          touched.publicPrice && errors.publicPrice
                            ? dangerColor
                            : colors.icon
                        }
                        style={mr5}
                      />
                    }
                    colors={colors}
                    error={touched.publicPrice && errors.publicPrice}
                    name="publicPrice"
                    onChange={handleChange('publicPrice')}
                    onBlur={handleBlur('publicPrice')}
                    value={values.publicPrice}
                    keyboardType="numeric"
                    inputType="number"
                  />

                  {/* PRIX PUBLIC */}
                  <InputField
                    label="Prix Licencié (€)"
                    icon={
                      <MaterialCommunityIcons
                        name="currency-eur"
                        size={20}
                        color={
                          touched.privatePrice && errors.privatePrice
                            ? dangerColor
                            : colors.icon
                        }
                        style={mr5}
                      />
                    }
                    colors={colors}
                    error={touched.privatePrice && errors.privatePrice}
                    name="privatePrice"
                    onChange={handleChange('privatePrice')}
                    onBlur={handleBlur('privatePrice')}
                    value={values.privatePrice}
                    keyboardType="numeric"
                    inputType="number"
                  />

                  <CustomBigButton
                    label="Passer à l'étape 2"
                    onPress={handleSubmit}
                  />
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </View>
    </CustomContainer>
  )
}

export default AddHikeStep1Screen

const styles = StyleSheet.create({
  step: {
    color: primaryColor,
    fontSize: 16,
    textAlign: 'right',
  },
})
