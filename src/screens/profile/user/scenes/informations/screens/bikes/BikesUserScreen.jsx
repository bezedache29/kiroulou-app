import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { URL_SERVER } from 'react-native-dotenv'

import { useStoreState } from 'easy-peasy'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useIsFocused } from '@react-navigation/native'
import {
  cancelColor,
  dangerColor,
  darkPrimaryColor,
  defaultText,
  littleTitle,
  mb10,
  mb30,
  mt30,
  mt5,
  mx20,
  px20,
  rowCenter,
  textAlignCenter,
  TitleH3,
} from '../../../../../../../assets/styles/styles'

import CustomLabelNavigation from '../../../../../../../components/CustomLabelNavigation'
import BikeLi from '../../../../../../../components/Profile/User/Bike/BikeLi'
import CustomModal from '../../../../../../../components/CustomModal'
import CustomDivider from '../../../../../../../components/CustomDivider'
import CustomBigButton from '../../../../../../../components/CustomBigButton'
import useUtils from '../../../../../../../hooks/useUtils'
import CustomAlert from '../../../../../../../components/CustomAlert'
import useAxios from '../../../../../../../hooks/useAxios'
import useCustomToast from '../../../../../../../hooks/useCustomToast'
import CustomLoader from '../../../../../../../components/CustomLoader'

const BikesUserScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { axiosGetWithToken, axiosDeleteWithToken } = useAxios()
  const { toastShow } = useCustomToast()

  const { userId } = route.params

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const isFocused = useIsFocused()

  const [open, setOpen] = useState(false)
  const [bikes, setBikes] = useState([])
  const [bike, setBike] = useState(null)
  const [loading, setLoading] = useState(true)

  const [showDeleteBike, setShowDeleteBike] = useState(false)

  const { formatDate } = useUtils()

  const openModal = (bike) => {
    console.log('bike', bike)
    setBike(bike)
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
    setBike(null)
  }

  // useEffect(() => {
  //   loadBikes()
  // }, [])

  useEffect(() => {
    if (isFocused) {
      loadBikes()
    }
  }, [isFocused])

  const loadBikes = async () => {
    const response = await axiosGetWithToken(`users/${userId}/bikes`)

    setBikes(response.data.reverse())
    setLoading(false)
  }

  const goToEditBike = (bike) => {
    closeModal()
    navigation.navigate('EditBike', {
      bike,
    })
  }

  const deleteBike = async () => {
    const response = await axiosDeleteWithToken(`users/bikes/${bike.id}`)

    if (response.status === 201) {
      setLoading(true)
      setShowDeleteBike(false)
      setOpen(false)

      toastShow({
        title: 'Vélo supprimé !',
        message: 'Votre vélo a bien été supprimé',
      })

      loadBikes()
    }
  }

  if (loading) {
    return <CustomLoader />
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomLabelNavigation
        label="Mes vélos"
        colors={colors}
        onPress={() => {
          navigation.goBack()
        }}
      />

      <View style={[rowCenter, mb30, { margin: 20 }]}>
        <Text style={[littleTitle, { color: colors.text }]}>
          Nombre de vélo : {bikes.length}
        </Text>
        {userId === user.id && bikes.length > 0 && (
          <TouchableOpacity
            style={{ marginLeft: 'auto' }}
            onPress={() => navigation.navigate('AddBike')}
          >
            <MaterialCommunityIcons
              name="plus-circle"
              size={35}
              color={darkPrimaryColor}
            />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={bikes}
        ListEmptyComponent={() => (
          <View style={styles.containerNoFeed}>
            {userId === user.id ? (
              <>
                <Text style={[defaultText, mb30, { color: colors.text }]}>
                  Vous n'avez pas de vélos pour le moment. Cliquez sur le bouton
                  ci-dessous pour en ajouter un.
                </Text>
                <CustomBigButton
                  label="Ajouter un vélo"
                  onPress={() => navigation.navigate('AddBike')}
                  styleBtn={px20}
                />
              </>
            ) : (
              <Text style={[defaultText, mb30, { color: colors.text }]}>
                Aucun vélo dans la collection
              </Text>
            )}
          </View>
        )}
        renderItem={({ item }) => (
          <BikeLi
            onPress={() => {
              openModal(item)
            }}
            bike={item}
          />
        )}
        keyExtractor={(item) => item.id}
        style={{ marginHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal détails d'un vélo */}
      <CustomModal showModal={open} closeModal={closeModal}>
        {/* Titre */}
        <Text style={[textAlignCenter, TitleH3, { color: colors.text }]}>
          {bike?.name}
        </Text>

        {/* Details */}
        <ScrollView style={[mx20, mt30]}>
          {/* Image / photo du vélo */}
          {bike?.image !== null && (
            <ImageBackground
              style={{ width: '100%', height: 150, marginBottom: 20 }}
              source={{ uri: `${URL_SERVER}/storage/${bike?.image}` }}
              imageStyle={{ borderRadius: 8 }}
            />
          )}

          <Text style={[littleTitle, { color: colors.text }]}>
            Type de vélo
          </Text>
          <Text style={[defaultText, { color: colors.text }]}>
            {bike?.bike_type.name}
          </Text>

          <CustomDivider addStyle={[mt5, mb10]} />

          <Text style={[littleTitle, { color: colors.text }]}>Marque</Text>
          <Text style={[defaultText, { color: colors.text }]}>
            {bike?.brand}
          </Text>

          <CustomDivider addStyle={[mt5, mb10]} />

          <Text style={[littleTitle, { color: colors.text }]}>Modèle</Text>
          <Text style={[defaultText, { color: colors.text }]}>
            {bike?.model}
          </Text>

          <CustomDivider addStyle={[mt5, mb10]} />

          <Text style={[littleTitle, { color: colors.text }]}>Poids</Text>
          <Text style={[defaultText, { color: colors.text }]}>
            {bike?.weight !== null ? `${bike?.weight} kd` : 'Non renseigné'}
          </Text>

          <CustomDivider addStyle={[mt5, mb10]} />

          <Text style={[littleTitle, { color: colors.text }]}>Date</Text>
          <Text style={[defaultText, { color: colors.text }]}>
            {bike?.date ? formatDate(new Date(bike?.date)) : 'Pas de date'}
          </Text>

          <CustomDivider addStyle={[mt5]} />
        </ScrollView>

        {/* Boutons */}
        <View style={[mx20, mb10]}>
          <CustomBigButton
            onPress={() => setShowDeleteBike(true)}
            label="Supprimer mon vélo"
            style={{ marginTop: 0 }}
            styleBtn={{ marginVertical: 5 }}
            colors={[cancelColor, dangerColor]}
          />

          <CustomBigButton
            onPress={() => goToEditBike(bike)}
            label="Modifier mon vélo"
            style={{ marginTop: 0 }}
            styleBtn={{ marginVertical: 5 }}
          />
        </View>

        <CustomAlert
          showAlert={showDeleteBike}
          title="Attention !"
          message={`Etes vous sur de vouloir supprimer le vélo : ${bike?.name} ?\n\nSes données seront perdues !`}
          onDismiss={() => setShowDeleteBike(false)}
          onCancelPressed={() => setShowDeleteBike(false)}
          onConfirmPressed={deleteBike}
        />
      </CustomModal>
    </View>
  )
}
const styles = StyleSheet.create({
  containerNoFeed: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
})

export default BikesUserScreen
