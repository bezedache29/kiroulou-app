import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import CustomLabelNavigation from '../components/CustomLabelNavigation'
import { TitleH3 } from '../assets/styles/styles'

const ComingSoonScreen = ({ navigation }) => {
  const { colors } = useTheme()

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomLabelNavigation
        label="Coming Soon"
        colors={colors}
        onPress={() => {
          navigation.goBack()
        }}
      />
      <View style={styles.container}>
        <Text style={[TitleH3, { color: colors.text }]}>
          Sorry ! In Construction
        </Text>
      </View>
    </View>
  )
}

export default ComingSoonScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})
