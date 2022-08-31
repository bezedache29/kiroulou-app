import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { useStoreState } from 'easy-peasy'

import { darkColor, defaultText, mb30 } from '../../../assets/styles/styles'

import CustomSearchInput from '../../../components/CustomSearchInput'
import MembersCard from '../../../components/Profile/Club/MemberCard'
import CustomLabelNavigation from '../../../components/CustomLabelNavigation'
import useAxios from '../../../hooks/useAxios'
import useCustomToast from '../../../hooks/useCustomToast'
import CustomAlert from '../../../components/CustomAlert'
import CustomLoader from '../../../components/CustomLoader'

const AdminClubProfileScreen = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { axiosGetWithToken, axiosPostWithToken } = useAxios()
  const { toastShow } = useCustomToast()

  const { club } = route.params

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  const [search, setSearch] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [member, setMember] = useState(false)
  const [members, setMembers] = useState([])
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isListEnd, setIsListEnd] = useState(true)
  const [moreLoading, setMoreLoading] = useState(true)
  const [memberName, setMemberName] = useState(false)

  useEffect(() => {
    setPage(1)
  }, [])

  useEffect(() => {
    if (page !== null) {
      if (page === 1) {
        loadMembers(page, true)
      } else {
        loadMembers(page)
      }
    }
  }, [page])

  useEffect(() => {
    if (member) {
      setMemberName(
        member.firstname
          ? `${member.firstname} ${member.lastname}`
          : member.email
      )
    }
  }, [member])

  const loadMembers = async (page, refresh = false) => {
    const response = await axiosGetWithToken(
      `clubs/${club.id}/clubMembers?page=${page}`
    )

    if (response.status === 403) {
      toastShow({
        title: 'Accès refusé !',
        message: response.data.message,
        type: 'toast_danger',
      })
    }

    if (response.status === 200) {
      if (refresh) {
        setMembers(response.data.members)
        setIsListEnd(false)
      } else if (response.data.members.length === 0) {
        setIsListEnd(true)
      } else {
        setMembers((oldData) => [...oldData, ...response.data.members])
      }
    }

    setMoreLoading(false)
    setLoading(false)
  }

  const onChangeText = (text) => {
    setSearch(text)
  }

  const changeAdmin = async () => {
    setShowAlert(false)
    const response = await axiosPostWithToken(`clubs/${club.id}/changeAdmin`, {
      user_id: member.id,
    })

    if (response.status === 201) {
      toastShow({
        title: 'Admin changé !',
        message: `L'administrateur du club ${club.name} a bien été changé`,
      })

      navigation.reset({
        index: 0,
        routes: [{ name: 'Splash' }],
      })
    }
  }

  // Au refresh en bas de screen
  const fetchMorePosts = async () => {
    if (!isListEnd) {
      setMoreLoading(true)
      setPage(page + 1)
    }
  }

  // S'il n'y a plus de pages a chercher lors d'un refresh en bas de screen
  const renderFooter = () => (
    <View style={styles.footer}>
      {moreLoading && <ActivityIndicator />}
      {isListEnd && members.length > 0 && (
        <Text style={[defaultText, { color: darkColor }]}>
          {/* Tous les membres sont listés */}
        </Text>
      )}
    </View>
  )

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomLabelNavigation
        label="Changer d'administrateur"
        colors={colors}
        onPress={() => navigation.goBack()}
      />
      {members.length > 0 && (
        <CustomSearchInput
          placeholder="Rechercher par nom"
          value={search}
          onChangeValue={onChangeText}
        />
      )}

      <View style={styles.content}>
        {!loading ? (
          <FlatList
            data={members}
            ListEmptyComponent={() => (
              <View style={styles.containerNoFeed}>
                <Text style={[defaultText, mb30, { color: colors.text }]}>
                  Aucun membres dans votre club pour le moment. Acceptez les
                  utilisateurs en attentes pour les voir ici
                </Text>
              </View>
            )}
            renderItem={({ item }) => (
              <MembersCard
                member={item}
                club={club}
                disabled={item.id === user.id}
                redBtn="Définir Admin"
                onPressLeftBtn={() => {
                  setShowAlert(true)
                  setMember(item)
                }}
                onPressRightBtn={() => {
                  navigation.navigate('UserProfile', { userId: item.id })
                }}
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.2} // Formule (20 - (1.6666 * 6)) - Se declenche au 10 eme post
            onEndReached={fetchMorePosts}
            ListFooterComponent={renderFooter}
          />
        ) : (
          <CustomLoader />
        )}
      </View>

      {/* Alert avant de changer d'administrateur */}
      <CustomAlert
        showAlert={showAlert}
        title="Attention !"
        message={`Mettre ${memberName} administrateur de nom du club ?`}
        onDismiss={() => setShowAlert(false)}
        onCancelPressed={() => setShowAlert(false)}
        onConfirmPressed={changeAdmin}
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
