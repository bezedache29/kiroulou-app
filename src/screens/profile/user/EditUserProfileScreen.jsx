import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { URL_SERVER, URL_ADDRESS } from 'react-native-dotenv'

import MultipleImagePicker from '@baronha/react-native-multiple-image-picker'

import axios from 'axios'

import { Formik } from 'formik'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useStoreActions, useStoreState } from 'easy-peasy'

import {
  dangerColor,
  darkColor,
  darkPrimaryColor,
  defaultText,
  mr5,
  px20,
} from '../../../assets/styles/styles'

import editUserSchema from '../../../validationSchemas/editUserSchema'
import CustomLabelNavigation from '../../../components/CustomLabelNavigation'
import InputField from '../../../components/InputField'
import CustomBigButton from '../../../components/CustomBigButton'
import useCustomToast from '../../../hooks/useCustomToast'
import useImages from '../../../hooks/useImages'
import useAxios from '../../../hooks/useAxios'
import CustomLoader from '../../../components/CustomLoader'
import InputFieldButton from '../../../components/InputFieldButton'

const defaultImage = require('../../../assets/images/png/default-avatar.png')

const EditUserProfileScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { toastShow } = useCustomToast()
  const { sendImageToServer, compressImage, checkExtension } = useImages()
  const { axiosPostWithToken, axiosPutWithToken } = useAxios()

  const { userProfile } = route.params

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const userActions = useStoreActions((actions) => actions.user)

  // console.log('userProfile', userProfile)

  const [userEdit, setUserEdit] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [image, setImage] = useState(false)
  const [address, setAddress] = useState('')
  const [addressError, setAddressError] = useState(false)
  const [proposals, setProposals] = useState([])
  const [addressToDB, setAddressToDB] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newAddress, setNewAddress] = useState(false)
  const [changeAddress, setChangeAddress] = useState(false)

  useEffect(() => {
    if (user.id === userProfile.id) {
      setUserEdit(user)
    } else {
      setUserEdit(userProfile)
    }
  }, [])

  useEffect(() => {
    if (userEdit) {
      if (userEdit.avatar !== null) {
        setImage(`${URL_SERVER}/storage/${userEdit.avatar}`)
      }

      if (userEdit.address !== null) {
        setAddress(
          `${userEdit.address.street_address} ${userEdit.address.zipcode.code} ${userEdit.address.city.name}`
        )

        setAddressToDB({
          street_address: userEdit.address.street_address,
          city: userEdit.address.city.name,
          zipcode: userEdit.address.zipcode.code,
          lat: userEdit.address.lat,
          lng: userEdit.address.lng,
          region: userEdit.address.region,
          department: userEdit.address.department,
          department_code: userEdit.address.department_code,
        })
      } else {
        setAddress('Adresse')
        setAddressToDB(false)
      }
    }
  }, [userEdit])

  useEffect(() => {
    if (address !== '' && !newAddress) {
      setAddressError(false)
      searchToApi(address)
    }

    if (address !== '' && newAddress) {
      setProposals([])
      setAddressError(false)
    }

    if (address === '' && newAddress) {
      setNewAddress(false)
    }
  }, [address])

  // useEffect(() => {
  //   console.log('addressToDB', addressToDB)
  // }, [addressToDB])

  const searchToApi = async (value) => {
    const response = await axios.get(`${URL_ADDRESS}${value}`)

    // console.log('response', response.data)
    setProposals(response.data.features)
  }

  const selectAddress = (value) => {
    setNewAddress(true)
    setAddress(value.properties.label)
    const context = value.properties.context.split(',')
    const addressToDB = {
      street_address: value.properties.name,
      city: value.properties.city,
      zipcode: value.properties.postcode,
      lat: value.geometry.coordinates[1].toString(),
      lng: value.geometry.coordinates[0].toString(),
      region: context[2],
      department: context[1],
      department_code: context[0],
    }

    setProposals([])
    // setAddressAdded(addressToDB)

    setAddressToDB(addressToDB)

    // console.log('address to db ', addressToDB)
  }

  const openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        mediaType: 'image',
        singleSelectedMode: true,
        doneTitle: 'Valider',
        cancelTitle: 'Annuler',
        selectedColor: darkPrimaryColor,
      })

      // On check que ce sont bien des images qui sont upload (jpeg / jpg / png only)
      if (checkExtension(response.mime)) {
        const compress = await compressImage(`file://${response.realPath}`)
        setImage(compress)
      }
    } catch (e) {
      console.log(e.code, e.message)
    }
  }

  const checkIfAddressExist = async () => {
    const response = await axiosPostWithToken(
      'addresses/isAlreadyExist',
      addressToDB
    )
    // console.log('response address', response.data)

    return response
  }

  const createAddress = async () => {
    const response = await axiosPostWithToken('addresses/create', addressToDB)

    // console.log('response address create', response.data)

    return response
  }

  const wantChangeAddress = () => {
    setChangeAddress(true)
    setAddress('')
    setAddressToDB(false)
    setNewAddress(true)
    setProposals([])
  }

  const submitForm = async (values) => {
    setLoading(true)
    setEmailError(false)
    let addressError = false
    let imageError = false

    let data = {
      user_id: userEdit.id,
      email: values.email,
      firstname: values.firstname !== '' ? values.firstname : null,
      lastname: values.lastname !== '' ? values.lastname : null,
    }

    if (addressToDB) {
      const isExist = await checkIfAddressExist()

      if (isExist.status === 404) {
        const addressCreated = await createAddress()

        if (addressCreated.status === 201) {
          data = {
            ...data,
            address_id: addressCreated.data.address.id,
          }
        } else {
          toastShow({
            title: 'Action impossible !',
            message: `Une erreur au niveau de votre nouvelle addresse (${isExist.status})`,
            type: 'toast_danger',
          })

          addressError = true
          setLoading(false)
        }
      } else if (isExist.status === 201) {
        data = {
          ...data,
          address_id: isExist.data.isAlreadyExist.id,
        }
        addressError = false
      } else {
        toastShow({
          title: 'Action impossible !',
          message: `Une erreur au niveau de l'addresse (${isExist.status})`,
          type: 'toast_danger',
        })

        addressError = true
        setLoading(false)
      }
    }

    if (!addressError) {
      if (image) {
        const checkOrigin = image.substring(0, 4)

        if (checkOrigin === 'file') {
          // On met l'extension du fichier
          const title = `${userEdit.avatar}|${image.split('.').pop()}`
          // On envoie l'image pour stockage
          const isSend = await sendImageToServer(
            `users/${userEdit.id}/storeAvatar`,
            {
              name: 'image',
              uri: image,
              title,
            }
          )

          if (isSend.respInfo.status !== 201) {
            toastShow({
              title: 'Oops !',
              message: "Une erreur avec votre avatar s'est opéré",
              type: 'toast_danger',
            })
            imageError = true
          }
        }
      }
    }

    if (!addressError && !imageError) {
      const response = await axiosPutWithToken(
        `users/${userEdit.id}/update`,
        data
      )

      if (response.status === 201) {
        toastShow({
          title: 'Profil mis à jour !',
          message: `Votre prfil a bien été mis à jour`,
        })
        userActions.loadUser(response.data.user)

        setUserEdit(response.data.user)
        setChangeAddress(false)
      } else {
        toastShow({
          title: 'Action impossible !',
          message: `Il y a des erreurs dans le formulaire ! (${response.status})`,
          type: 'toast_danger',
        })
        if (response.data.email[0]) {
          setEmailError(response.data.email[0])
        }
      }
    }

    setLoading(false)
  }

  if (loading) {
    return <CustomLoader />
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
          <TouchableOpacity style={styles.imageContainer} onPress={openPicker}>
            <Image
              style={styles.image}
              source={image ? { uri: image } : defaultImage}
            />
          </TouchableOpacity>
        </View>

        <View style={px20}>
          {userEdit && (
            <Formik
              validationSchema={editUserSchema}
              initialValues={{
                email: userEdit.email,
                firstname:
                  userEdit.firstname !== null ? userEdit.firstname : '',
                lastname: userEdit.lastname !== null ? userEdit.lastname : '',
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

                  {!changeAddress ? (
                    <InputFieldButton
                      onPress={wantChangeAddress}
                      label={address}
                      icon={
                        <MaterialCommunityIcons
                          name="home"
                          size={20}
                          color={addressError ? dangerColor : colors.icon}
                          style={mr5}
                        />
                      }
                    />
                  ) : (
                    <InputField
                      autoFocus
                      label="Adresse"
                      icon={
                        <MaterialCommunityIcons
                          name="home"
                          size={20}
                          color={addressError ? dangerColor : colors.icon}
                          style={mr5}
                        />
                      }
                      colors={colors}
                      error={addressError}
                      name="address"
                      onChange={setAddress}
                      value={address}
                    />
                  )}

                  {changeAddress && proposals.length > 0 && (
                    <View style={styles.proposals}>
                      {proposals.map((prop) => (
                        <TouchableOpacity
                          key={prop.properties.id}
                          style={styles.proposal}
                          onPress={() => selectAddress(prop)}
                        >
                          <Text style={[defaultText, styles.text]}>
                            {prop.properties.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  <CustomBigButton
                    label="Modifier mon profil"
                    onPress={handleSubmit}
                  />
                </>
              )}
            </Formik>
          )}
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
  input: {
    marginHorizontal: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
  },
  proposals: {
    marginTop: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    padding: 10,
  },
  proposal: {
    marginVertical: 10,
    borderBottomWidth: 1,
    padding: 5,
  },
  text: {
    color: darkColor,
  },
  cancelIcon: {
    position: 'absolute',
    right: 20,
    top: 10,
    zIndex: 2,
  },
})
