import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import useFaker from '../../../../../../hooks/useFaker'

import CustomLabelNavigation from '../../../../../../components/CustomLabelNavigation'
import ClubsFollowCard from '../../../../../../components/Profile/User/ClubsFollowCard'

const ClubsUserFollowScreen = ({ navigation }) => {
  const { colors } = useTheme()

  // Pour les tests
  const { createFakeClub } = useFaker()
  const [clubs, setClubs] = useState([])

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      setClubs((oldData) => [...oldData, createFakeClub(i + 1)])
    }
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomLabelNavigation
        label="Les clubs que je suis"
        colors={colors}
        onPress={() => {
          navigation.goBack()
        }}
      />

      <View style={styles.content}>
        <FlatList
          data={clubs}
          renderItem={({ item }) => <ClubsFollowCard club={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default ClubsUserFollowScreen

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginVertical: 10,
    marginBottom: 50,
  },
})
