import { PickerProps as RNPickerProps } from "@react-native-picker/picker";
import { TextStyle, ViewStyle } from "react-native";

export interface PickerItemProps {
  key: string;
  value: any;
}
export interface PickerProps {
  name?: string;
  selectedValue?: PickerItemProps;
  defaultValue?: PickerItemProps;
  onValueChange?: (itemValue: any, itemIndex: number) => void | undefined;
  label?: string;
  style?: ViewStyle;
  pickerStyle?: TextStyle;
  items: Array<PickerItemProps>;
}
