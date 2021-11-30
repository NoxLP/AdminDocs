import React from 'react';
import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import Typography from '../../constants/Typography';
import { useThemeColors } from '../Themed';
import { AnchorProps } from './AnchorProps';

const CONTAINER: ViewStyle = {
  height: 60,
  width: '85%',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 6,
  backgroundColor: 'transparent',
  borderColor: 'transparent',
};
const TEXT: TextStyle = {
  fontFamily: Typography.fontFamily.primary,
  fontSize: Typography.fontSize.primary,
  textDecorationLine: 'underline',
};

export function Anchor(props: AnchorProps) {
  const {
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    ...rest
  } = props;

  const themeColors = useThemeColors();
  const viewStyles = [CONTAINER, styleOverride];
  const textStyles = [
    { color: themeColors.anchorTextColor },
    TEXT,
    textStyleOverride,
  ];

  return (
    <TouchableOpacity style={viewStyles} {...rest}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
}
