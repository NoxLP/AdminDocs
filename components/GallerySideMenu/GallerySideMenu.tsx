import React, { useEffect } from 'react';
import { ImageStyle, View, ViewStyle } from 'react-native';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { icons } from '../Icon/icons';

const CONTAINER: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-around',
  flexShrink: 2,
  height: '35%',
  width: '19%',
  position: 'absolute',
  top: '0.5%',
  right: -2,
  backgroundColor: 'white',
  borderColor: 'black',
  borderWidth: 1,
  borderTopLeftRadius: 6,
  borderBottomLeftRadius: 6,
  zIndex: 100,
};
const CONTAINER_CONTENT: ViewStyle = {};
const BUTTON: ViewStyle = {
  elevation: 0,
  width: '63%',
};
const ICON: ImageStyle = {
  width: '63%',
};

export default function GallerySideMenu(props) {
  return (
    <View style={CONTAINER}>
      <Button
        style={BUTTON}
        preset="icon"
        children={<Icon style={ICON} icon={icons.gallerySideMenuEdit} />}
      />
      <Button
        style={BUTTON}
        preset="icon"
        children={<Icon style={ICON} icon={icons.gallerySideMenuShare} />}
      />
      <Button
        style={BUTTON}
        preset="icon"
        children={<Icon style={ICON} icon={icons.gallerySideMenuDelete} />}
      />
    </View>
  );
}
