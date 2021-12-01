import * as React from 'react';
import { ImageStyle, Image } from 'react-native';
import { IconProps } from './IconProps';

const ROOT: ImageStyle = {
  resizeMode: 'contain',
};

export function Icon(props: IconProps) {
  const { style: styleOverride, icon } = props;

  return <Image source={icon} style={[ROOT, styleOverride]} />;
}
