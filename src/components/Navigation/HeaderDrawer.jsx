import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import { textAlignCenter, TitleH3 } from '../../assets/styles/styles'

const HeaderDrawer = ({ onPress, title }) => {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <Text
        style={[TitleH3, textAlignCenter, { color: colors.text, flex: 10 }]}
      >
        {title}
      </Text>
      <TouchableOpacity onPress={onPress} style={styles.containerAvatar}>
        <ImageBackground
          source={{
            uri: 'http://lh3.ggpht.com/-OdRx9XAYxkc/TusHxirp8uI/AAAAAAAABpw/lk-2NDvmJY0/Banana%252520Alien%25255B3%25255D.jpg?imgmax=800',
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
