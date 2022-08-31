import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { Formik } from 'formik'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useStoreActions, useStoreState } from 'easy-peasy'

import { URL_SERVER } from 'react-native-dotenv'

import {
  dangerColor,
  darkColor,
  darkPrimaryColor,
  defaultText,
  mr5,
  px20,
} from '../../assets/styles/styles'

import CustomLabelNavigation from '../../components/CustomLabelNavigation'
import InputField from '../../components/InputField'
import CustomBigButton from '../../components/CustomBigButton'

import addClubSchema from '../../validationSchemas/addClubSchema'
import useAxios from '../../hooks/useAxios'
import InputFieldButton from '../../components/InputFieldButton'
import usePicker from '../../hooks/usePicker'
import CustomLoader from '../../components/CustomLoader'
import CustomBSModal from '../../components/CustomBSModal'
import ButtonBS from '../../components/ButtonBS'
import CustomOverlay from '../../components/CustomOverlay'
import useCustomToast from '../../hooks/useCustomToast'
import useServices from '../../hooks/useServices'
import useImages from '../../hooks/useImages'

const AddOrEditClubScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const {
    axiosGetWithToken,
    axiosSearchAddress,
    axiosPostWithToken,
    axiosPutWithToken,
    axiosDeleteWithToken,
  } = useAxios()
  const { openImagePicker } = usePicker()
  const { toastShow } = useCustomToast()
  const { checkIfAddressExist, createAddress } = useServices()
  const { sendImageToServer } = useImages()

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const userActions = useStoreActions((actions) => actions.user)

  const [image, setImage] = useState(false)
  const [clubError, setClubError] = useState(false)
  const [club, setClub] = useState(false)
  const [organizations, setOrganizations] = useState([])
  const [addressError, setAddressError] = useState(false)
  const [address, setAddress] = useState('')
  const [addressLabel, setAddressLabel] = useState('Adresse')
  const [addressToDB, setAddressToDB] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newAddress, setNewAddress] = useState(true)
  const [changeAddress, setChangeAddress] = useState(false)
  const [proposals, setProposals] = useState([])
  const [type, setType] = useState({ name: "Type d'organisation" })
  const [typeError, setTypeError] = useState(false)
  const [overlay, setOverlay] = useState(false)

  useEffect(() => {
    if (route.params?.club) {
      setClub(route.params.club)
      if (route.params.club.avatar !== null) {
        setImage(`${URL_SERVER}/storage/${route.params.club.avatar}`)
      }

      // TODO Récupérer le type

      setAddress(
        `${route.params.club.address.street_address} ${route.params.club.address.zipcode.code} ${route.params.club.address.city.name}`
      )

      setAddressLabel(
        `${route.params.club.address.street_address} ${route.params.club.address.zipcode.code} ${route.params.club.address.city.name}`
      )

      setNewAddress(false)

      setAddressToDB({
        street_address: route.params.club.address.street_address,
        city: route.params.club.address.city.name,
        zipcode: route.params.club.address.zipcode.code,
        lat: route.params.club.address.lat,
        lng: route.params.club.address.lng,
        region: route.params.club.address.region,
        department: route.params.club.address.department,
        department_code: route.params.club.address.department_code,
      })
    }
  }, [route.params])

  useEffect(() => {
    loadOrganization()
  }, [])

  useEffect(() => {
    if ((address !== '' && !newAddress && club) || (address !== '' && !club)) {
      setAddressError(false)
      searchToApi(address)
    }

    if (address !== '' && newAddress) {
      setProposals([])
      setAddressError(false)
    }

    if (address === '' && newAddress && club) {
      setNewAddress(false)
    }
  }, [address])

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

  const loadOrganization = async () => {
    const response = await axiosGetWithToken('clubs/organizations')

    setOrganizations(response.data)
  }

  const searchToApi = async (value) => {
    const response = await axiosSearchAddress(value)

    // console.log('response', response.data)
    setProposals(response.data.features)
  }

  const selectAddress = (value) => {
    setNewAddress(true)
    setChangeAddress(false)
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
    setAddressLabel(
      `${value.properties.name} ${value.properties.postcode} ${value.properties.city}`
    )

    setProposals([])
    // setAddressAdded(addressToDB)

    setAddressToDB(addressToDB)

    // console.log('address to db ', addressToDB)
  }

  const openPicker = async () => {
    const img = await openImagePicker()

    if (img !== null) {
      setImage(img)
    }
  }

  // Permet de choisir le type d'organisation
  const chooseType = (type) => {
    setType(type)
    setOverlay(false)
    bottomSheetRef?.current?.closeBottomSheet()
  }

  const wantChangeAddress = () => {
    setChangeAddress(true)
    setAddress('')
    setAddressToDB(false)
    setNewAddress(true)
    setProposals([])
  }

  const submitForm = async (values, resetForm) => {
    setLoading(true)
    setClubError(false)
    let addressToDBError = false
    let typeIdError = false
    let clubCreateError = false
    let imageError = false

    let data = {
      name: values.name,
      short_name: values.shortName,
      website: values.website,
    }

    console.log(addressToDB)

    if (!addressToDB) {
      setAddressError("L'adresse est obligatoire")
      addressToDBError = true
    }

    if (!type.id) {
      setTypeError("L'organisation est obligatoire")
      typeIdError = true
    }

    if (!addressToDBError && !typeIdError && type.id) {
      data = {
        ...data,
        organization_id: type.id,
      }
    }

    if (!addressToDBError && !typeIdError && addressToDB) {
      const isExist = await checkIfAddressExist(addressToDB)

      if (isExist.status === 404) {
        const addressCreated = await createAddress(addressToDB)

        console.log('addressCreated', addressCreated.data)

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

          addressToDBError = true
          setLoading(false)
        }
      } else if (isExist.status === 201) {
        data = {
          ...data,
          address_id: isExist.data.isAlreadyExist.id,
        }
        addressToDBError = false
      } else {
        toastShow({
          title: 'Action impossible !',
          message: `Une erreur au niveau de l'addresse (${isExist.status})`,
          type: 'toast_danger',
        })

        addressToDBError = true
        setLoading(false)
      }
    }

    if (!addressToDBError && !typeIdError) {
      // TODO On cré le club, on récupère l'id et on la met dans la route pour créer l'image

      const response = await axiosPostWithToken('clubs', data)

      console.log('response create', response.data)

      if (response.status !== 201) {
        toastShow({
          title: 'Action impossible !',
          message: `Création de club impossible (${response.status})`,
          type: 'toast_danger',
        })

        clubCreateError = true
      }

      if (!clubCreateError) {
        if (image) {
          const checkOrigin = image.substring(0, 4)

          if (checkOrigin === 'file') {
            // On met l'extension du fichier
            const title = `${club ? club.avatar : 'no-image'}|${image
              .split('.')
              .pop()}`
            // On envoie l'image pour stockage
            const isSend = await sendImageToServer(
              `clubs/${response.data.club.id}/storeAvatar`,
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
                message: "Une erreur avec votre avatar s'est opéré",
                type: 'toast_danger',
              })
              imageError = true
            }
          }
        }

        if (!imageError) {
          // Update user avec le club_id et admin
          const userUpdated = await axiosPutWithToken(
            `users/${user.id}/admin`,
            response.data.user_update
          )

          console.log('userUpdated', userUpdated.data)

          if (userUpdated.status === 201) {
            toastShow({
              title: 'Club créé !',
              message: 'Le club a bien été créé',
            })

            userActions.loadUser(userUpdated.data.user)
            resetForm()
            setAddress('')
            setNewAddress(true)
            setAddressToDB(false)
            setAddressLabel('Adresse')
            setChangeAddress(false)
            setType({ name: "Type d'organisation" })
            setImage(false)
            navigation.navigate('ClubProfile', {
              clubId: response.data.club.id,
            })
          } else {
            toastShow({
              title: 'Oops !',
              message: `Création de club impossible ... (${userUpdated.status})`,
              type: 'toast_danger',
            })

            // Delete avatar & club
            const res = await axiosDeleteWithToken(
              `clubs/${response.data.club.id}`
            )

            console.log('res delete', res.data)
          }
        }
      }
    }

    setLoading(false)
  }

  if (loading) {
    return <CustomLoader />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <CustomLabelNavigation
            label="Créer club"
            colors={colors}
            onPress={() => navigation.goBack()}
          />
          <ScrollView>
            {overlay && <CustomOverlay />}
            {/* Image / logo du club */}
            <View style={{ alignSelf: 'center', marginTop: 50 }}>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={openPicker}
              >
                <Image
                  style={styles.image}
                  source={
                    image
                      ? {
                          uri: image,
                        }
                      : require('../../assets/images/png/default-person.png')
                  }
                />
              </TouchableOpacity>
            </View>

            <View style={px20}>
              <Formik
                validationSchema={addClubSchema}
                initialValues={{
                  name: '',
                  shortName: '',
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

                    {!changeAddress ? (
                      <InputFieldButton
                        onPress={wantChangeAddress}
                        label={addressLabel}
                        error={addressError}
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
                      keyboardType="url"
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

          {/* BottomSheet pour les types d'organisation */}
          <CustomBSModal
            title="Choisir le type d'organidation'"
            SP={['25%', '40%']}
            ref={bottomSheetRef}
            onDismiss={() => {
              setOverlay(false)
              bottomSheetRef?.current?.closeBottomSheet()
            }}
          >
            {organizations.length > 0 ? (
              organizations.map((type) => (
                <ButtonBS key={type.id} onPress={() => chooseType(type)}>
                  {type.name}
                </ButtonBS>
              ))
            ) : (
              <CustomLoader />
            )}
          </CustomBSModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
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
})

export default AddOrEditClubScreen
