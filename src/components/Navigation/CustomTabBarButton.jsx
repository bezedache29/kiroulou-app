import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native'
import React, { useRef, useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  darkPrimaryColor,
  grayColor,
  whiteColor,
} from '../../assets/styles/styles'

const CustomTabBarButton = ({ children, opened, toggleOpened }) => {
  const animation = useRef(new Animated.Value(0)).current

  const navigation = useNavigation()

  useEffect(() => {
    Animated.timing(animation, {
      toValue: opened ? 1 : 0,
      duration: 300,
      friction: 2,
      useNativeDriver: false,
    }).start()
  }, [opened, animation])

  const opacity = {
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    }),
  }

  const goToScreen = (route) => {
    toggleOpened()
    navigation.navigate(route)
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {/* Bouton de gauche */}
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -60],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -50],
                    }),
                  },
                ],
              },
            ]}
          >
            <MaterialCommunityIcons
              name="comment-plus-outline"
              color={whiteColor}
              size={24}
            />
          </Animated.View>
        </TouchableWithoutFeedback>

        {/* Bouton du milieu */}
        <TouchableWithoutFeedback onPress={() => goToScreen('AddClub')}>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -100],
                    }),
                  },
                ],
              },
            ]}
          >
            <MaterialIcons name="group-add" color={whiteColor} size={24} />
          </Animated.View>
        </TouchableWithoutFeedback>

        {/* Bouton de droite */}
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 60],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -50],
                    }),
                  },
                ],
              },
            ]}
          >
            <MaterialCommunityIcons
              name="map-plus"
              color={whiteColor}
              size={24}
            />
          </Animated.View>
        </TouchableWithoutFeedback>

        {/* Gros Bouton + au milieu */}
        <TouchableWithoutFeedback
          onPress={toggleOpened}
          style={styles.addButton}
        >
          <Animated.View
            style={[
              styles.addButtonInner,
              {
                transform: [
                  {
                    rotate: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '45deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            {children}
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    height: 0,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 35,
  },
  addButton: {
    shadowColor: grayColor,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  addButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: darkPrimaryColor,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  box: {
    position: 'relative',
    width: 60,
    height: 60,
    marginTop: -30,
  },
  item: {
    position: 'absolute',
    top: 5,
    left: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: darkPrimaryColor,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: whiteColor,
  },
})

export default CustomTabBarButton
