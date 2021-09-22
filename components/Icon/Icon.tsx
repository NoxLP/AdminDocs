import * as React from "react";
import { View, ImageStyle, Image } from "react-native";
import { IconProps } from "./IconProps";
import { icons } from "./icons/index";

const ROOT: ImageStyle = {
  resizeMode: "contain",
};

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle } = props;

  return (
    <View style={containerStyle}>
      <Image style={[ROOT, styleOverride]} source={icons[icon]} />
    </View>
  );
}
