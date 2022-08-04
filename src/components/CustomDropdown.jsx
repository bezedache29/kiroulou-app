import { StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'

import { Dropdown } from 'react-native-element-dropdown'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useTheme } from 'react-native-paper'
import {
  darkColor,
  defaultText,
  mx10,
  whiteColor,
} from '../assets/styles/styles'

const CustomDropdown = ({
  data,
  value,
  setValue,
  setValueCode,
  leftIcon,
  renderAttr,
  labelField = renderAttr,
  valueField = renderAttr,
  placeholder,
  searchPlaceholder,
}) => {
  const { colors } = useTheme()

  const [isFocus, setIsFocus] = useState(false)

  const renderItem = (item) => (
    <Text
      style={[
        defaultText,
        styles.item,
        {
          color: colors.text,
          borderColor: colors.border,
          backgroundColor: colors.dropdown,
          paddingLeft: 10,
        },
      ]}
    >
      {renderAttr === 'nom' ? item.nom : ''}
    </Text>
  )

  const onChangeData = (item) => {
    if (renderAttr === 'nom') {
      setValue(item.nom)
      if (setValueCode) {
        setValueCode(item.code)
      }
    }
    setIsFocus(false)
  }

  return (
    <Dropdown
      style={[
        styles.dropdown,
        {
          backgroundColor: colors.dropdown,
          borderBottomColor: colors.border,
        },
      ]}
      containerStyle={[
        styles.containerStyle,
        {
          backgroundColor: colors.dropdown,
        },
      ]}
      placeholderStyle={[defaultText, { color: colors.text }]}
      selectedTextStyle={[defaultText, { color: colors.text }]}
      inputSearchStyle={[
        defaultText,
        styles.inputSearch,
        {
          borderColor: colors.border,
        },
      ]}
      data={data}
      search
      maxHeight={1000}
      labelField={labelField}
      valueField={valueField}
      placeholder={!isFocus ? placeholder : '...'}
      searchPlaceholder={searchPlaceholder}
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={onChangeData}
      renderLeftIcon={() => (
        <MaterialCommunityIcons
          color={colors.icon}
          name={leftIcon}
          size={20}
          style={mx10}
        />
      )}
      renderRightIcon={() => (
        <MaterialCommunityIcons
          color={colors.icon}
          name={isFocus ? 'chevron-up' : 'chevron-down'}
          size={30}
          style={mx10}
        />
      )}
      renderItem={renderItem}
    />
  )
}

export default CustomDropdown

const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 8,
    height: 50,
    borderBottomWidth: 0.5,
    marginTop: 20,
  },
  item: {
    paddingVertical: 15,
    paddingRight: 4,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  containerStyle: {
    borderRadius: 8,
  },
  inputSearch: {
    color: darkColor,
    borderRadius: 5,
    backgroundColor: whiteColor,
  },
})
