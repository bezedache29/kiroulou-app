import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { useTheme } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import DateTimePickerModal from 'react-native-modal-datetime-picker'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import CustomLabelNavigation from '../../../components/CustomLabelNavigation'
import LayoutProfile from '../../../components/Profile/LayoutProfile'
import ClubInformationsScene from './scenes/informations/ClubInformationsScene'
import ClubPostsScene from './scenes/posts/ClubPostsScene'
import CustomBSModal from '../../../components/CustomBSModal'
import ButtonBS from '../../../components/ButtonBS'
import CustomOverlay from '../../../components/CustomOverlay'
import useFaker from '../../../hooks/useFaker'
import ClubMembersScene from './scenes/members/ClubMembersScene'
import useDatePicker from '../../../hooks/useDatePicker'

const ClubProfileScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const { createFakeClub } = useFaker()
  const { datePickerVisibility, showDatePicker, hideDatePicker } =
    useDatePicker()

  const [overlay, setOverlay] = useState(false)
  const [club, setClub] = useState([])
  const [treckDate, setTreckDate] = useState()
  const [loader, setLoader] = useState(false)
  const [change, setChange] = useState(false)

  // Les titres de la TabView
  const [routes] = useState([
    { key: 'informations', title: 'Informations' },
    { key: 'posts', title: 'Articles' },
    { key: 'members', title: 'Membres' },
  ])

  // Les trois vues du tabView
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'informations':
        return <ClubInformationsScene club={club} />

      case 'posts':
        return <ClubPostsScene />

      case 'members':
        return <ClubMembersScene />

      default:
        return null
    }
  }

  useEffect(() => {
    setClub(createFakeClub())
  }, [])

  useEffect(() => {
    setTreckDate(club.dateTreck)
  }, [club])

  // Ref pour la bottomSheet Type
  const optionsProfile = useRef(null)

  // Permet d'ouvrir et fermer la bottomSheet pour choisir le type de vélo
  const toggleBottomSheet = () => {
    if (overlay) {
      setOverlay(false)
      optionsProfile?.current?.closeBottomSheet()
    } else {
      setOverlay(true)
      optionsProfile?.current?.openBottomSheet()
    }
  }

  const goTo = (direction) => {
    optionsProfile?.current?.closeBottomSheet()
    if (direction === 'EditClubProfile') {
      navigation.navigate(direction)
    } else if (direction === 'AdminClubProfile') {
      navigation.navigate(direction)
    }
  }

  // A la confirmation de la date du DatePicker
  const handleConfirm = (date) => {
    setLoader(true)
    setTreckDate(date)
    setChange(true)

    // !! Modifier la date en DB !!

    hideDatePicker()
  }

  useEffect(() => {
    if (!datePickerVisibility) {
      setLoader(false)
    }
  }, [datePickerVisibility])

  useEffect(() => {
    if (change) {
      alert('La date a bien été changée !')
      setChange(false)
    }
  }, [change])

  if (loader) {
    return <View />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <CustomLabelNavigation
            label="Mon club"
            colors={colors}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Drawer' }],
              })
            }}
          />

          {/* Icone en haut a droite qui permet de modifier son profil */}
          <TouchableOpacity
            onPress={() => {
              toggleBottomSheet()
            }}
            style={styles.editIcon}
          >
            <MaterialCommunityIcons
              name="account-edit"
              size={28}
              color={colors.text}
            />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            {/* Change la couleur de l'arriere plan et le zindex */}
            {overlay && <CustomOverlay />}

            {/* Layout qui ajoute une TabView vide */}
            <LayoutProfile
              renderScene={renderScene}
              routes={routes}
              profile="club"
              data={club}
              treckDate={treckDate}
            />
          </View>

          {/* BottomSheet pour les les options d'edit de profil du club */}
          <CustomBSModal
            title="Que souhaitez vous modifier ?"
            SP={['25%', '48%']}
            ref={optionsProfile}
            onDismiss={toggleBottomSheet}
          >
            <ButtonBS onPress={() => {}} cancel>
              Supprimer le club
            </ButtonBS>
            <ButtonBS
              onPress={() => {
                goTo('AdminClubProfile')
              }}
            >
              Changer d'administrateur
            </ButtonBS>
            <ButtonBS
              onPress={() => {
                goTo('EditClubProfile')
              }}
            >
              Changer les informations
            </ButtonBS>
            <ButtonBS
              onPress={() => {
                toggleBottomSheet()
                showDatePicker()
              }}
            >
              Changer la date de la randonnée
            </ButtonBS>
          </CustomBSModal>

          {/* Modal DatePicker */}
          <DateTimePickerModal
            isVisible={datePickerVisibility}
            mode="date"
            date={treckDate}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}
export default ClubProfileScreen

const styles = StyleSheet.create({
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
})
