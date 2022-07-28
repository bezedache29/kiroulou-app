import { FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import {
  darkPrimaryColor,
  defaultLink,
  mt10,
  mx10,
  my10,
  textAlignCenter,
} from '../../../../../assets/styles/styles'
import useFaker from '../../../../../hooks/useFaker'
import MembersCard from '../../../../../components/Profile/Club/MemberCard'

const ClubMembersScene = () => {
  const { colors } = useTheme()

  const { createFakeUser } = useFaker()
  const [members, setMembers] = useState([])

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      setMembers((oldData) => [...oldData, createFakeUser()])
    }
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Text
        style={[
          textAlignCenter,
          defaultLink,
          my10,
          { flex: 1, color: darkPrimaryColor },
        ]}
        onPress={() => alert('demandes en attente')}
      >
        Demandes en attentes : 2
      </Text>
      <View style={{ flex: 20 }}>
        <FlatList
          data={members}
          renderItem={({ item }) => <MembersCard member={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={[mx10, mt10]}
        />
      </View>
    </View>
  )
}

export default ClubMembersScene
