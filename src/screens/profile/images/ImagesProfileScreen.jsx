/**
 * On récupère le user connecté depuis le store
 * On récupère le club via un request API depuis l'id du user (si le user est admin on affiche les images/photos)
 */
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { URL_SERVER } from 'react-native-dotenv'

import CustomContainer from '../../../components/CustomContainer'
import RenderHeaderImageViewer from './renders/RenderHeaderImageViewer'
import RenderItemImages from './renders/RenderItemImages'
import ListHeaderComponent from './renders/ListHeaderComponent'
import {
  cancelColor,
  darkColor,
  defaultText,
} from '../../../assets/styles/styles'
import CustomAlert from '../../../components/CustomAlert'
import CustomImageViewer from '../../../components/CustomImageViewer'
import useAxios from '../../../hooks/useAxios'
import useCustomToast from '../../../hooks/useCustomToast'

const ImagesProfileScreen = ({ navigation, route }) => {
  const { axiosGetWithToken, axiosDeleteWithToken } = useAxios()
  const { toastShow } = useCustomToast()

  const { profile, data } = route.params

  const flatListImages = useRef()

  const [images, setImages] = useState([])
  const [image, setImage] = useState('')
  // Permet d'ouvrir la modal pour afficher l'image en fullscreen
  const [imageViewer, setImageViewer] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
  const [deleteBtn, setDeleteBtn] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showDeleteSeveralImages, setShowDeleteSeveralImages] = useState(false)
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [moreLoading, setMoreLoading] = useState(false)
  const [isListEnd, setIsListEnd] = useState(null)

  useEffect(() => {
    setPage(1)
  }, [])

  useEffect(() => {
    if (page !== null) {
      if (page === 1) {
        loadImages(page, true)
      } else {
        loadImages(page)
      }
    }
  }, [page])

  useEffect(() => {
    if (!loading) {
      moveToTop()
    }
  }, [loading])

  const moveToTop = () => {
    if (images.length - 1 > 0) {
      flatListImages.current.scrollToIndex({ index: 0 })
    }
  }

  const loadImages = async (page, refresh) => {
    const response = await axiosGetWithToken(
      `${profile}/${data.id}/allImages?page=${page}`
    )

    console.log('responses images', response.data)

    if (refresh) {
      setImages(response.data)
      setIsListEnd(false)
    } else if (response.data.length === 0) {
      setIsListEnd(true)
    } else {
      setImages((oldData) => [...oldData, ...response.data])
    }

    setMoreLoading(false)
    setLoading(false)
  }

  useEffect(() => {
    console.log('data', data)
  }, [data])

  useEffect(() => {
    if (selectedItems.length) {
      setDeleteBtn(true)
    } else {
      setDeleteBtn(false)
    }
  }, [selectedItems])

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

  const deleteImage = async () => {
    setShowDelete(false)
    const response = await axiosDeleteWithToken(
      `${profile}/posts/deleteImage`,
      { image }
    )

    if (response.status === 201) {
      toastShow({
        title: 'Image supprimée !',
        message: "L'image de l'article a bien été supprimée",
      })

      if (page === 1) {
        loadImages(1, true)
      } else {
        setPage(1)
      }

      setImageViewer(false)
    } else {
      toastShow({
        title: 'Action impossible !',
        message: `L'image ne s'est pas supprimée (${response.status})`,
        type: 'toast_danger',
      })
    }

    console.log('response delete', response.data)
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
      {isListEnd && (
        <Text style={[defaultText, { color: darkColor }]}>
          Toutes les images / photos sont listées
        </Text>
      )}
    </View>
  )

  return (
    <CustomContainer
      pressBack={() => navigation.goBack()}
      label="Images / Photos"
    >
      <View style={{ flex: 1 }}>
        {images && images.length > 0 && (
          <Pressable onPress={deSelectItems}>
            <FlatList
              ref={flatListImages}
              ListHeaderComponent={
                <ListHeaderComponent data={data} profile={profile} />
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
                  uri={`${URL_SERVER}/storage/${item.image}`}
                />
              )}
              onEndReachedThreshold={0.5} // Formule (20 - (1.6666 * 6)) - Se declenche au 10 eme post
              onEndReached={fetchMorePosts}
              ListFooterComponent={renderFooter}
            />
          </Pressable>
        )}
      </View>

      {/* Permet de voir l'image en fullScreen */}
      <CustomImageViewer
        showModal={imageViewer}
        setShowModal={setImageViewer}
        imageUrls={[{ url: `${URL_SERVER}/storage/${image.image}` }]}
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
          message="Voulez vous supprimer cette image ?"
          onDismiss={() => setShowDelete(false)}
          onCancelPressed={() => setShowDelete(false)}
          onConfirmPressed={deleteImage}
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
