import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
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

import useUtils from '../../../hooks/useUtils'

import CustomDivider from '../../CustomDivider'
import CustomButton from '../../CustomButton'

const MembersCard = ({
  member,
  redBtn,
  onPressLeftBtn,
  onPressRightBtn,
  toggleFollow,
}) => {
  const { formatDate } = useUtils()

  return (
    <View style={styles.container}>
      {/* Ajout favoris */}
      <TouchableOpacity onPress={toggleFollow} style={styles.editIcon}>
        <MaterialCommunityIcons
          name="star-outline" // star
          size={25}
          color={darkColor}
        />
      </TouchableOpacity>

      {/* Icon */}
      <View style={styles.header}>
        <ImageBackground
          source={{
            uri: member.avatar,
          }}
          style={styles.avatar}
          imageStyle={{ borderRadius: 25 }}
        />

        <View>
          {/* Nom du member */}
          <Text style={[defaultTextBold, { color: darkColor }]}>
            {member.firstname} {member.lastname}
          </Text>
          {/* Ville du member */}
          <Text style={[defaultText, { color: darkColor, fontSize: 14 }]}>
            {member.country}
          </Text>
        </View>
      </View>

      <CustomDivider addStyle={{ borderTopColor: darkColor }} />

      <View style={styles.content}>
        {/* Date membre */}
        <Text style={[defaultText, { color: darkColor }]}>
          membre depuis : {formatDate(member.dateMember)}
        </Text>
      </View>

      <CustomDivider addStyle={{ borderTopColor: darkColor }} />

      <View style={styles.buttons}>
        {/* Btn demande adhesion */}

        <CustomButton
          onPress={onPressLeftBtn}
          btnStyle={{ width: '49%' }}
          gradient={[cancelColor, dangerColor]}
        >
          {redBtn}
        </CustomButton>

        {/* Btn voir détails */}
        <CustomButton onPress={onPressRightBtn} btnStyle={{ width: '49%' }}>
          Voir détails
        </CustomButton>
      </View>
    </View>
  )
}

export default MembersCard

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 10,
    backgroundColor: secondaryColor,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
    shadowColor: darkColor,
    marginBottom: 10,
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
  editIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 2,
  },
})
