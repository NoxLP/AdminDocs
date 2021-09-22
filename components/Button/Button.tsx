import React from "react";
import { Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import Typography from "../../constants/Typography";
import { useThemeColors, View } from "../Themed";
import { ButtonProps } from "./ButtonProps";

const CONTAINER: ViewStyle = {
  height: 60,
  width: "85%",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 6,
};
const TEXT: TextStyle = {
  fontFamily: Typography.fontFamily.primary,
  fontSize: Typography.fontSize.button,
  fontWeight: "700",
};

export function Button(props: ButtonProps) {
  const {
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    preset,
    ...rest
  } = props;

  const themeColors = useThemeColors();
  const viewStyles = [
    { backgroundColor: themeColors.button.background },
    CONTAINER,
    styleOverride,
  ];
  const textStyles = [
    {
      color:
        !preset || preset === "default"
          ? themeColors.background
          : themeColors.text,
    },
    TEXT,
    textStyleOverride,
  ];

  return (
    <TouchableOpacity style={viewStyles} {...rest}>
      {!preset || preset === "default" ? (
        <Text style={textStyles}>{text}</Text>
      ) : (
        <>
          {children}
          {text ? <Text style={textStyles}>{text}</Text> : null}
        </>
      )}
    </TouchableOpacity>
  );
}
