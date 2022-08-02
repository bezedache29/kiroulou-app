/**
 * On récupère le user connecté depuis le store
 * On récupère le club via un request API depuis l'id du user (si le user est admin on affiche les images/photos)
 */
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import useFaker from '../../../hooks/useFaker'

import CustomContainer from '../../../components/CustomContainer'
import RenderHeaderImageViewer from './renders/RenderHeaderImageViewer'
import RenderItemImages from './renders/RenderItemImages'
import ListHeaderComponent from './renders/ListHeaderComponent'
import { cancelColor, darkColor } from '../../../assets/styles/styles'
import CustomAlert from '../../../components/CustomAlert'
import CustomImageViewer from '../../../components/CustomImageViewer'

const ImagesProfileScreen = ({ navigation, route }) => {
  const { createFakeUser, createFakeClub, createFakeAlbum } = useFaker()

  const [profile, setProfile] = useState('')
  const [data, setData] = useState({})
  const [images, setImages] = useState([])
  const [image, setImage] = useState('')
  // Permet d'ouvrir la modal pour afficher l'image en fullscreen
  const [imageViewer, setImageViewer] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
  const [deleteBtn, setDeleteBtn] = useState(false)

  const [showDelete, setShowDelete] = useState(false)
  const [showDeleteSeveralImages, setShowDeleteSeveralImages] = useState(false)

  // Fonction quand on press longtemps sur l'image
  const handleLongPress = (image) => {
    selectItems(image)
  }

  // Fonction quand on press normalement sur l'image
  const handleOnPress = (image) => {
    if (selectedItems.length) {
      selectItems(image)
    } else {
      setImage(image)
      setImageViewer(true)
    }
  }

  useEffect(() => {
    if (selectedItems.length) {
      setDeleteBtn(true)
    } else {
      setDeleteBtn(false)
    }
  }, [selectedItems])

  // récupère l'image sélectionnée
  const getSelected = (image) => selectedItems.includes(image.id)

  // Permet de reset la sélection
  const deSelectItems = () => setSelectedItems([])

  // permet de selectionner les images voulu
  const selectItems = (item) => {
    if (selectedItems.includes(item.id)) {
      const newListItems = selectedItems.filter(
        (listItem) => listItem !== item.id
      )
      return setSelectedItems([...newListItems])
    }
    return setSelectedItems([...selectedItems, item.id])
  }

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      setImages((oldData) => [...oldData, createFakeAlbum()])
    }
  }, [])

  // On check si c'est le profil d'un club ou celui d'un user
  useEffect(() => {
    if (route.params.profile) {
      setProfile(route.params.profile)
    }
  }, [route.params])

  useEffect(() => {
    if (profile === 'user') {
      setData(createFakeUser())
    } else if (profile === 'club') {
      setData(createFakeClub())
    } else {
      setData({})
    }
  }, [profile])

  useEffect(() => {
    console.log('data', data)
  }, [data])

  return (
    <CustomContainer
      pressBack={() => navigation.goBack()}
      label="Images / Photos"
    >
      <View style={{ flex: 1 }}>
        {data && Object.keys(data).length > 0 && (
          <Pressable onPress={deSelectItems}>
            <FlatList
              ListHeaderComponent={
                <ListHeaderComponent
                  data={data} // !! Voir si c'est utile. Peut etre récupérer du store ?
                  profile={profile}
                />
              }
              data={images}
              keyExtractor={(item, index) => index}
              showsVerticalScrollIndicator={false}
              numColumns={3}
              renderItem={({ item }) => (
                <RenderItemImages
                  onPress={() => handleOnPress(item)}
                  onLongPress={() => handleLongPress(item)}
                  selected={getSelected(item)}
                  uri={item.url}
                />
              )}
            />
          </Pressable>
        )}
      </View>

      {/* Permet de voir l'image en fullScreen */}
      <CustomImageViewer
        showModal={imageViewer}
        setShowModal={setImageViewer}
        imageUrls={[{ url: image.url }]}
        renderHeader={() => (
          <RenderHeaderImageViewer
            setImageViewer={setImageViewer}
            onDelete={() => setShowDelete(true)}
          />
        )}
      >
        {/* Alert lors de la suppression d'une image */}
        <CustomAlert
          showAlert={showDelete}
          title="Attention !"
          message={`Voulez vous supprimer cette image ? ${image.id}`}
          onDismiss={() => setShowDelete(false)}
          onCancelPressed={() => setShowDelete(false)}
          onConfirmPressed={() => setShowDelete(false)}
        />
      </CustomImageViewer>

      {/* Alert lors de la suppression de plusieurs images */}
      <CustomAlert
        showAlert={showDeleteSeveralImages}
        title="Attention !"
        message={`Voulez vous supprimer les images sélectionnées ? ${
          selectedItems.length && selectedItems.map((img) => `${img}`)
        }`}
        onDismiss={() => setShowDeleteSeveralImages(false)}
        onCancelPressed={() => setShowDeleteSeveralImages(false)}
        onConfirmPressed={() => setShowDeleteSeveralImages(false)}
      />

      {/* Bouton delete qui s'affiche quand au moins une image est selectionné avec un longPress dessus */}
      {deleteBtn && (
        <TouchableOpacity
          onPress={() => setShowDeleteSeveralImages(true)}
          style={styles.deleteBtn}
        >
          <MaterialCommunityIcons name="delete" size={60} color={darkColor} />
        </TouchableOpacity>
      )}
    </CustomContainer>
  )
}

export default ImagesProfileScreen

const styles = StyleSheet.create({
  deleteBtn: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    backgroundColor: cancelColor,
    borderRadius: 40,
    padding: 10,
    elevation: 10,
  },
})
