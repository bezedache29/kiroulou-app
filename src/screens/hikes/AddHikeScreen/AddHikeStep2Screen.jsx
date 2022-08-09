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
import useDatePicker from '../../../hooks/useDatePicker'
import useUtils from '../../../hooks/useUtils'
import CustomBSModal from '../../../components/CustomBSModal'
import ButtonBS from '../../../components/ButtonBS'
import CustomOverlay from '../../../components/CustomOverlay'

const AddHikeStep2Screen = ({ navigation, route }) => {
  const { dataStep1 } = route.params

  const { colors } = useTheme()
  const { datePickerVisibility, showDatePicker, hideDatePicker } =
    useDatePicker()
  const { formatDate, dateToTimestamp } = useUtils()

  const [isClubAddress, setIsClubAddress] = useState(true)
  const [address, setAddress] = useState('')
  const [addressError, setAddressError] = useState(false)
  const [proposals, setProposals] = useState([])
  const [addressToDB, setAddressToDB] = useState(false)

  const [trips, setTrips] = useState([])
  const [showModalTrip, setShowModalTrip] = useState(false)
  const [tripCreated, setTripCreated] = useState(false)
  const [openAlertToContinue, setOpenAlertToContinue] = useState(false)
  const [trip, setTrip] = useState(false)
  const [isEditTrip, setIsEditTrip] = useState(false)

  const [dateLabel, setDateLabel] = useState('Date de la rando')
  const [dateError, setDateError] = useState(false)
  const [date, setDate] = useState(false)
  const [dateForDB, setDateForDB] = useState('')

  const [overlay, setOverlay] = useState(false)

  const [showDeleteTrip, setShowDeleteTrip] = useState(false)

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
        address: route.params.hikeEdit.address,
        city: route.params.hikeEdit.city,
        postCode: route.params.hikeEdit.postCode,
        lat: route.params.hikeEdit.lat,
        lng: route.params.hikeEdit.lng,
        region: route.params.hikeEdit.region,
        department: route.params.hikeEdit.department,
        departmentCode: route.params.hikeEdit.departmentCode,
      })
      setTrips(route.params.hikeEdit.trips)
      setDateLabel(formatDate(route.params.hikeEdit.date))
      setDate(true)
      setDateForDB(route.params.hikeEdit.date)
    }
  }, [route.params?.hikeEdit])

  // Ref pour la bottomSheet
  const bottomSheetRef = useRef(null)

  // Permet d'ouvrir et fermer la bottomSheet pour afficher les options de l'article
  const toggleBottomSheet = (item) => {
    if (overlay) {
      setOverlay(false)
      setTrip(false)
      bottomSheetRef?.current?.closeBottomSheet()
    } else {
      setOverlay(true)
      setTrip(item)
      bottomSheetRef?.current?.openBottomSheet()
    }
  }

  useEffect(() => {
    if (dataStep1) {
      console.log('data from route', dataStep1)
    }
  }, [])

  const searchToApi = async (value) => {
    const response = await axios.get(`${URL_ADDRESS}${value}`)

    console.log('response', response.data)
    setProposals(response.data.features)
  }

  useEffect(() => {
    if (address !== '' && !addressToDB) {
      setAddressError(false)
      searchToApi(address)
    }
    if (address === '' && !route.params?.hikeEdit) {
      setAddressToDB(false)
      setProposals([])
    }
  }, [address])

  useEffect(() => {
    console.log('addressToDB', addressToDB)
  }, [addressToDB])

  const selectAddress = (value) => {
    setAddress(value.properties.label)
    const context = value.properties.context.split(',')
    const addressToDB = {
      address: value.properties.name,
      city: value.properties.city,
      postCode: value.properties.postcode,
      lat: value.geometry.coordinates[1],
      lng: value.geometry.coordinates[0],
      region: context[2],
      department: context[1],
      departmentCode: context[0],
    }

    setProposals([])
    // setAddressAdded(addressToDB)

    setAddressToDB(addressToDB)

    console.log('address to db ', addressToDB)
  }

  // Lorsqu'un parcours est créé on l'ajoute au tableau, si moins de 5 parcours dans le tableau
  // On ouvre une alert pour informer le user s'il veut ajouter un autre parcours
  useEffect(() => {
    if (tripCreated) {
      setTrips((oldData) => [...oldData, tripCreated])
      setTripCreated(false)
      setOpenAlertToContinue(true)
    }
  }, [tripCreated])

  // A la confirmation de la date du DatePicker
  const handleConfirmDate = (date) => {
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
      hideDatePicker()
    } else {
      hideDatePicker()
      setDateError('Veuillez sélectionner une date dans le futur')
    }
  }

  const checkOpenModalTrip = () => {
    // !! Check Premium pour ajouter des circuits
    if (trips.length > 3) {
      setOpenAlertToContinue(false)
      alert('Vous ne pouvez plus ajouter de circuits ! Passez en Premium')
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

  // Permet d'ouvrir la modal du parcours si on a un parcours a editer
  useEffect(() => {
    if (isEditTrip) {
      setShowModalTrip(true)
    }
  }, [isEditTrip])

  // Au clic sur le bouton pour passer a l'étape 3
  const goToNextStep = () => {
    if (!addressToDB) {
      setAddressError('Vous devez renseigner une adresse')
    }

    if (!date) {
      setDateError('Vous devez renseigner une date')
    }

    if (addressToDB && date) {
      const dataStep2 = {
        address: isClubAddress ? "Adresse du club depuis l'api" : addressToDB,
        trips: trips.length > 0 ? trips : null,
        date: dateForDB,
      }

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
          subTitle="Inscrivez l'adresse ou se trouvera la randonnée, ainsi que les parcours
    disponible si vous le souhaitez."
          nextStepCondition={addressToDB && date}
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
                onPress={(isChecked) => setIsClubAddress(isChecked)}
              />

              {!isClubAddress && (
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

              {/* DATE DE LA RANDO */}
              <Text style={[littleTitle, mt30, { color: colors.text }]}>
                Date de la rando
              </Text>
              <InputFieldButton
                onPress={showDatePicker}
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
                        onPress={() => toggleBottomSheet(trip)}
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

          {/* Modal DatePicker */}
          <DateTimePickerModal
            isVisible={datePickerVisibility}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
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
            message={`Etes vous sur de vouloir supprimer le parcours de : ${trip?.distance} km ?`}
            onDismiss={() => setShowDeleteTrip(false)}
            onCancelPressed={() => setShowDeleteTrip(false)}
            onConfirmPressed={() => setShowDeleteTrip(false)}
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
