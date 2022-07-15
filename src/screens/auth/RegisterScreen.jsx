import { View, Text, Button } from 'react-native'
import React, { useContext } from 'react'
import { useTheme } from '@react-navigation/native'
import { AppContext } from '../../components/Context'

const RegisterScreen = ({ navigation }) => {
  const { toggleTheme } = useContext(AppContext)

  const { colors } = useTheme()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: colors.text }}>RegisterScreen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button title="Change Theme" onPress={toggleTheme} />
      <Button
        title="Go to onboarding"
        onPress={() => navigation.navigate('Onboarding')}
      />
    </View>
  )
}

export default RegisterScreen
