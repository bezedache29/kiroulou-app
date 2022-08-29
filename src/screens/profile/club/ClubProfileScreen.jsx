import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { useTheme } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import DateTimePickerModal from 'react-native-modal-datetime-picker'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import AwesomeAlert from 'react-native-awesome-alerts'

import { useStoreState } from 'easy-peasy'

import {
  cancelColor,
  darkPrimaryColor,
  defaultText,
  mb10,
  mb30,
  mt20,
  mt40,
  mx10,
  textAlignCenter,
  TitleH3,
} from '../../../assets/styles/styles'

import CustomLabelNavigation from '../../../components/CustomLabelNavigation'
import LayoutProfile from '../../../components/Profile/LayoutProfile'
import ClubInformationsScene from './scenes/informations/ClubInformationsScene'
import ClubPostsScene from './scenes/posts/ClubPostsScene'
import CustomBSModal from '../../../components/CustomBSModal'
import ButtonBS from '../../../components/ButtonBS'
import CustomOverlay from '../../../components/CustomOverlay'
import ClubMembersScene from './scenes/members/ClubMembersScene'
import useCustomToast from '../../../hooks/useCustomToast'
import useAxios from '../../../hooks/useAxios'
import useUtils from '../../../hooks/useUtils'
import CustomBigButton from '../../../components/CustomBigButton'

