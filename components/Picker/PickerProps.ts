import { PickerProps as RNPickerProps } from "@react-native-picker/picker";
import { TextStyle, ViewStyle } from "react-native";

export interface PickerItemProps {
  label: string;
  value: any;
}
export interface PickerProps {
  name: string;
  selectedValue?: any;
  onValueChange?: (itemValue: any, itemIndex: number) => void | undefined;
  label?: string;
  style?: ViewStyle;
  pickerStyle?: TextStyle;
  items: Array<PickerItemProps>;
}
