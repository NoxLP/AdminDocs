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
  const hideAnim = useRef(new Animated.Value(-70)).current;
  const doShowAnim = () => {
    Animated.timing(hideAnim, {
      toValue: -2,
      duration: 450,
      useNativeDriver: false,
      easing: Easing.elastic(0.95),
    }).start();
  };
  const doHideAnim = () => {
    Animated.timing(hideAnim, {
      toValue: -80,
      duration: 450,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.sin),
    }).start();
  };

  const CONTAINER: ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexShrink: 2,
    height: '12%',
    width: '52%',
    position: 'absolute',
    top: hideAnim,
    right: -2,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 6,
    zIndex: 100,
  };

  useEffect(() => {
    if (show) doShowAnim();
    else doHideAnim();
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
