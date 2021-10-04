import * as React from "react";
import { TextInput, TextStyle, View, ViewStyle } from "react-native";
import COLORS from "../../constants/Colors";
import TYPOGRAPHY from "../../constants/Typography";
import { InputProps } from "./InputProps";
import { Text, useThemeColors } from "../Themed";

const CONTAINER: ViewStyle = {};

const INPUT: TextStyle = {
  alignSelf: "center",
  fontSize: TYPOGRAPHY.fontSize.primary,
  fontFamily: TYPOGRAPHY.fontFamily.primary,
  color: COLORS.dark.text,
  backgroundColor: "transparent",
  minHeight: 44,
  width: "85%",
  minWidth: "85%",
  paddingHorizontal: "2%",
  borderRadius: 6,
};

export const Input = React.forwardRef(function Input(
  props: InputProps,
  ref: any
) {
  const {
    placeholder,
    value,
    defaultValue,
    onChangeText,
    label,
    style: styleOverride,
    inputStyle: inputStyleOverride,
    keyboardType,
    password,
    multiline,
    numberOfLines,
    error,
  } = props;

  const themeColors = useThemeColors();

  const containerStyles = [CONTAINER, styleOverride];
  const inputStyles = [INPUT, inputStyleOverride, { color: themeColors.text }];

  return (
    <View style={containerStyles}>
      {label ? <Text text={label} /> : null}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={themeColors.input.placeholderColor}
        underlineColorAndroid={themeColors.input.underlineColor}
        style={inputStyles}
        ref={ref}
        keyboardType={keyboardType ?? "default"}
        secureTextEntry={password}
        value={value}
        onChangeText={onChangeText ? (text) => onChangeText(text) : undefined}
        multiline={!!multiline}
        numberOfLines={numberOfLines ?? 1}
        defaultValue={defaultValue || ""}
      />
    </View>
  );
});
