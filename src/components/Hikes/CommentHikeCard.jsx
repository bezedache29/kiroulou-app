import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'
import {
  defaultText,
  grayColor,
  littleTitle,
  mt5,
  rowCenter,
  textAlignCenter,
} from '../../assets/styles/styles'

const CommentHikeCard = ({ goToProfile }) => {
  const { colors } = useTheme()

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={rowCenter}>
        <TouchableOpacity onPress={goToProfile}>
          <ImageBackground
            source={{
              uri: 'https://itigic.com/wp-content/uploads/2022/04/20220414_6257c3e610125.webp?ezimgfmt=rs:372x195/rscb2/ng:webp/ngcb2',
            }}
            style={styles.avatar}
            imageStyle={styles.avatarStyle}
          />
        </TouchableOpacity>
        <View style={{ flex: 4 }}>
          <Text style={[littleTitle, textAlignCenter, { color: colors.text }]}>
            Prénom Nom
          </Text>
          <Text style={[defaultText, textAlignCenter, { color: colors.text }]}>
            Nom du club
          </Text>
        </View>
      </View>
      <View style={mt5}>
        <Text style={[defaultText, { color: colors.text, fontSize: 15 }]}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente ab
          sunt atque esse, delectus omnis quisquam, beatae autem porro nisi
          aliquam. Beatae consequatur reprehenderit, porro laboriosam et quos
          illum deserunt? Harum exercitationem reiciendis, nihil ipsum minima
          dignissimos, illum ipsa maiores corrupti soluta esse cum, ex quia
          laboriosam repellendus nisi. Beatae odio ipsa possimus voluptas
          voluptatibus amet numquam aspernatur voluptate voluptatum.
        </Text>
      </View>
    </View>
  )
}

export default CommentHikeCard

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    borderColor: grayColor,
  },
  avatar: {
    width: 35,
    height: 35,
  },
  avatarStyle: {
    borderRadius: 25,
  },
})
