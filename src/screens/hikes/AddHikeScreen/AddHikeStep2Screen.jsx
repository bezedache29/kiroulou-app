import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { URL_ADDRESS } from 'react-native-dotenv'

import axios from 'axios'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { useStoreState } from 'easy-peasy'

import { useTheme } from 'react-native-paper'

import { DateTimePickerModal } from 'react-native-modal-datetime-picker'
import {
  dangerColor,
  darkColor,
  darkPrimaryColor,
  defaultText,
  littleTitle,
  mr10,
  mr5,
  mt10,
  mt20,
  mt30,
  rowCenter,
  whiteColor,
} from '../../../assets/styles/styles'

import InputField from '../../../components/InputField'
import AddHikeLayout from '../../../components/Hikes/AddHikeLayout'
import CustomDivider from '../../../components/CustomDivider'
import CustomIconButton from '../../../components/CustomIconButton'
import AddOrEditTripToHikeModal from '../../../components/Hikes/AddOrEditTripToHikeModal'
import TripCard from '../../../components/Hikes/TripCard'
import CustomAlert from '../../../components/CustomAlert'
import InputFieldButton from '../../../components/InputFieldButton'
import useUtils from '../../../hooks/useUtils'
import CustomBSModal from '../../../components/CustomBSModal'
import ButtonBS from '../../../components/ButtonBS'
import CustomOverlay from '../../../components/CustomOverlay'
import useAxios from '../../../hooks/useAxios'
import useCustomToast from '../../../hooks/useCustomToast'

