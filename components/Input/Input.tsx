import * as React from 'react';
import { TextInput, TextStyle, View, ViewStyle } from 'react-native';
import COLORS from '../../constants/Colors';
import TYPOGRAPHY from '../../constants/Typography';
import { InputProps } from './InputProps';
import { Text, useThemeColors } from '../Themed';
import useInputPresets from './InputPresets';

const CONTAINER: ViewStyle = {};

export const Input = React.forwardRef(function Input(
  props: InputProps,
  ref: any
) {
  const {
    defaultValue,
    onChangeText,
    label,
    style: styleOverride,
    inputStyle: inputStyleOverride,
    labelStyle: labelStyleOverride,
    keyboardType,
    password,
    numberOfLines,
    error,
    preset,
    ...rest
  } = props;

  const themeColors = useThemeColors();
  const { inputPresets, labelPresets } = useInputPresets();
  const myPreset = !preset ? 'native' : preset; //set default
  const INPUT = myPreset == 'native' ? inputPresets.native : inputPresets.round;
  const LABEL = myPreset == 'native' ? labelPresets.native : labelPresets.round;

  const labelStyles = [LABEL, labelStyleOverride];
  const containerStyles = [CONTAINER, styleOverride];
  const inputStyles = [INPUT, { color: themeColors.text }, inputStyleOverride];

  return (
    <View style={containerStyles}>
      {label ? <Text style={labelStyles} text={label} /> : null}
      <TextInput
        placeholderTextColor={themeColors.input.placeholderColor}
        underlineColorAndroid={
          myPreset == 'native'
            ? themeColors.input.underlineColor
            : 'transparent'
        }
        style={inputStyles}
        ref={ref}
        keyboardType={keyboardType ?? 'default'}
        secureTextEntry={password}
        onChangeText={onChangeText ? (text) => onChangeText(text) : undefined}
        numberOfLines={numberOfLines ?? 1}
        defaultValue={defaultValue || ''}
        {...rest}
      />
    </View>
  );
});
