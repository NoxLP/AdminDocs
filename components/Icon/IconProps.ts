import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  ViewStyle,
} from "react-native";

export interface IconProps {
  icon: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}
