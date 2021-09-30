import { KeyboardTypeOptions, TextStyle, ViewStyle } from "react-native";

export interface InputProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  label?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  keyboardType?: KeyboardTypeOptions;
  password?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  name?: string;
}
