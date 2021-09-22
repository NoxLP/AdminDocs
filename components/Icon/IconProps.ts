import { ImageStyle, StyleProp, ViewStyle } from "react-native";
import { IconTypes } from "./icons/index";

export interface IconProps {
  icon: IconTypes;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}
