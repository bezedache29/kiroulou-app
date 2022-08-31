/**
 * Formulaire pour qu'un user ajoute un de ses vélos
 */
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { useTheme } from 'react-native-paper'
import { Formik } from 'formik'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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
import CustomIconButton from '../../../../../../../components/CustomIconButton'
import useImages from '../../../../../../../hooks/useImages'
import useAxios from '../../../../../../../hooks/useAxios'
import useCustomToast from '../../../../../../../hooks/useCustomToast'
import CustomLoader from '../../../../../../../components/CustomLoader'
import usePicker from '../../../../../../../hooks/usePicker'

const { width, height } = Dimensions.get('window')

const AddBikeScreen = ({ navigation }) => {
  // Hooks
  const { formatDate, formatDateToSql } = useUtils()
  const { colors } = useTheme()
  const { axiosGetWithToken, axiosPostWithToken } = useAxios()
  const { sendImageToServer } = useImages()
  const { openImagePicker } = usePicker()
  const { toastShow } = useCustomToast()

  // Variables
  const [overlay, setOverlay] = useState(false)
  const [datePickerVisibility, setDatePickerVisibility] = useState(false)
  const [dateLabel, setDateLabel] = useState('Date du vélo')
  const [date, setDate] = useState(false)
  const [dateForDB, setDateForDB] = useState('')
  const [dateError, setDateError] = useState(false)
  const [types, setTypes] = useState([])
  const [type, setType] = useState({ name: 'Type de vélo' })
  // const [typeName, setTypeName] = useState('Type de vélo')
  const [typeError, setTypeError] = useState(false)
  const [image, setImage] = useState(false)
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    loadTypes()
  }, [])

  // Permet de récupérer les types de vélo pour etre listé
  const loadTypes = async () => {
    const response = await axiosGetWithToken('users/bikes/types')
    setTypes(response.data)
  }

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
    setDateForDB(formatDateToSql(date))
    setDate(true)
    setDateError(false)
    setDatePickerVisibility(false)
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

  // Ouvre les photos du téléphone
  const openPicker = async () => {
    const img = await openImagePicker()

    if (img !== null) {
      setImage(img)
    }
  }

  // Permet de choisir le type de vélo
  const chooseType = (type) => {
    setType(type)
    setOverlay(false)
    bottomSheetRef?.current?.closeBottomSheet()
  }

  // Permet de valider le formulaire
  const submitForm = async (values, resetForm) => {
    setLoader(true)
    const data = {
      name: values.name,
      brand: values.brand,
      model: values.model,
      bike_type_id: type.id,
      date: dateForDB,
      weight: values.weight !== '' ? values.weight : null,
    }

    // Création du vélo en DB
    const response = await axiosPostWithToken('users/bikes', data)

    if (response.status === 201) {
      let error = false
      if (image) {
        // On met l'extension du fichier
        const title = `${'nothing'}|${image.split('.').pop()}`
        // On envoie l'image pour stockage

        // Création de l'image et envoie en DB
        const isSend = await sendImageToServer(
          `users/bikes/${response.data.bike.id}/storeImageBike`,
          {
            name: 'image',
            uri: image,
            title,
          }
        )

        console.log('isSend', isSend)

        if (isSend.respInfo.status !== 201) {
          toastShow({
            title: 'Oops !',
            message: 'Il y a un problème avec votre image',
            type: 'toast_danger',
          })

          error = true
        }
      }

      setLoader(false)

      if (!error) {
        toastShow({
          title: 'Ajout du vélo avec succès !',
          message: 'Un nouveau vélo fait maintenant partie de votre collection',
        })

        // TODO Notifications aux followers

        resetForm()
        navigation.goBack()
      }
    }

    if (response.status === 422) {
      toastShow({
        title: 'Action impossible !',
        message: 'Réessayer plus tard...',
        type: 'toast_danger',
      })
    }
  }

  if (loader) {
    return <CustomLoader />
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

            <ScrollView
              style={[mt20, mx20]}
              showsVerticalScrollIndicator={false}
            >
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
                      label={type.name}
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
                      onPress={() => setDatePickerVisibility(true)}
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

                    <View style={mt20} />

                    {/* Photo du vélo */}
                    {!image ? (
                      <CustomIconButton
                        isText
                        text="Ajouter une image/photo"
                        size="100%"
                        onPress={() => openPicker()}
                      />
                    ) : (
                      <TouchableOpacity
                        onPress={() => openPicker()}
                        style={styles.imageBtn}
                      >
                        <Image
                          source={{ uri: image }}
                          style={[
                            {
                              borderRadius: 8,
                            },
                            styles.image,
                          ]}
                        />
                      </TouchableOpacity>
                    )}

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
            onDismiss={() => {
              setOverlay(false)
              bottomSheetRef?.current?.closeBottomSheet()
            }}
          >
            {types.length > 0 ? (
              types.map((type) => (
                <ButtonBS key={type.id} onPress={() => chooseType(type)}>
                  {type.name}
                </ButtonBS>
              ))
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ActivityIndicator />
              </View>
            )}
          </CustomBSModal>

          {/* Modal DatePicker */}
          <DateTimePickerModal
            isVisible={datePickerVisibility}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={() => setDatePickerVisibility(false)}
          />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  imageBtn: {
    flex: 1,
    width,
    height: height / 2.2,
    alignSelf: 'center',
    marginTop: 20,
  },
  image: {
    height: '100%',
    width: '100%',
  },
})

export default AddBikeScreen
