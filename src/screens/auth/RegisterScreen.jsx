import { View, Text, Button, StatusBar } from 'react-native'
import React, { useContext } from 'react'
import { useTheme } from '@react-navigation/native'
import { AppContext } from '../../components/Context'
import { darkColor, whiteColor } from '../../assets/styles/styles'

const RegisterScreen = ({ navigation }) => {
  const { toggleTheme } = useContext(AppContext)

  const { colors } = useTheme()
  const theme = useTheme()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar
        backgroundColor={theme.dark ? darkColor : whiteColor}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <Text style={{ color: colors.text }}>RegisterScreen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button title="Change Theme" onPress={toggleTheme} />
    </View>
  )
}

export default RegisterScreen
