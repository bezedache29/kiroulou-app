import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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
  rowCenter,
  textAlignCenter,
  TitleH3,
} from '../../../../../../assets/styles/styles'

import CustomLabelNavigation from '../../../../../../components/CustomLabelNavigation'
import BikeLi from '../../../../../../components/Profile/User/Bike/BikeLi'
import useFaker from '../../../../../../hooks/useFaker'
import CustomModal from '../../../../../../components/CustomModal'
import CustomDivider from '../../../../../../components/CustomDivider'
import CustomBigButton from '../../../../../../components/CustomBigButton'

const BikesUserScreen = ({ navigation }) => {
  const { colors } = useTheme()

  const [open, setOpen] = useState(false)
  const [bike, setBike] = useState(null)

  const openModal = (bike) => {
    setBike(bike)
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
    setBike(null)
  }

  const { createFakeBike } = useFaker()
  const [bikes, setBikes] = useState([])
  useEffect(() => {
    for (let i = 0; i < 6; i++) {
      setBikes((oldData) => [...oldData, createFakeBike()])
    }
  }, [])

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
          Nombre de vélo : 6
        </Text>
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
      </View>

      <ScrollView
        style={{ marginHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {bikes &&
          bikes.length > 0 &&
          bikes.map((bike) => (
            <BikeLi
              onPress={() => {
                openModal(bike)
              }}
              bike={bike}
              key={bike.id}
            />
          ))}
      </ScrollView>

      {/* Modal détails d'un vélo */}
      <CustomModal showModal={open} closeModal={closeModal}>
        {/* Titre */}
        <Text style={[textAlignCenter, TitleH3, { color: colors.text }]}>
          {bike?.name}
        </Text>

        {/* Details */}
        <ScrollView style={[mx20, mt30]}>
          {/* Image / photo du vélo */}
          {bike?.image && (
            <ImageBackground
              style={{ width: '100%', height: 150, marginBottom: 20 }}
              source={{ uri: bike?.image }}
              imageStyle={{ borderRadius: 8 }}
            />
          )}

          <Text style={[littleTitle, { color: colors.text }]}>
            Type de vélo
          </Text>
          <Text style={[defaultText, { color: colors.text }]}>
            {bike?.type}
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
            {bike?.weight} kg
          </Text>

          <CustomDivider addStyle={[mt5, mb10]} />

          <Text style={[littleTitle, { color: colors.text }]}>Année</Text>
          <Text style={[defaultText, { color: colors.text }]}>
            {bike?.year}
          </Text>

          <CustomDivider addStyle={[mt5]} />
        </ScrollView>

        {/* Boutons */}
        <View style={[mx20, mb10]}>
          <CustomBigButton
            onPress={() => {}}
            label="Supprimer mon vélo"
            style={{ marginTop: 0 }}
            styleBtn={{ marginVertical: 5 }}
            colors={[cancelColor, dangerColor]}
          />

          <CustomBigButton
            onPress={() => {}}
            label="Modifier mon vélo"
            style={{ marginTop: 0 }}
            styleBtn={{ marginVertical: 5 }}
          />
        </View>
      </CustomModal>
    </View>
  )
}

export default BikesUserScreen
