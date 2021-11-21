import { FieldError } from "react-hook-form";
import { KeyboardTypeOptions, TextStyle, ViewStyle } from "react-native";

export interface InputProps {
  controlled?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  label?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  keyboardType?: KeyboardTypeOptions;
  password?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  name?: string;
  error?: FieldError | undefined;
}
