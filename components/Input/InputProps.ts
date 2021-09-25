import {
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { TextProps, ViewProps } from "../Themed";

export interface InputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  forwardedRef?: any;
  keyboardType?: KeyboardTypeOptions;
  password?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
}
