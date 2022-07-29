import { FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import {
  darkColor,
  defaultText,
  mt20,
  textAlignCenter,
  TitleH3,
  TitleH4,
} from '../../../../../../assets/styles/styles'

import useFaker from '../../../../../../hooks/useFaker'
import CustomContainer from '../../../../../../components/CustomContainer'
import CustomBox from '../../../../../../components/CustomBox'
import UserWaitMembershipCard from '../../../../../../components/Profile/Club/UserWaitMembershipCard'

const NewMembersRequestScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const { createFakeUser } = useFaker()

  const [users, setUsers] = useState([])

  useEffect(() => {
    for (let i = 0; i < 2; i++) {
      setUsers((oldData) => [...oldData, createFakeUser()])
    }
  }, [])

  return (
    <CustomContainer
      label="Demandes d'adhésion"
      pressBack={() => navigation.goBack()}
    >
      <View style={{ flex: 1 }}>
        <CustomBox style={{ backgroundColor: colors.box }}>
          <Text style={[TitleH4, { color: darkColor }]}>
            Total de membres : 12
          </Text>
        </CustomBox>

        <CustomBox style={{ backgroundColor: colors.box }}>
          <Text style={[TitleH4, { color: darkColor }]}>
            Demandes en attente : 2
          </Text>
        </CustomBox>

        <CustomBox
          style={[
            { backgroundColor: colors.box },
            users.length > 0 && { flex: 1 },
          ]}
        >
          <Text style={[defaultText, { color: darkColor }]}>
            Vous pouvez accepter ou refuser les personnes qui shouaite adhérer.
          </Text>

          {users && users.length > 0 ? (
            <FlatList
              data={users}
              renderItem={({ item }) => <UserWaitMembershipCard user={item} />}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              style={[mt20]}
            />
          ) : (
            <Text
              style={[
                textAlignCenter,
                TitleH3,
                { color: darkColor, marginVertical: 50 },
              ]}
            >
              Pas de demandes pour le moment
            </Text>
          )}
        </CustomBox>
      </View>
    </CustomContainer>
  )
}

export default NewMembersRequestScreen
