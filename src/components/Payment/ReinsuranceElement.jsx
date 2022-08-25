import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

import {
  darkColor,
  darkPrimaryColor,
  defaultText,
  secondaryColor,
  textAlignCenter,
} from '../../assets/styles/styles'

const { height } = Dimensions.get('window')

const ReinsuranceElement = ({ image, text }) => {
  const { colors } = useTheme()
  return (
    <View style={styles.container}>
      <View
        style={[styles.subContainer, { backgroundColor: colors.backgroundBox }]}
      >
        <Image style={styles.image} source={image} />
        <Text
          style={[
            defaultText,
            textAlignCenter,
            styles.text,
            {
              color: darkColor,
              backgroundColor: secondaryColor,
            },
          ]}
        >
          {text}
        </Text>
      </View>
    </View>
  )
}

export default ReinsuranceElement

const styles = StyleSheet.create({
  container: {
    width: '50%',
  },
  subContainer: {
    borderWidth: 1,
    borderColor: darkPrimaryColor,
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: height / 5,
  },
  text: {
    paddingVertical: 5,
  },
})
