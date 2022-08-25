import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

const SubSuccessScreen = ({ navigation, route }) => {
  const { colors } = useTheme()

  const { sub } = route.params

  return (
    <View>
      <Text>SubSuccessScreen</Text>
      <Text>{sub.id}</Text>
      <Button
        title="Page d'accueil"
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Splash' }],
          })
        }}
      />
    </View>
  )
}

export default SubSuccessScreen

const styles = StyleSheet.create({})
