import { View, Text, Button } from 'react-native'
import React from 'react'

const RegisterScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>RegisterScreen</Text>
    <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
  </View>
)

export default RegisterScreen
