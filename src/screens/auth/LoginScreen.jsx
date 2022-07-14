import { View, Text, Button } from 'react-native'
import React from 'react'

const LoginScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>LoginScreen</Text>
    <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
  </View>
)

export default LoginScreen