const ClubProfileScreen = ({ navigation, route }) => {
  // Hooks
  const { colors } = useTheme()
  const { toastShow } = useCustomToast()
  const { dateToTimestamp, formatDateToSql } = useUtils()
  const { axiosPutWithToken, axiosGetWithToken } = useAxios()

  const { clubId } = route.params

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  // Variables
  const [club, setClub] = useState(false)
  const [overlay, setOverlay] = useState(false)
  const [hikeDate, setHikeDate] = useState(new Date(Date.now()))
  const [loader, setLoader] = useState(true)
  const [showAlertDeleteClub, setShowAlertDeleteClub] = useState(false)
  const [datePickerVisibility, setDatePickerVisibility] = useState(false)

  // Les titres de la TabView
  const [routes] = useState([
    { key: 'informations', title: 'Informations' },
    { key: 'posts', title: 'Articles' },
    { key: 'members', title: 'Membres' },
  ])

  useEffect(() => {
    loadClub()
  }, [])

  const loadClub = async () => {
    const response = await axiosGetWithToken(`clubs/${clubId}/clubInformations`)

    console.log('response', response.data)

    setClub(response.data)
    setLoader(false)
  }

  const renderScene = ({ route }) => {
    if (route.key === 'informations' && club) {
      return <ClubInformationsScene club={club} />
    }
    if (route.key === 'posts' && club) {
      return <ClubPostsScene club={club} />
    }
    if (
      route.key === 'members' &&
      club &&
      (user.club_id === club.id || user.premium === 'active')
    ) {
      return <ClubMembersScene item={club} />
    }
    // TODO Srcreen informant qu'il faut etre premium et lien vers achat premium
    return (
      <View style={mx10}>
        <Text style={[TitleH3, mt20, textAlignCenter, { color: colors.text }]}>
          Accès Refusé !
        </Text>
        <Text style={[defaultText, mb10, mt40, { color: colors.text }]}>
          Cette page est reservé aux utilisateurs ayant un compte premium de
          niveau 1 minimum
        </Text>
        <Text style={[defaultText, mb30, { color: colors.text }]}>
          Vous pouvez mettre à niveau votre compte en cliquant sur le bouton
          ci-dessous
        </Text>
        <CustomBigButton
          label="Voir les premiums"
          onPress={() => navigation.navigate('Subs')}
        />
      </View>
    )
  }

  // On format la date pour qu'elle soit prise ne compte avec DateTimePickerModal
  useEffect(() => {
    if (club && club.next_hike !== null) {
      // console.log('date new date', new Date(club.next_hike.date))
      setHikeDate(new Date(club.next_hike.date))
    }
  }, [club])

  // Ref pour la bottomSheet Type
  const optionsProfile = useRef(null)

  const closeBottomSheet = () => {
    setOverlay(false)
    optionsProfile?.current?.closeBottomSheet()
  }

  // Permet d'ouvrir et fermer la bottomSheet pour choisir le type de vélo
  const toggleBottomSheet = () => {
    if (overlay) {
      closeBottomSheet()
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
    setDatePickerVisibility(false)

    const timestampNow = dateToTimestamp(new Date())
    const timestampHike = dateToTimestamp(date)

    // Si pas de rando futur
    if (club.next_hike === null) {
      toastShow({
        title: 'Action impossible',
        message: "Vous devez d'abord créer un rando avant de changer sa date",
        type: 'toast_danger',
      })
    } else if (timestampNow > timestampHike) {
      // Si la date saise est une date passé
      toastShow({
        title: 'Action impossible',
        message: 'Vous devez choisir une date dans le futur',
        type: 'toast_danger',
      })
    } else {
      // Sinon on chnage la date d'affichage et la date en DB
      setHikeDate(date)
      changeDateOnDB(date)
    }
  }

  const changeDateOnDB = async (date) => {
    const response = await axiosPutWithToken(
      `hikes/vtt/${club.next_hike.id}/changeDate`,
      { date: formatDateToSql(date) }
    )

    if (response.status === 201) {
      toastShow({
        title: 'Date changée avec succès !',
        message: 'La date de votre rando a bien été changée',
      })
    }
  }

  if (loader) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <CustomLabelNavigation
            label={
              // eslint-disable-next-line no-nested-ternary
              user && user.is_club_admin !== 0 && user.club_id === club.id
                ? 'Mon Club'
                : club.short_name !== null
                ? club.short_name
                : club.name
            }
            colors={colors}
            onPress={() => navigation.goBack()}
          />

          {/* Icone en haut a droite qui permet de modifier son profil */}
          {user && user.is_club_admin !== 0 && user.club_id === club.id && (
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
          )}

          <View style={{ flex: 1 }}>
            {/* Change la couleur de l'arriere plan et le zindex */}
            {overlay && <CustomOverlay />}

            {/* Layout qui ajoute une TabView vide */}
            <LayoutProfile
              renderScene={renderScene}
              routes={routes}
              profile="clubs"
              data={club}
              hikeDate={hikeDate}
            />
          </View>

          {/* BottomSheet pour les les options d'edit de profil du club */}
          <CustomBSModal
            title="Que souhaitez vous modifier ?"
            SP={['25%', '48%']}
            ref={optionsProfile}
            onDismiss={closeBottomSheet}
          >
            <ButtonBS
              onPress={() => {
                setShowAlertDeleteClub(true)
              }}
              cancel
            >
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
                closeBottomSheet()
                setDatePickerVisibility(true)
              }}
            >
              Changer la date de la randonnée
            </ButtonBS>
          </CustomBSModal>

          {/* Modal DatePicker */}
          <DateTimePickerModal
            isVisible={datePickerVisibility}
            mode="date"
            date={hikeDate} // La date doit etre au format : new Date(xxxx-xx-xx)
            onConfirm={handleConfirm}
            onCancel={() => setDatePickerVisibility(false)}
          />

          {/* Alert avant de changer de supprimer le club */}
          <AwesomeAlert
            show={showAlertDeleteClub}
            showProgress={!showAlertDeleteClub}
            title="Attention !"
            message="Supprimer le club entrainera la perte de ses données et de son historique"
            closeOnTouchOutside
            closeOnHardwareBackPress={false}
            showCancelButton
            showConfirmButton
            cancelText="Annuler"
            confirmText="Supprimer"
            confirmButtonColor={darkPrimaryColor}
            cancelButtonColor={cancelColor}
            cancelButtonTextStyle={defaultText}
            confirmButtonTextStyle={defaultText}
            onDismiss={() => {
              setShowAlertDeleteClub(false)
            }}
            contentContainerStyle={{ backgroundColor: colors.background }}
            titleStyle={[TitleH3, { color: colors.text }]}
            messageStyle={[defaultText, { color: colors.text }]}
            onCancelPressed={() => {
              setShowAlertDeleteClub(false)
            }}
            onConfirmPressed={() => {
              setShowAlertDeleteClub(false)
            }}
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