const AddHikeStep2Screen = ({ navigation, route }) => {
  const { dataStep1 } = route.params
  const { axiosGetWithToken } = useAxios()
  const { toastShow } = useCustomToast()

  const { colors } = useTheme()
  const { formatDate, dateToTimestamp, formatDateToSql } = useUtils()

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const [isClubAddress, setIsClubAddress] = useState(true)
  const [address, setAddress] = useState('')
  const [addressError, setAddressError] = useState(false)
  const [proposals, setProposals] = useState([])
  const [addressToDB, setAddressToDB] = useState(false)
  const [newAddress, setNewAddress] = useState(false)
  const [addressLabel, setAddressLabel] = useState('Adresse de la rando')

  const [trips, setTrips] = useState([])
  const [showModalTrip, setShowModalTrip] = useState(false)
  const [tripCreated, setTripCreated] = useState(false)
  const [tripUpdated, setTripUpdated] = useState(false)
  const [openAlertToContinue, setOpenAlertToContinue] = useState(false)
  const [trip, setTrip] = useState(false)
  const [isEditTrip, setIsEditTrip] = useState(false)

  const [dateLabel, setDateLabel] = useState('Date de la rando')
  const [dateError, setDateError] = useState(false)
  const [date, setDate] = useState(false)
  const [dateForDB, setDateForDB] = useState('')
  const [datePickerVisibility, setDatePickerVisibility] = useState(false)

  const [overlay, setOverlay] = useState(false)

  const [showDeleteTrip, setShowDeleteTrip] = useState(false)

  const [showAlertPremium, setShowAlertPremium] = useState(false)

  useEffect(() => {
    if (route.params?.hikeEdit) {
      console.log('hikeEdit2', route.params.hikeEdit)
      // On check si l'adresse hikeEdit est la même que celle du club
      // Si oui
      // setIsClubAddress(true)
      // Sinon
      setIsClubAddress(false)
      setAddress(
        `${route.params.hikeEdit.address} ${route.params.hikeEdit.postCode} ${route.params.hikeEdit.city}`
      )
      setAddressToDB({
        street_address: route.params.hikeEdit.address, // TODO Check
        city: route.params.hikeEdit.city,
        zipcode: route.params.hikeEdit.postCode,
        lat: route.params.hikeEdit.lat,
        lng: route.params.hikeEdit.lng,
        region: route.params.hikeEdit.region,
        department: route.params.hikeEdit.department,
        department_code: route.params.hikeEdit.departmentCode,
      })
      setTrips(route.params.hikeEdit.trips)
      setDateLabel(formatDate(route.params.hikeEdit.date))
      setDate(true)
      setDateForDB(route.params.hikeEdit.date)
    }
  }, [route.params?.hikeEdit])

  useEffect(() => {
    if (dataStep1) {
      console.log('data from route', dataStep1)
    }
    setAddressLabel(
      `${user.club.address.street_address} ${user.club.address.zipcode.code} ${user.club.address.city.name}`
    )
    addressClubToDB()
  }, [])

  const searchToApi = async (value) => {
    const response = await axios.get(`${URL_ADDRESS}${value}`)

    console.log('response', response.data)
    setProposals(response.data.features)
  }

  useEffect(() => {
    if (address && address.length >= 1 && !addressToDB) {
      setAddressError(false)
      searchToApi(address)
    }
    if (address === '' && !route.params?.hikeEdit) {
      // setAddressToDB(false)
      setProposals([])
    }
  }, [address])

  useEffect(() => {
    console.log('addressToDB', addressToDB)
  }, [addressToDB])

  // Permet d'ouvrir la modal du parcours si on a un parcours a editer
  useEffect(() => {
    if (isEditTrip) {
      setShowModalTrip(true)
    }
  }, [isEditTrip])

  // Lorsqu'un parcours est créé on l'ajoute au tableau, si moins de 5 parcours dans le tableau
  // On ouvre une alert pour informer le user s'il veut ajouter un autre parcours
  useEffect(() => {
    if (tripCreated) {
      setTrips((oldData) => [...oldData, tripCreated])
      setTripCreated(false)
      setOpenAlertToContinue(true)
    }
  }, [tripCreated])

  useEffect(() => {
    if (tripUpdated) {
      const newTrips = [...trips]
      newTrips.splice(tripUpdated.id, 1, tripUpdated.trip)
      setTrips(newTrips)
    }
  }, [tripUpdated])

  useEffect(() => {
    console.log('trips', trips)
  }, [trips])

  useEffect(() => {
    console.log('trip', trip)
  }, [trip])

  // Ref pour la bottomSheet
  const bottomSheetRef = useRef(null)

  // Permet d'ouvrir et fermer la bottomSheet pour afficher les options du parcours
  const toggleBottomSheet = (trip) => {
    if (overlay) {
      setOverlay(false)
      setTrip(false)
      bottomSheetRef?.current?.closeBottomSheet()
    } else {
      setOverlay(true)
      setTrip(trip)
      bottomSheetRef?.current?.openBottomSheet()
    }
  }

  const addressClubToDB = () => {
    setAddressToDB({
      street_address: user.club.address.street_address,
      city: user.club.address.city.name,
      zipcode: user.club.address.zipcode.code,
      lat: user.club.address.lat,
      lng: user.club.address.lng,
      region: user.club.address.region,
      department: user.club.address.department,
      department_code: user.club.address.department_code,
    })
  }

  // Toggle la checkbox
  // Quand checked => adresse rando = adresse du club
  // Quand non checked => adresse rando = adresse a renseigner
  const toggleAddress = (value) => {
    setIsClubAddress(value)
    if (value) {
      addressClubToDB()
      setAddressLabel(
        `${user.club.address.street_address} ${user.club.address.zipcode.code} ${user.club.address.city.name}`
      )
      setNewAddress(true)
    } else {
      setAddressToDB(false)
      setAddress()
      setAddressLabel('Adresse de la rando')
      setNewAddress(false)
    }
  }

  const wantChangeAddress = () => {
    setNewAddress(false)
    setAddress('')
    setAddressToDB(false)
    setIsClubAddress(false)
  }

  const selectAddress = (value) => {
    setNewAddress(true)
    // setAddress(value.properties.label)
    const context = value.properties.context.split(',')
    const addressToDB = {
      street_address: value.properties.name,
      city: value.properties.city,
      zipcode: value.properties.postcode,
      lat: value.geometry.coordinates[1],
      lng: value.geometry.coordinates[0],
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

    console.log('address to db ', addressToDB)
  }

  // A la confirmation de la date du DatePicker
  const handleConfirmDate = (date) => {
    setDatePickerVisibility(false)
    const timestampNow = dateToTimestamp(new Date())
    const timestampTrip = dateToTimestamp(date)

    // On compare les timestamps du jour avec celle de la rando pour etre sur que la date n'est pas deja passé
    if (timestampNow < timestampTrip) {
      // Modifie le label pour afficher la date formater en français dans le bouton
      setDateLabel(formatDate(date))
      // Date pour ajout en DB
      setDateForDB(date)
      // On indique qu'on a bien une date pour eviter les erreurs de  formulaire
      setDate(true)
      setDateError(false)
    } else {
      setDateError('Veuillez sélectionner une date dans le futur')
    }
  }

  const checkOpenModalTrip = () => {
    if (trips.length > 3 && user.premium !== 'active') {
      setOpenAlertToContinue(false)
      setShowAlertPremium(true)
    } else {
      setShowModalTrip(true)
    }
  }

  // Permet d'indiquer que le user souhaite editer un parcours
  const editTrip = (trip) => {
    if (trip) {
      setOverlay(false)
      bottomSheetRef?.current?.closeBottomSheet()
      setIsEditTrip(trip)
    }
  }

  const deleteTrip = () => {
    setShowDeleteTrip(false)
    setOverlay(false)
    bottomSheetRef?.current?.closeBottomSheet()
    const newTrips = [...trips]
    newTrips.splice(trip.index, 1)
    setTrips(newTrips)
    toastShow({
      title: 'Parcours supprimé !',
      message: 'Votre parcours a bien été supprimé',
    })
  }

  // Au clic sur le bouton pour passer a l'étape 3
  const goToNextStep = async () => {
    if (!addressToDB && !isClubAddress) {
      setAddressError('Vous devez renseigner une adresse')
    }

    if (!date) {
      setDateError('Vous devez renseigner une date')
    }

    if (addressToDB && date) {
      // On met la date, l'adresse et les parcours
      const dataStep2 = {
        trips: trips.length > 0 ? trips : [],
        date: formatDateToSql(dateForDB),
        address: addressToDB,
      }

      // On check l'adresse pour savoir si c'est la rando est a l'adresse du club ou a un autre endroit
      // if (isClubAddress) {
      //   // Fetch le club depuis l'id club du user
      //   const response = await axiosGetWithToken(
      //     `clubs/${user.club_id}/clubInformations`
      //   )
      //   // Récupérer l'adresse
      //   dataStep2 = {
      //     street_address: response.data.address.street_address,
      //     city: response.data.address.city.name,
      //     zipcode: response.data.address.zipcode.code,
      //     lat: response.data.address.lat,
      //     lng: response.data.address.lng,
      //     region: response.data.address.region,
      //     department: response.data.address.department,
      //     department_code: response.data.address.department_code,
      //     ...data,
      //   }
      // } else {
      //   dataStep2 = addressToDB
      // }

      const dataSteps = {
        ...dataStep1,
        ...dataStep2,
      }

      console.log('data', dataSteps)

      navigation.navigate('AddHikeStep3', {
        dataSteps,
        hikeEdit: route.params?.hikeEdit,
      })
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <AddHikeLayout
          label={
            route.params?.hikeEdit ? 'Modifier une rando' : 'Créer une rando'
          }
          step={2}
          subTitle="Inscrivez l'adresse ou se trouvera la randonnée, ainsi que les parcours disponibles si vous le souhaitez."
          nextStepCondition={(addressToDB || isClubAddress) && date}
          buttonLabel="Passer à l'étape 3"
          buttonPress={goToNextStep}
        >
          {overlay && <CustomOverlay />}
          <ScrollView>
            <View style={{ flex: 1 }}>
              <CustomDivider />

              {/* ADRESSE */}
              <Text style={[littleTitle, mt10, { color: colors.text }]}>
                Adresse de la rando
              </Text>

              <BouncyCheckbox
                style={{ marginTop: 20 }}
                size={25}
                fillColor={darkPrimaryColor}
                unfillColor={whiteColor}
                text="Adresse du club"
                iconStyle={{ borderColor: darkPrimaryColor }}
                iconInnerStyle={{ borderWidth: 2 }}
                textStyle={[
                  defaultText,
                  {
                    textDecorationLine: 'none',
                    color: colors.text,
                  },
                ]}
                isChecked={isClubAddress}
                onPress={(isChecked) => toggleAddress(isChecked)}
              />

              {!isClubAddress && !newAddress && (
                <>
                  <InputField
                    label="Adresse de la rando"
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
                    autoFocus={!isClubAddress}
                  />

                  {proposals.length > 0 && (
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
                </>
              )}

              {newAddress && !isClubAddress && (
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
              )}

              {/* DATE DE LA RANDO */}
              <Text style={[littleTitle, mt30, { color: colors.text }]}>
                Date de la rando
              </Text>
              <InputFieldButton
                onPress={() => setDatePickerVisibility(true)}
                label={dateLabel}
                error={dateError}
                icon={
                  <MaterialCommunityIcons
                    name="calendar-range" // calendar-question-outline
                    size={20}
                    color={dateError ? dangerColor : colors.icon}
                    style={mr10}
                  />
                }
              />

              {/* PARCOURS */}
              <View style={[mt30, { flex: 1 }]}>
                <View style={[rowCenter]}>
                  <Text style={[littleTitle, { color: colors.text }]}>
                    Parcours de la rando
                  </Text>
                  {trips.length > 0 && (
                    <TouchableOpacity
                      onPress={() => checkOpenModalTrip()}
                      style={{ marginLeft: 'auto', marginRight: 10 }}
                    >
                      <MaterialCommunityIcons
                        name="plus-circle"
                        size={30}
                        color={darkPrimaryColor}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                {trips.length === 0 ? (
                  <CustomIconButton
                    isText
                    text="Ajouter un parcours"
                    onPress={() => setShowModalTrip(true)}
                    size="100%"
                  />
                ) : (
                  <View style={[mt20, { flex: 1 }]}>
                    {trips.map((trip, index) => (
                      <TripCard
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        trip={trip}
                        onPress={() => toggleBottomSheet({ trip, index })}
                      />
                    ))}
                  </View>
                )}
              </View>
            </View>
          </ScrollView>

          {/* Modal ajout/modification de parcours */}
          <AddOrEditTripToHikeModal
            showModalTrip={showModalTrip}
            closeModal={() => {
              setShowModalTrip(false)
              setIsEditTrip(false)
              setTrip(false)
            }}
            setTripCreated={setTripCreated}
            setTripUpdated={setTripUpdated}
            edit={isEditTrip || false}
          />

          {/* Alert après avoir ajouter un circuit pour proposer d'en rajouter un autre */}
          <CustomAlert
            showAlert={openAlertToContinue}
            title="Bravo !"
            message="Parcours créé, voulez vous en créer un nouveau ?"
            onDismiss={() => setOpenAlertToContinue(false)}
            onCancelPressed={() => setOpenAlertToContinue(false)}
            onConfirmPressed={() => checkOpenModalTrip()}
            backgroundColor={colors.backgroundBox}
          />

          {/* Alert pour passer premium */}
          <CustomAlert
            showAlert={showAlertPremium}
            title="Action refusé !"
            message="Vous avez atteint le nombre maximal de parcours. Pour en proposer plus vous devez mettre a niveau votre compte avec une version premium"
            onDismiss={() => setShowAlertPremium(false)}
            onCancelPressed={() => setShowAlertPremium(false)}
            onConfirmPressed={() => navigation.navigate('Subs')}
            backgroundColor={colors.backgroundBox}
            cancelText="Fermer"
            confirmText="Voir les premiums"
          />

          {/* Modal DatePicker */}
          <DateTimePickerModal
            isVisible={datePickerVisibility}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={() => setDatePickerVisibility(false)}
            date={
              route.params?.hikeEdit ? route.params?.hikeEdit?.date : new Date()
            }
          />

          {/* BottomSheet pour options du parcours */}
          <CustomBSModal
            title="Que souhaitez vous faire ?"
            SP={['25%', '30%']}
            ref={bottomSheetRef}
            onDismiss={() => {
              bottomSheetRef?.current?.closeBottomSheet()
              setOverlay(false)
            }}
          >
            <ButtonBS onPress={() => setShowDeleteTrip(true)} cancel>
              Supprimer le parcours
            </ButtonBS>
            <ButtonBS onPress={() => editTrip(trip)}>
              Modifier le parcours
            </ButtonBS>
          </CustomBSModal>

          <CustomAlert
            showAlert={showDeleteTrip}
            title="Attention !"
            message={`Etes vous sur de vouloir supprimer le parcours de : ${trip?.trip?.distance} km ?`}
            onDismiss={() => setShowDeleteTrip(false)}
            onCancelPressed={() => setShowDeleteTrip(false)}
            onConfirmPressed={deleteTrip}
          />
        </AddHikeLayout>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default AddHikeStep2Screen

const styles = StyleSheet.create({
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
