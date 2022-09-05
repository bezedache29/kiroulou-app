import {
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

import { useNavigation } from '@react-navigation/native'
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
import useAxios from '../../../hooks/useAxios'
import CustomLoader from '../../CustomLoader'

const PoepleHypeModal = ({ peopleHype }) => {
  const { colors } = useTheme()
  const { axiosGetWithToken } = useAxios()

  const navigation = useNavigation()

  const [hypers, setHypers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    for (const hyper of peopleHype) {
      const response = await axiosGetWithToken(`users/${hyper.user_id}`)

      setHypers((oldHypers) => [...oldHypers, response.data])
    }

    setLoading(false)
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={[TitleH3, textAlignCenter, mb20, { color: colors.text }]}>
        {peopleHype && peopleHype.length} Personnes hypes
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          {hypers.map((user) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UserProfile', { userId: user.id })
              }
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
                  source={
                    user.avatar !== null
                      ? {
                          uri: `${URL_SERVER}/storage/${user.avatar}`,
                        }
                      : require('../../../assets/images/png/default-avatar.png')
                  }
                  style={styles.avatar}
                  imageStyle={{ borderRadius: 25 }}
                />
              </View>
              <View style={{ flex: 4 }}>
                <Text style={[littleTitle, { color: colors.text }]}>
                  {user.firstname
                    ? `${user.firstname} ${user.lastname}`
                    : user.email}
                </Text>
                <Text style={[defaultText, { color: colors.text }]}>
                  {user.club_name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {loading && <CustomLoader style={mt20} />}
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
