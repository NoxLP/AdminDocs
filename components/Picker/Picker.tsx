import * as React from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { useThemeColors } from "../Themed";
import { Picker as RNPicker } from "@react-native-picker/picker";
import { PickerProps } from "./PickerProps";

const CONTAINER: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: "black",
  height: "auto",
  width: "87%",
};

const PICKER: TextStyle = {
  width: "100%",
};

export const Picker = React.forwardRef(function Picker(
  props: PickerProps,
  ref: any
) {
  const {
    name,
    selectedValue,
    onValueChange,
    label,
    style: styleOverride,
    pickerStyle: inputStyleOverride,
    items,
  } = props;

  const themeColors = useThemeColors();

  const containerStyles = [CONTAINER, styleOverride];
  const pickerStyles = [
    PICKER,
    inputStyleOverride,
    { color: themeColors.text },
  ];

  return (
    <View style={containerStyles}>
      <RNPicker
        style={pickerStyles}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        {items.map((item) => (
          <RNPicker.Item
            key={item.label}
            label={item.label}
            value={item.value}
          />
        ))}
      </RNPicker>
    </View>
  );
});
