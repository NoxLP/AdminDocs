import * as React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { Text, useThemeColors } from '../Themed';
import { Picker as RNPicker } from '@react-native-picker/picker';
import { PickerProps } from './PickerProps';
import Typography from '../../constants/Typography';

const CONTAINER: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: 'black',
  height: 'auto',
  width: '87%',
};

const LABEL: TextStyle = {
  fontFamily: Typography.fontFamily.semiBold,
  fontSize: Typography.fontSize.previewDocumentInputLabel,
  marginLeft: '-0.7%',
};

const PICKER: TextStyle = {
  width: '100%',
};

export const Picker = React.forwardRef(function Picker(
  props: PickerProps,
  ref: any
) {
  const {
    name,
    selectedValue,
    defaultValue,
    onValueChange,
    label,
    style: styleOverride,
    pickerStyle: inputStyleOverride,
    items,
  } = props;

  const themeColors = useThemeColors();

  const labelStyles = [LABEL, { color: themeColors.input.label }];
  const containerStyles = [CONTAINER, styleOverride];
  const pickerStyles = [
    PICKER,
    inputStyleOverride,
    { color: themeColors.text },
  ];

  return (
    <View style={containerStyles}>
      {label ? <Text style={labelStyles} text={label} /> : null}
      <RNPicker
        style={pickerStyles}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        {!defaultValue
          ? items.map((item) => (
              <RNPicker.Item
                key={item.key}
                label={item.key}
                value={item.value}
              />
            ))
          : [
              <RNPicker.Item
                key={defaultValue.key}
                label={defaultValue.key}
                value={defaultValue.value}
              />,
              ...items
                .filter((item) => item.value !== defaultValue.value)
                .map((item) => (
                  <RNPicker.Item
                    key={item.key}
                    label={item.key}
                    value={item.value}
                  />
                )),
            ]}
      </RNPicker>
    </View>
  );
});
