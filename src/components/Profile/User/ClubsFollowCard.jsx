import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  cancelColor,
  dangerColor,
  darkColor,
  defaultText,
  defaultTextBold,
  secondaryColor,
} from '../../../assets/styles/styles'

import CustomDivider from '../../CustomDivider'
import CustomButton from '../../CustomButton'

const ClubsFollowCard = ({ club }) => (
  <View style={styles.container}>
    {/* Icon */}
    <View style={styles.header}>
      <ImageBackground
        source={{
          uri: club.uri,
        }}
        style={styles.avatar}
        imageStyle={{ borderRadius: 25 }}
      />
      <View>
        {/* Nom du club */}
        <Text style={[defaultTextBold, { color: darkColor }]}>{club.name}</Text>
        {/* Ville du club */}
        <Text style={[defaultText, { color: darkColor, fontSize: 14 }]}>
          {club.city}
        </Text>
      </View>
    </View>

    <CustomDivider addStyle={{ borderTopColor: darkColor }} />

    <View style={styles.content}>
      {/* Nombre de membres */}
      <Text style={[defaultText, { color: darkColor }]}>
        {club.members} membres
      </Text>
      <MaterialCommunityIcons name="circle-small" size={20} color={darkColor} />
      {/* Nombre de publications */}
      <Text style={[defaultText, { color: darkColor }]}>
        {club.posts} publications
      </Text>
    </View>

    <CustomDivider addStyle={{ borderTopColor: darkColor }} />

    <View style={styles.content}>
      <Text style={[defaultText, { color: darkColor }]}>
        Prochaine rando : 16-12-2023
      </Text>
    </View>

    <View style={styles.buttons}>
      {/* Btn demande adhesion */}
      <CustomButton
        onPress={() => {}}
        btnStyle={{ width: '49%' }}
        gradient={[cancelColor, dangerColor]}
      >
        Ne plus suivre
      </CustomButton>

      {/* Btn voir détails */}
      <CustomButton
        onPress={() => {
          alert(club.id)
        }}
        btnStyle={{ width: '49%' }}
      >
        Voir détails
      </CustomButton>
    </View>
  </View>
)

export default ClubsFollowCard

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 10,
    backgroundColor: secondaryColor,
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
