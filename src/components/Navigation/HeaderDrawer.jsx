import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import { useStoreState } from 'easy-peasy'

import { URL_SERVER } from 'react-native-dotenv'

import { textAlignCenter, TitleH3 } from '../../assets/styles/styles'

const HeaderDrawer = ({ onPress, title }) => {
  const { colors } = useTheme()

  const userStore = useStoreState((state) => state.user)
  const { user } = userStore

  return (
    <View style={[styles.container, { borderBottomColor: colors.border }]}>
      <Text
        style={[TitleH3, textAlignCenter, { color: colors.text, flex: 10 }]}
      >
        {title}
      </Text>
      <TouchableOpacity onPress={onPress} style={styles.containerAvatar}>
        <ImageBackground
          source={{
            uri: `${URL_SERVER}/storage/avatars/${user.avatar}`,
          }}
          style={styles.avatar}
          imageStyle={{ borderRadius: 25 }}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  containerAvatar: {
    marginLeft: 'auto',
    marginRight: 20,
    flex: 1,
  },
  avatar: {
    width: 35,
    height: 35,
  },
})

export default HeaderDrawer
