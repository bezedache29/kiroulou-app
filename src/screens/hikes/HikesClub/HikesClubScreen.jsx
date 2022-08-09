import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { useTheme } from 'react-native-paper'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import {
  darkPrimaryColor,
  defaultText,
  defaultTextBold,
  littleTitle,
  mt30,
  my5,
  rowCenter,
  textAlignCenter,
} from '../../../assets/styles/styles'

import CustomContainer from '../../../components/CustomContainer'
import useFaker from '../../../hooks/useFaker'
import useUtils from '../../../hooks/useUtils'
import CustomBSModal from '../../../components/CustomBSModal'
import ButtonBS from '../../../components/ButtonBS'
import CustomAlert from '../../../components/CustomAlert'
import CustomOverlay from '../../../components/CustomOverlay'

const HikesClubScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const { dateToTimestamp, formatDate } = useUtils()
  const { createFakeHike } = useFaker()

  const [hikes, setHikes] = useState([])
  const [hike, setHike] = useState(false)
  const [overlay, setOverlay] = useState(false)
  const [showDeleteHike, setShowDeleteHike] = useState(false)

  useEffect(() => {
    for (let i = 0; i < 4; i++) {
      setHikes((oldData) => [...oldData, createFakeHike()])
    }
  }, [])

  useEffect(() => {
    if (hikes) {
      console.log('hikes', hikes)
    }
  }, [hikes])

  // Ref pour la bottomSheet
  const bottomSheetRef = useRef(null)

  // Permet d'ouvrir et fermer la bottomSheet pour afficher les options de l'article
  const toggleBottomSheet = (item) => {
    if (overlay) {
      setOverlay(false)
      setHike(false)
      bottomSheetRef?.current?.closeBottomSheet()
    } else {
      setOverlay(true)
      setHike(item)
      bottomSheetRef?.current?.openBottomSheet()
    }
  }

  const optionsHike = (hike) => {
    if (dateToTimestamp(hike.date) >= dateToTimestamp(new Date())) {
      // Ouverture BottomSheet
      toggleBottomSheet(hike)
    } else {
      // Redirect vars HikeScreen
      navigation.navigate('Hike')
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <CustomContainer
          label="Les randos du club"
          pressBack={() => navigation.goBack()}
        >
          <View style={{ flex: 1, padding: 10 }}>
            {overlay && <CustomOverlay />}
            <Text
              style={[littleTitle, textAlignCenter, { color: colors.text }]}
            >
              Liste de toutes les randos du club
            </Text>

            <FlatList
              data={hikes}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={() => (
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      littleTitle,
                      mt30,
                      textAlignCenter,
                      { color: colors.text },
                    ]}
                  >
                    Pas de randos
                  </Text>
                </View>
              )}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => optionsHike(item)}
                  style={[
                    rowCenter,
                    styles.container,
                    {
                      backgroundColor:
                        dateToTimestamp(item.date) >=
                        dateToTimestamp(new Date())
                          ? darkPrimaryColor
                          : colors.backgroundBox,
                    },
                  ]}
                >
                  <View style={{ width: '20%' }}>
                    <ImageBackground
                      source={{ uri: item.flyer }}
                      style={styles.flyer}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{ width: '80%', paddingLeft: 20 }}>
                    <Text style={[defaultTextBold, { color: colors.text }]}>
                      {item.name}
                    </Text>
                    <Text style={[defaultText, my5, { color: colors.text }]}>
                      {formatDate(item.date)}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* BottomSheet pour options de l'article */}
          <CustomBSModal
            title="Que souhaitez vous faire ?"
            SP={['25%', '30%']}
            ref={bottomSheetRef}
            onDismiss={() => {
              bottomSheetRef?.current?.closeBottomSheet()
              setOverlay(false)
              setHike(false)
            }}
          >
            <ButtonBS onPress={() => setShowDeleteHike(true)} cancel>
              Supprimer l'article
            </ButtonBS>
            <ButtonBS
              onPress={() => {
                bottomSheetRef?.current?.closeBottomSheet()
                setOverlay(false)
                navigation.navigate('AddHikeStep1', { hikeEdit: hike })
              }}
            >
              Modifier l'article
            </ButtonBS>
          </CustomBSModal>

          <CustomAlert
            showAlert={showDeleteHike}
            title="Attention !"
            message={`Etes vous sur de vouloir supprimer la rando : ${
              hike?.name
            } du ${() => formatDate(hike?.date)} ?`}
            onDismiss={() => setShowDeleteHike(false)}
            onCancelPressed={() => setShowDeleteHike(false)}
            onConfirmPressed={() => setShowDeleteHike(false)}
          />
        </CustomContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default HikesClubScreen

const styles = StyleSheet.create({
  container: {
    height: 80,
    borderRadius: 8,
    padding: 5,
    elevation: 5,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  flyer: {
    width: '100%',
    height: '100%',
  },
})
