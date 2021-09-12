import { KeyboardTypeOptions, StyleProp, TextStyle, ViewStyle } from "react-native";
import { TextProps, ViewProps } from "../Themed";

export interface InputProps {
  /**
     * The placeholder i18n key.
     */
  // placeholderTx?: TxKeyPath

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string

  value: string
  onChangeText: (text: string) => void

  /**
   * The label i18n key.
   */
  // labelTx?: TxKeyPath

  /**
   * The label text if no labelTx is provided.
   */
  label?: string

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: ViewStyle

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: TextStyle

  /**
   * Various look & feels.
   */
  // preset?: TextFieldPresets

  forwardedRef?: any

  keyboardType?: KeyboardTypeOptions

  password?: boolean
}