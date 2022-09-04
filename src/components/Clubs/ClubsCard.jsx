import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useStoreState, useStoreActions } from 'easy-peasy'

import { URL_SERVER } from 'react-native-dotenv'

import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import {
  cancelColor,
  dangerColor,
  darkColor,
  defaultText,
  defaultTextBold,
} from '../../assets/styles/styles'

import CustomDivider from '../CustomDivider'
import CustomButton from '../CustomButton'
import useAxios from '../../hooks/useAxios'
import useCustomToast from '../../hooks/useCustomToast'
import CustomAlert from '../CustomAlert'

const ClubsCard = ({ club, refresh }) => {
  const { colors } = useTheme()
  const { toastShow } = useCustomToast()
  const { axiosPostWithToken, axiosPutWithToken } = useAxios()

  const navigation = useNavigation()

  const userActions = useStoreActions((actions) => actions.user)
  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const [showLeaveClub, setShowLeaveClub] = useState(false)

  const requestToJoin = async () => {
    const response = await axiosPostWithToken(`clubs/${club.id}/requestToJoin`)

    if (response.status === 201) {
      toastShow({
        title: 'Demande effectuée !',
        message: `${club.name} a bien reçu ta demande d'adhésion`,
      })
    }

    if (response.status === 403) {
      toastShow({
        title: 'Demande dejà effectué !',
        message: response.data.message,
        type: 'toast_danger',
      })
    }
  }

  const noLongerJoin = async () => {
    setShowLeaveClub(false)
    const response = await axiosPutWithToken('users/leaveClub')

    if (response.status === 201) {
      toastShow({
        title: 'Club quitté !',
        message: "Vous ne faites plus parti d'un club",
      })
      userActions.loadUser(response.data.user)
      refresh(true)

      // TODO envoie d'une notification à tous les membres pour informer le leave ?
    }
  }

  const checkIfAdmin = () => {
    if (user.club_id === club.id && user.is_club_admin === 1) {
      toastShow({
        title: 'Action impossible !',
        message:
          'Vous ne pouvez pas quitter un club en étant administrateur de celui ci',
        type: 'toast_danger',
      })
    } else {
      setShowLeaveClub(true)
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      {/* Icon */}
      <View style={styles.header}>
        <ImageBackground
          source={{
            uri: `${URL_SERVER}/storage/${club.avatar}`,
          }}
          style={styles.avatar}
          imageStyle={{ borderRadius: 25 }}
        />
        <View>
          {/* Nom du club */}
          <Text style={[defaultTextBold, { color: colors.text }]}>
            {club.name}
          </Text>
          {/* Ville du club */}
          <Text style={[defaultText, { color: colors.text, fontSize: 14 }]}>
            {club.address.city.name}
          </Text>
        </View>
      </View>

      <CustomDivider addStyle={{ borderTopColor: colors.border }} />

      {/* Les users premium peuvent voir le nb de membres et de followers */}
      {user.premium === 'active' ||
        (user.club_id === club.id && (
          <>
            <View style={styles.content}>
              {/* Nombre de membres */}
              <Text style={[defaultText, { color: colors.text }]}>
                {club.members_count} membres
              </Text>
              <MaterialCommunityIcons
                name="circle-small"
                size={20}
                color={colors.text}
              />
              {/* Nombre de followers */}
              <Text style={[defaultText, { color: colors.text }]}>
                {club.user_follows_count} followers
              </Text>
            </View>

            <CustomDivider addStyle={{ borderTopColor: colors.border }} />
          </>
        ))}

      <View style={styles.buttons}>
        {/* Btn demande adhesion */}
        {user.club_id !== null && user.club_id === club.id ? (
          <CustomButton
            onPress={checkIfAdmin}
            btnStyle={{ width: '49%' }}
            gradient={[cancelColor, dangerColor]}
          >
            Ne plus adhérer
          </CustomButton>
        ) : (
          <CustomButton onPress={requestToJoin} btnStyle={{ width: '49%' }}>
            Adhésion
          </CustomButton>
        )}

        {/* Btn voir détails */}
        <CustomButton
          onPress={() =>
            navigation.navigate('ClubProfile', { clubId: club.id })
          }
          btnStyle={{ width: '49%' }}
        >
          Voir détails
        </CustomButton>
      </View>

      <CustomAlert
        showAlert={showLeaveClub}
        title="Attention !"
        message={`Etes vous sur de vouloir quitter ${club.name} ?`}
        onDismiss={() => setShowLeaveClub(false)}
        onCancelPressed={() => setShowLeaveClub(false)}
        onConfirmPressed={() => noLongerJoin()}
      />
    </View>
  )
}

export default ClubsCard

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
    shadowColor: darkColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 35,
    height: 35,
    marginRight: 20,
    marginLeft: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
})
