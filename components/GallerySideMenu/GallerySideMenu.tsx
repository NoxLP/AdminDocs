import React, { useEffect, useRef } from 'react';
import { Animated, ImageStyle, View, ViewStyle } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { icons } from '../Icon/icons';
import GallerySideMenuProps from './GallerySideMenuProps';

const BUTTON: ViewStyle = {
  elevation: 0,
  width: '63%',
};
const ICON: ImageStyle = {
  width: '63%',
};

export default function GallerySideMenu(props: GallerySideMenuProps) {
  const { show } = props;
  const fadeAnim = useRef(new Animated.Value(-70)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: -2,
      duration: 450,
      useNativeDriver: false,
      easing: Easing.elastic(0.95),
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: -70,
      duration: 450,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.sin),
    }).start();
  };

  const CONTAINER: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexShrink: 2,
    height: '35%',
    width: '19%',
    position: 'absolute',
    top: '0.5%',
    right: fadeAnim,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    zIndex: 100,
  };

  useEffect(() => {
    if (show) fadeIn();
    else fadeOut();
  }, [show]);

  return (
    <Animated.View style={CONTAINER}>
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
    </Animated.View>
  );
}
