import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import useFaker from '../../../../../../hooks/useFaker'

import CustomLabelNavigation from '../../../../../../components/CustomLabelNavigation'
import UsersFollowCard from '../../../../../../components/Profile/User/UsersFollowCard'

const UsersUserFollowScreen = ({ navigation }) => {
  const { colors } = useTheme()

  // Pour les tests
  const { createFakeUser } = useFaker()
  const [users, setUsers] = useState([])

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      setUsers((oldData) => [...oldData, createFakeUser(i + 1)])
    }
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomLabelNavigation
        label="Les personnes que je suis"
        colors={colors}
        onPress={() => {
          navigation.goBack()
        }}
      />

      <View style={styles.content}>
        <FlatList
          data={users}
          renderItem={({ item }) => <UsersFollowCard user={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default UsersUserFollowScreen

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginVertical: 10,
    marginBottom: 50,
  },
})
