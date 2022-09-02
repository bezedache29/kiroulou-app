import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import React, { useContext, useRef, useState } from 'react'

import { useTheme, TouchableRipple } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { useStoreState, useStoreActions } from 'easy-peasy'

import {
  darkPrimaryColor,
  defaultText,
  littleText,
  mb10,
  ml10,
  ml20,
  mlAuto,
  mr10,
  mr20,
  mt10,
  mt20,
  my10,
  rowCenter,
  secondaryColor,
  textItalic,
} from '../assets/styles/styles'

import CustomLabelNavigation from '../components/CustomLabelNavigation'
import CustomDivider from '../components/CustomDivider'
import LayoutSection from '../components/Settings/LayoutSection'
import { AppContext } from '../context/Context'
import CustomBSModal from '../components/CustomBSModal'
import ButtonBS from '../components/ButtonBS'
import CustomOverlay from '../components/CustomOverlay'
import CustomAlert from '../components/CustomAlert'

import useAxios from '../hooks/useAxios'
import useCustomToast from '../hooks/useCustomToast'

const SettingsScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const paperTheme = useTheme() // Recupère la valeur du darkmode
  const { toggleTheme } = useContext(AppContext)
  const { axiosPostWithToken, axiosDeleteWithToken } = useAxios()
  const { toastShow } = useCustomToast()

  const userActions = useStoreActions((actions) => actions.user)
  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const [overlay, setOverlay] = useState(false)
  const [showCancelSub, setShowCancelSub] = useState(false)
  const [showDeleteUser, setShowDeleteUser] = useState(false)
  const [showNoDeleteUser, setShowNoDeleteUser] = useState(false)

  const notifications = {
    push: user.is_push_notifications,
    email: user.is_email_notifications,
  }

  // Ref pour la bottomSheet
  const bottomSheetRef = useRef(null)

  // Permet d'ouvrir et fermer la bottomSheet pour afficher les options de l'article
  const toggleBottomSheet = () => {
    if (overlay) {
      setOverlay(false)
      bottomSheetRef?.current?.closeBottomSheet()
    } else {
      setOverlay(true)
      bottomSheetRef?.current?.openBottomSheet()
    }
  }

  const deleteUser = async () => {
    setShowDeleteUser(false)

    let error = false

    // Check si le user est admin du club
    if (user.is_club_admin === 1) {
      error = true
      setShowNoDeleteUser(true)
    }

    // Si pas d'erreur, on supprime le user
    if (!error) {
      const response = await axiosDeleteWithToken(`users/${user.id}`)

      if (response.status === 201) {
        userActions.loadUser({})
        await AsyncStorage.removeItem('kro_auth_token')
        navigation.reset({
          index: 0,
          routes: [{ name: 'Splash' }],
        })
      } else {
        toastShow({
          title: 'Action impossible !',
          message: `Merci de réessayer plus tard (${response.status})`,
          type: 'toast_danger',
        })
      }
    }
  }

  const cancelSub = async () => {
    setShowCancelSub(false)
    setOverlay(false)
    bottomSheetRef?.current?.closeBottomSheet()

    const response = await axiosPostWithToken('subscriptions/cancel')

    if (response.status === 404) {
      toastShow({
        title: 'Abonnement introuvable !',
        message: `Pas d'abonnements (${response.status})`,
        type: 'toast_danger',
      })
    }

    if (response.status === 403) {
      toastShow({
        title: 'Action impossible !',
        message: `Vous avez déjà annulé l'abonnement en cours (${response.status})`,
        type: 'toast_danger',
      })
    }

    if (response.status === 201) {
      toastShow({
        title: 'Abonnement annulé !',
        message: `Vous pouvez profiter des bonus premium jusqu'à la date de fin de votre premium`,
      })
    }

    if (response.status === 500) {
      toastShow({
        title: 'Oops !',
        message: `Erreur critique (${response.status})`,
        type: 'toast_danger',
      })
    }

    console.log(response.data)
  }

  // Si le user n'a pas d'abonnements on le redirige vers la pages des abos
  // Sinon on lui propose plusieurs otpions dans la BS
  const goToSubs = () => {
    if (user.premium_name === null) {
      navigation.navigate('Subs')
    } else {
      toggleBottomSheet()
    }

    // navigation.navigate('Subs')
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={{ flex: 1 }}>
          <CustomLabelNavigation
            label="Paramètres"
            colors={colors}
            onPress={() => navigation.goBack()}
          />

          <View style={{ flex: 1 }}>
            <ScrollView>
              {overlay && <CustomOverlay />}
              {/* MON COMPTE */}
              <LayoutSection
                title="Compte"
                icon={
                  <MaterialCommunityIcons
                    name="account-cog"
                    size={24}
                    color={colors.icon}
                  />
                }
              >
                <TouchableOpacity onPress={goToSubs} style={[rowCenter, mt20]}>
                  {/* Première option Abonnements */}
                  <Text
                    style={[ml20, defaultText, { flex: 2, color: colors.text }]}
                  >
                    Abonnement actuel :
                  </Text>
                  <Text
                    style={[
                      user.premium_name === null ? textItalic : defaultText,
                      mr20,
                      {
                        flex: 1,
                        color:
                          user.premium_name === null
                            ? colors.text
                            : darkPrimaryColor,
                        textAlign: 'right',
                      },
                    ]}
                  >
                    {user.premium_name === null ? 'Gratuit' : user.premium_name}
                  </Text>
                </TouchableOpacity>

                <TouchableRipple
                  onPress={() => {
                    navigation.navigate('Invoices')
                  }}
                  style={mt20}
                >
                  <Text
                    style={[defaultText, my10, ml20, { color: colors.text }]}
                  >
                    Mes factures
                  </Text>
                </TouchableRipple>

                <TouchableRipple
                  onPress={() => {
                    setShowDeleteUser(true)
                  }}
                  style={mt10}
                >
                  <Text
                    style={[defaultText, my10, ml20, { color: colors.text }]}
                  >
                    Supprimer mon compte
                  </Text>
                </TouchableRipple>
              </LayoutSection>

              <CustomDivider addStyle={[mt20, mb10]} />

              {/* PREFERENCES */}
              <LayoutSection
                title="Préférences"
                icon={
                  <MaterialCommunityIcons
                    name="cog"
                    size={24}
                    color={colors.icon}
                  />
                }
              >
                {/* Dark Mode */}
                <TouchableRipple onPress={toggleTheme}>
                  <View style={[styles.preferences, my10]}>
                    <Text style={[defaultText, ml20, { color: colors.text }]}>
                      Thème Sombre
                    </Text>
                    <View pointerEvents="none" style={[mlAuto, mr10]}>
                      <Switch value={paperTheme.dark} />
                    </View>
                  </View>
                </TouchableRipple>

                {/* Notifications */}
                <View style={[rowCenter, my10]}>
                  <Text style={[ml20, defaultText, { color: colors.text }]}>
                    Notifications
                  </Text>
                  <View style={[rowCenter, mlAuto, mr20]}>
                    {/* PUSH */}
                    <TouchableOpacity onPress={() => {}}>
                      <MaterialCommunityIcons
                        name={
                          notifications.push
                            ? 'cellphone-message'
                            : 'cellphone-message-off'
                        }
                        size={30}
                        color={notifications.push ? colors.icon : colors.text}
                        style={mr10}
                      />
                    </TouchableOpacity>

                    {/* EMAIL */}
                    <TouchableOpacity onPress={() => {}}>
                      <MaterialCommunityIcons
                        name={notifications.email ? 'email' : 'email-off'}
                        size={30}
                        color={notifications.email ? colors.icon : colors.text}
                        style={ml10}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </LayoutSection>

              <CustomDivider addStyle={[mt20, mb10]} />

              {/* AIDES */}
              <LayoutSection
                title="Aide"
                icon={
                  <MaterialCommunityIcons
                    name="help-circle"
                    size={24}
                    color={colors.icon}
                  />
                }
              >
                {/* FAQ */}
                <TouchableRipple
                  onPress={() => {
                    navigation.navigate('SupportAndQuestions')
                  }}
                  style={mt20}
                >
                  <Text
                    style={[defaultText, my10, ml20, { color: colors.text }]}
                  >
                    Assistance
                  </Text>
                </TouchableRipple>

                {/* Conditions Générales */}
                <TouchableRipple
                  onPress={() => {
                    navigation.navigate('TermsAndConditions')
                  }}
                  style={mt10}
                >
                  <Text
                    style={[defaultText, my10, ml20, { color: colors.text }]}
                  >
                    Conditions Générales
                  </Text>
                </TouchableRipple>

                {/* Infos Légales */}
                <TouchableRipple
                  onPress={() => {
                    navigation.navigate('LegalNotice')
                  }}
                  style={mt10}
                >
                  <Text
                    style={[defaultText, my10, ml20, { color: colors.text }]}
                  >
                    Infos Légales
                  </Text>
                </TouchableRipple>
              </LayoutSection>
            </ScrollView>
          </View>

          {/* Numéro de version de l'application */}
          <View style={[rowCenter, styles.footerContainer]}>
            <Text
              style={[ml20, mb10, littleText, { color: colors.text, flex: 1 }]}
            >
              Version
            </Text>
            <Text
              style={[
                littleText,
                mb10,
                mr20,
                styles.versionNumber,
                { color: colors.text },
              ]}
            >
              v1.0.0
            </Text>
          </View>

          <CustomAlert
            showAlert={showCancelSub}
            title="Attention !"
            message={`Etes vous sur de vouloir annuler votre abonnement ${user.premium_name} ?`}
            onDismiss={() => setShowCancelSub(false)}
            onCancelPressed={() => setShowCancelSub(false)}
            onConfirmPressed={() => cancelSub()}
          />

          <CustomAlert
            showAlert={showDeleteUser}
            title="Attention !"
            message={`Etes vous sur de vouloir supprimer votre compte ?\n\nCette action est irréversible !`}
            onDismiss={() => setShowDeleteUser(false)}
            onCancelPressed={() => setShowDeleteUser(false)}
            onConfirmPressed={() => deleteUser()}
          />

          <CustomAlert
            showAlert={showNoDeleteUser}
            title="Impossbile !"
            message={`Vous devez d'abord changer l'administrateur de votre club ou supprimer ce dernier`}
            cancelText="Annuler"
            confirmText="Voir mon club"
            onDismiss={() => setShowNoDeleteUser(false)}
            onCancelPressed={() => setShowNoDeleteUser(false)}
            onConfirmPressed={() =>
              navigation.navigate('ClubProfile', { clubId: user.club_id })
            }
          />

          {/* BottomSheet pour options de l'abonnement */}
          <CustomBSModal
            title="Que souhaitez vous faire ?"
            SP={['25%', '40%']}
            ref={bottomSheetRef}
            onDismiss={() => {
              setOverlay(false)
              bottomSheetRef?.current?.closeBottomSheet()
            }}
          >
            <ButtonBS
              onPress={() => {
                // TODO Faire la page vers cancel sub
                setShowCancelSub(true)
              }}
              cancel
            >
              Supprimer mon abonnement
            </ButtonBS>
            <ButtonBS
              onPress={() => {
                setOverlay(false)
                bottomSheetRef?.current?.closeBottomSheet()
                navigation.navigate('Subs')
              }}
            >
              Modifier mon abonnement
            </ButtonBS>
            <ButtonBS
              onPress={() => {
                setOverlay(false)
                bottomSheetRef?.current?.closeBottomSheet()
                navigation.navigate('SubDetails')
              }}
            >
              Voir l'état de mon abonnement
            </ButtonBS>
          </CustomBSModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  preferences: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: -1,
  },
  versionNumber: {
    textAlign: 'right',
    flex: 1,
  },
  panelHeader: {
    flex: 1,
    backgroundColor: secondaryColor,
    zIndex: 2,
    paddingHorizontal: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: darkPrimaryColor,
    alignItems: 'center',
    marginVertical: 7,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    opacity: 0.2,
    backgroundColor: 'red',
  },
})

export default SettingsScreen
