/**
 * Formulaire pour qu'un user ajoute un de ses vélos
 */
import { ScrollView, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import { useTheme } from 'react-native-paper'
import { Formik } from 'formik'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { GestureHandlerRootView } from 'react-native-gesture-handler'

import DateTimePickerModal from 'react-native-modal-datetime-picker'

import addBikeSchema from '../../../../../../../validationSchemas/addBikeSchema'

import {
  dangerColor,
  mr5,
  mt20,
  mx20,
} from '../../../../../../../assets/styles/styles'

import CustomLabelNavigation from '../../../../../../../components/CustomLabelNavigation'
import InputField from '../../../../../../../components/InputField'
import CustomBigButton from '../../../../../../../components/CustomBigButton'
import ButtonBS from '../../../../../../../components/ButtonBS'
import InputFieldButton from '../../../../../../../components/InputFieldButton'
import CustomBSModal from '../../../../../../../components/CustomBSModal'
import CustomOverlay from '../../../../../../../components/CustomOverlay'

import useUtils from '../../../../../../../hooks/useUtils'
import useDatePicker from '../../../../../../../hooks/useDatePicker'

const EditBikeScreen = ({ navigation, route }) => {
  // Hooks
  const { colors } = useTheme()
  const { formatDate } = useUtils()
  const { datePickerVisibility, showDatePicker, hideDatePicker } =
    useDatePicker()

  // Variables
  const [overlay, setOverlay] = useState(false)
  const [dateLabel, setDateLabel] = useState('')
  const [date, setDate] = useState(true)
  const [dateForDB, setDateForDB] = useState('')
  const [dateError, setDateError] = useState(false)
  const [type, setType] = useState(true)
  const [typeLabel, setTypeLabel] = useState('Type de vélo')
  const [typeError, setTypeError] = useState(false)

  // Au montage du composant, on récupère la date et le type
  useEffect(() => {
    if (route.params.bike.date) {
      setDateLabel(formatDate(route.params.bike.date))
      setDateForDB(route.params.bike.date)
    }
    if (route.params.bike.type) {
      setTypeLabel(route.params.bike.type)
    }
  }, [route.params])

  // Ref pour la bottomSheet Type
  const bottomSheetRef = useRef(null)

  // Permet d'ouvrir et fermer la bottomSheet pour choisir le type de vélo
  const toggleBottomSheet = () => {
    if (overlay) {
      setOverlay(false)
      bottomSheetRef?.current?.closeBottomSheet()
    } else {
      setOverlay(true)
      bottomSheetRef?.current?.openBottomSheet()
    }
  }

  // A la confirmation de la date du DatePicker
  const handleConfirm = (date) => {
    // Modifie le label pour afficher la date formater en français dans le bouton
    setDateLabel(formatDate(date))
    // Date pour ajout en DB
    setDateForDB(date)
    setDate(true)
    setDateError(false)
    hideDatePicker()
  }

  const validForm = (handleSubmit) => {
    setDateError(false)
    setTypeError(false)
    if (!date) {
      setDateError('La date est obligatoire')
    }
    if (!type) {
      setTypeError('Le type est obligatoire')
    }
    if (date && type) {
      handleSubmit()
    }
  }

  // Permet de valider le formulaire
  const submitForm = (values, resetForm) => {
    const data = {
      name: values.name,
      brand: values.brand,
      model: values.model,
      type,
      date: dateForDB,
      weight: values.weight,
    }
    console.log(data)
    resetForm()
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <CustomLabelNavigation
            label="Modifier le vélo"
            colors={colors}
            onPress={() => navigation.goBack()}
          />

          <View style={{ flex: 1 }}>
            {/* Change la couleur de l'arriere plan et le zindex */}
            {overlay && <CustomOverlay />}

            <ScrollView style={[mt20, mx20]}>
              <Formik
                validationSchema={addBikeSchema}
                initialValues={{
                  name: route.params.bike.name,
                  brand: route.params.bike.brand,
                  model: route.params.bike.model,
                  weight: route.params.bike.weight,
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
                  <ScrollView>
                    <InputField
                      label="Nom du vélo"
                      icon={
                        <MaterialCommunityIcons
                          name="account-tie"
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

                    <InputField
                      label="Marque"
                      icon={
                        <MaterialCommunityIcons
                          name="shield-account"
                          size={20}
                          color={
                            touched.brand && errors.brand
                              ? dangerColor
                              : colors.icon
                          }
                          style={mr5}
                        />
                      }
                      colors={colors}
                      error={touched.brand && errors.brand}
                      name="brand"
                      onChange={handleChange('brand')}
                      onBlur={handleBlur('brand')}
                      value={values.brand}
                    />

                    <InputField
                      label="Modèle"
                      icon={
                        <MaterialCommunityIcons
                          name="shield-account"
                          size={20}
                          color={
                            touched.model && errors.model
                              ? dangerColor
                              : colors.icon
                          }
                          style={mr5}
                        />
                      }
                      colors={colors}
                      error={touched.model && errors.model}
                      name="model"
                      onChange={handleChange('model')}
                      onBlur={handleBlur('model')}
                      value={values.model}
                    />

                    {/* Type de vélo */}
                    <InputFieldButton
                      onPress={toggleBottomSheet}
                      label={typeLabel}
                      error={typeError}
                      icon={
                        <MaterialCommunityIcons
                          name="shield-account"
                          size={20}
                          color={typeError ? dangerColor : colors.icon}
                          style={mr5}
                        />
                      }
                      chevronColor={typeError ? dangerColor : colors.text}
                    />

                    <InputField
                      label="Poids"
                      icon={
                        <MaterialCommunityIcons
                          name="weight-kilogram"
                          size={20}
                          color={
                            touched.weight && errors.weight
                              ? dangerColor
                              : colors.icon
                          }
                          style={mr5}
                        />
                      }
                      colors={colors}
                      error={touched.weight && errors.weight}
                      name="weight"
                      onChange={handleChange('weight')}
                      onBlur={handleBlur('weight')}
                      value={values.weight}
                      keyboardType="numeric"
                    />

                    {/* Date du vélo */}
                    <InputFieldButton
                      onPress={showDatePicker}
                      label={dateLabel}
                      error={dateError}
                      icon={
                        <MaterialCommunityIcons
                          name="calendar-range"
                          size={20}
                          color={dateError ? dangerColor : colors.icon}
                          style={mr5}
                        />
                      }
                    />

                    {/* !! Input Image ICI !! */}

                    <CustomBigButton
                      label="Modifier le vélo"
                      onPress={() => validForm(handleSubmit)}
                    />
                  </ScrollView>
                )}
              </Formik>
            </ScrollView>
          </View>

          {/* BottomSheet pour les types de vélo */}
          <CustomBSModal
            title="Choisir le type de vélo"
            SP={['25%', '40%']}
            ref={bottomSheetRef}
            onDismiss={toggleBottomSheet}
          >
            <ButtonBS onPress={() => {}}>Vélo Tout Terrain (VTT)</ButtonBS>
            <ButtonBS onPress={() => {}}>Vélo de route</ButtonBS>
            <ButtonBS onPress={toggleBottomSheet}>
              Vélo à assistance électrique (VAE)
            </ButtonBS>
          </CustomBSModal>

          {/* Modal DatePicker */}
          <DateTimePickerModal
            isVisible={datePickerVisibility}
            mode="date"
            date={route.params.bike.date}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default EditBikeScreen
