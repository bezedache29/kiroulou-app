import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import AwesomeAlert from 'react-native-awesome-alerts'

import useFaker from '../../../hooks/useFaker'

import {
  cancelColor,
  darkPrimaryColor,
  defaultText,
  TitleH3,
} from '../../../assets/styles/styles'

import CustomSearchInput from '../../../components/CustomSearchInput'
import MembersCard from '../../../components/Profile/Club/MemberCard'
import CustomLabelNavigation from '../../../components/CustomLabelNavigation'

const AdminClubProfileScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const { createFakeUser } = useFaker()

  const [search, setSearch] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [member, setMember] = useState({})
  const [members, setMembers] = useState([])

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      setMembers((oldData) => [...oldData, createFakeUser()])
    }
  }, [])

  const onChangeText = (text) => {
    setSearch(text)
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomLabelNavigation
        label="Changer d'administrateur"
        colors={colors}
        onPress={() => navigation.goBack()}
      />

      <CustomSearchInput
        placeholder="Rechercher par nom"
        value={search}
        onChangeValue={onChangeText}
      />

      <View style={styles.content}>
        <FlatList
          data={members}
          renderItem={({ item }) => (
            <MembersCard
              member={item}
              redBtn="Définir Admin"
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
        />
      </View>

      {/* Alert avant de changer d'administrateur */}
      <AwesomeAlert
        show={showAlert}
        showProgress={!showAlert}
        title="Attention !"
        message={`Mettre ${member.firstname} ${member.lastname} administrateur de nom du club ?`}
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

export default AdminClubProfileScreen

const styles = StyleSheet.create({
  content: {
    margin: 10,
    flex: 1,
  },
})
