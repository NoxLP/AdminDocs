import * as React from "react";
import { TextInput, TextStyle, View, ViewStyle } from "react-native";
import COLORS from "../../constants/Colors";
import TYPOGRAPHY from "../../constants/Typography";
import { InputProps } from "./InputProps";
import { Text, useThemeColors } from "../Themed";

// the base styling for the container
const CONTAINER: ViewStyle = {};

// the base styling for the TextInput
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

export default function Input(props: InputProps) {
  const {
    // placeholderTx,
    placeholder,
    value,
    onChangeText,
    // labelTx,
    label,
    // preset = "default",
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    keyboardType,
    password,
    multiline,
    numberOfLines,
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
        ref={forwardedRef}
        keyboardType={keyboardType ?? "default"}
        secureTextEntry={password}
        value={value}
        onChangeText={(text) => onChangeText(text)}
        multiline={!!multiline}
        numberOfLines={numberOfLines ?? 1}
      />
    </View>
  );
}
