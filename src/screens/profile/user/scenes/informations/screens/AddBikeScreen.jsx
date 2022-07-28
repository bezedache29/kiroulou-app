/**
 * Formulaire pour qu'un user ajoute un de ses vélos
 */
import { ScrollView, View } from 'react-native'
import React, { useRef, useState } from 'react'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import { useTheme } from 'react-native-paper'
import { Formik } from 'formik'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { GestureHandlerRootView } from 'react-native-gesture-handler'

import DateTimePickerModal from 'react-native-modal-datetime-picker'
import addBikeSchema from '../../../../../../validationSchemas/addBikeSchema'

import {
  dangerColor,
  mr5,
  mt20,
  mx20,
} from '../../../../../../assets/styles/styles'

import CustomLabelNavigation from '../../../../../../components/CustomLabelNavigation'
import InputField from '../../../../../../components/InputField'
import CustomBigButton from '../../../../../../components/CustomBigButton'
import ButtonBS from '../../../../../../components/ButtonBS'
import InputFieldButton from '../../../../../../components/InputFieldButton'
import CustomBSModal from '../../../../../../components/CustomBSModal'
import CustomOverlay from '../../../../../../components/CustomOverlay'
import useUtils from '../../../../../../hooks/useUtils'

const AddBikeScreen = ({ navigation }) => {
  const { colors } = useTheme()

  const [overlay, setOverlay] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [dateLabel, setDateLabel] = useState('Date du vélo')
  const [date, setDate] = useState(false)
  const [dateForDB, setDateForDB] = useState('')
  const [dateError, setDateError] = useState(false)
  const [type, setType] = useState(false)
  const [typeError, setTypeError] = useState(false)

  // Hooks
  const { formatDate } = useUtils()

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

  // Permet d'ouvrir la modal DatePicker
  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  // Permet de fermer la modal DatePicker
  const hideDatePicker = () => {
    setDatePickerVisibility(false)
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
      year: date,
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
            label="Ajouter un vélo"
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
                  name: '',
                  brand: '',
                  model: '',
                  weight: '',
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
                      label="Type de vélo"
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
                      label="Ajouter le vélo"
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
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default AddBikeScreen
