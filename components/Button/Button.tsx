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
  borderRadius: 10,
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
  const viewPresets = {
    success: { backgroundColor: themeColors.button.success },
    error: { backgroundColor: themeColors.button.error },
    icon: { backgroundColor: "transparent" },
  };
  const textPresets = {
    success: { color: themeColors.button.text },
    error: { color: themeColors.button.text },
    icon: { color: themeColors.text },
  };

  const viewStyles = [
    viewPresets[preset || "success"],
    CONTAINER,
    styleOverride,
  ];
  const textStyles = [
    textPresets[preset || "success"],
    TEXT,
    textStyleOverride,
  ];

  return (
    <TouchableOpacity style={viewStyles} {...rest}>
      {!preset || preset !== "icon" ? (
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
