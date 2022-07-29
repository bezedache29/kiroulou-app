import { FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'

import { useTheme } from 'react-native-paper'

import AwesomeAlert from 'react-native-awesome-alerts'

import {
  cancelColor,
  darkPrimaryColor,
  defaultLink,
  defaultText,
  mt10,
  mx10,
  my10,
  textAlignCenter,
  TitleH3,
} from '../../../../../assets/styles/styles'

import useFaker from '../../../../../hooks/useFaker'

import MembersCard from '../../../../../components/Profile/Club/MemberCard'

const ClubMembersScene = () => {
  const { colors } = useTheme()
  const { createFakeUser } = useFaker()

  const [members, setMembers] = useState([])
  const [member, setMember] = useState({})
  const [showAlert, setShowAlert] = useState(false)

  const navigation = useNavigation()

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
        onPress={() => navigation.navigate('NewMembersRequest')}
      >
        Demandes en attentes : 2
      </Text>
      <View style={{ flex: 20 }}>
        <FlatList
          data={members}
          renderItem={({ item }) => (
            <MembersCard
              member={item}
              redBtn="Expulser"
              onPressLeftBtn={() => {
                setShowAlert(true)
                setMember(item)
              }}
              onPressRightBtn={() => {
                alert(item.firstname)
              }}
              toggleFollow={() => alert(`follow / unfollow ${item.firstname}`)}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={[mx10, mt10]}
        />
      </View>

      {/* Alert avant de supprimer un membre */}
      <AwesomeAlert
        show={showAlert}
        showProgress={!showAlert}
        title="Attention !"
        message={`Supprimer ${member.firstname} ${member.lastname} du club Nom du club ?`}
        closeOnTouchOutside
        closeOnHardwareBackPress={false}
        showCancelButton
        showConfirmButton
        cancelText="Non"
        confirmText="Oui"
        confirmButtonColor={darkPrimaryColor}
        cancelButtonColor={cancelColor}
        cancelButtonTextStyle={defaultText}
        confirmButtonTextStyle={defaultText}
        onDismiss={() => {
          setShowAlert(false)
        }}
        contentContainerStyle={{ backgroundColor: colors.background }}
        titleStyle={[TitleH3, { color: colors.text }]}
        messageStyle={[defaultText, { color: colors.text }]}
        onCancelPressed={() => {
          setShowAlert(false)
        }}
        onConfirmPressed={() => {
          setShowAlert(false)
        }}
      />
    </View>
  )
}

export default ClubMembersScene
