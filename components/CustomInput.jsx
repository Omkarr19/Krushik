import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { theme } from '../constants/theme'
import { hp } from '../helpers/common'

const CustomInput = (props, ref) => {
  return (
    <View style={[styles.container, props.containerStyles && props.containerStyles]}>
      {
        props.icon && props.icon
      }
      <TextInput
      style = {{flex: 1}}
      placeholderTextColor={theme.colors.textLight}
      ref={props.inputRef && props.inputRef}
      {...props}
      />
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        height : hp(7.2),
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : 0.4,
        borderBlockColor : theme.colors.text,
        borderRadius : theme.radius.xxl,
        borderCurve : 'continuous',
        paddingHorizontal : 18,
        gap : 13
    }
})