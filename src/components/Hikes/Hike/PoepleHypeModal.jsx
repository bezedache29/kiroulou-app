import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import {
  defaultText,
  littleTitle,
  mb20,
  mt20,
  mx20,
  rowCenter,
  textAlignCenter,
  TitleH3,
} from '../../../assets/styles/styles'

const PoepleHypeModal = ({ peopleHype }) => {
  const { colors } = useTheme()

  return (
    <View style={{ flex: 1 }}>
      <Text style={[TitleH3, textAlignCenter, mb20, { color: colors.text }]}>
        {peopleHype && peopleHype.length} Personnes hypes
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {peopleHype &&
          peopleHype.map((user) => (
            <TouchableOpacity
              onPress={() => alert(`go to ${user.firstname}`)}
              key={user.id}
              style={[
                rowCenter,
                mx20,
                mt20,
                styles.border,
                {
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={styles.avatarContainer}>
                <ImageBackground
                  source={{
                    uri: user.avatar,
                  }}
                  style={styles.avatar}
                  imageStyle={{ borderRadius: 25 }}
                />
              </View>
              <View style={{ flex: 4 }}>
                <Text style={[littleTitle, { color: colors.text }]}>
                  {user.firstname} {user.lastname}
                </Text>
                <Text style={[defaultText, { color: colors.text }]}>
                  {user.country}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  )
}

export default PoepleHypeModal

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  avatarContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  avatar: {
    width: 35,
    height: 35,
  },
})
