import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  cancelColor,
  darkColor,
  defaultText,
  ml10,
  ml5,
  mr5,
  rowCenter,
  secondaryColor,
} from '../../../assets/styles/styles'

const UserWaitMembershipCar = ({ user }) => {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => alert('go to profile')}
        style={[rowCenter, { flex: 1, marginRight: 30 }]}
      >
        <ImageBackground
          source={{
            uri: user.avatar,
          }}
          style={styles.avatar}
          imageStyle={{ borderRadius: 25 }}
        />

        <Text style={[defaultText, ml10, styles.text]}>
          {user.firstname} {user.lastname}
        </Text>
      </TouchableOpacity>

      <View style={[rowCenter, mr5]}>
        <TouchableOpacity style={mr5}>
          <MaterialCommunityIcons
            name="checkbox-marked"
            size={30}
            color={colors.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={ml5}>
          <MaterialCommunityIcons
            name="close-box"
            size={30}
            color={cancelColor}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UserWaitMembershipCar

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    elevation: 5,
    backgroundColor: secondaryColor,
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 35,
    height: 35,
  },
  text: {
    color: darkColor,
    flex: 10,
  },
})
