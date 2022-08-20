import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import React, { useRef, useState } from 'react'

import * as Animatable from 'react-native-animatable'

import { useTheme } from 'react-native-paper'
import useAxios from '../../../hooks/useAxios'

import CustomBigButton from '../../CustomBigButton'
import {
  dangerColor,
  defaultText,
  mt20,
  my30,
  px25,
} from '../../../assets/styles/styles'
import CustomLoader from '../../CustomLoader'

const CODE_LENGTH = 4

const Screen2 = ({ setScreen, email, setToken }) => {
  const { colors } = useTheme()
  const { axiosPostWithoutToken } = useAxios()

  const [code, setCode] = useState('')
  const [containerIsFocused, setContainerIsFocused] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const ref = useRef(null)

  const codeDigitsArray = new Array(CODE_LENGTH).fill(0)

  const toDigitInput = (_value, idx) => {
    const emptyInputChar = ' '
    const digit = code[idx] || emptyInputChar

    const isCurrentDigit = idx === code.length
    const isLastDigit = idx === CODE_LENGTH - 1
    const isCodeFull = code.length === CODE_LENGTH

    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull)

    const containerStyle =
      containerIsFocused && isFocused
        ? { ...styles.inputContainer, ...styles.inputContainerFocused }
        : styles.inputContainer

    return (
      <View key={idx} style={containerStyle}>
        <Text style={[defaultText, styles.inputText, { color: colors.text }]}>
          {digit}
        </Text>
      </View>
    )
  }

  const handleOnPress = () => {
    setContainerIsFocused(true)
    ref?.current?.focus()
  }

  const handleOnBlur = () => {
    setContainerIsFocused(false)
  }

  const checkToken = async () => {
    setLoading(true)
    setError(false)
    const data = {
      email,
      token: code,
    }

    const response = await axiosPostWithoutToken('verifyResetPassword', data)

    console.log(response.status)

    if (response.status === 201) {
      setToken(code)
      setScreen(3)
    }

    if (response.status === 404) {
      setError('Code incorrect !')
    }

    if (response.status === 422) {
      setError(response.data.errors.token[0])
    }

    setLoading(false)
  }

  if (loading) {
    return <CustomLoader />
  }

  return (
    <Animatable.View
      animation="fadeInUpBig"
      style={[px25, { flex: 1, backgroundColor: colors.background }]}
    >
      <SafeAreaView style={styles.container}>
        <Text style={[defaultText, my30, { color: colors.text }]}>
          Entrez le code de vérification reçu par email pour passer à la
          dernière étape.
        </Text>

        <Pressable
          style={[styles.inputsContainer, { borderColor: colors.border }]}
          onPress={handleOnPress}
        >
          {codeDigitsArray.map(toDigitInput)}
        </Pressable>

        <TextInput
          ref={ref}
          autoFocus
          value={code}
          onChangeText={setCode}
          onSubmitEditing={handleOnBlur}
          keyboardType="number-pad"
          returnKeyType="done"
          textContentType="oneTimeCode"
          maxLength={CODE_LENGTH}
          style={styles.hiddenCodeInput}
        />
        {error && (
          <Text style={[defaultText, mt20, { color: dangerColor }]}>
            {error}
          </Text>
        )}
        <View style={{ width: '100%' }}>
          <CustomBigButton label="Valider le code" onPress={checkToken} />
        </View>
      </SafeAreaView>
    </Animatable.View>
  )
}

export default Screen2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenCodeInput: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  },
  inputsContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    borderWidth: 2,
    borderRadius: 4,
    padding: 12,
  },
  inputText: {
    fontSize: 24,
  },
})
