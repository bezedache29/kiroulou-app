import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React from 'react'

import {
  defaultText,
  littleTitle,
  my10,
  textAlignCenter,
} from '../../assets/styles/styles'

const CustomBox = ({
  onPress,
  textColor,
  borderColor,
  backgroundColor,
  title,
  price,
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <Animated.View
      style={[
        styles.boxContainer,
        {
          borderColor,
          backgroundColor,
        },
      ]}
    >
      <View style={styles.content}>
        <Text
          style={[textAlignCenter, littleTitle, my10, { color: textColor }]}
        >
          {title}
        </Text>
        <Text
          style={[textAlignCenter, defaultText, my10, { color: textColor }]}
        >
          {price}
        </Text>
      </View>
    </Animated.View>
  </TouchableWithoutFeedback>
)

export default CustomBox

const styles = StyleSheet.create({
  boxContainer: {
    width: 150,
    height: 150,
    borderWidth: 3,
    borderRadius: 8,
    elevation: 5,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})
