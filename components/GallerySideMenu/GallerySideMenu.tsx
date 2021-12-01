import React, { useEffect } from 'react';
import { Animated, ImageStyle, ViewStyle } from 'react-native';
import useGalleryMenuAnimations from '../../hooks/DocumentsGalleries/useGalleryMenuAnimations';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { icons } from '../Icon/icons';
import GallerySideMenuProps from './GallerySideMenuProps';

const BUTTON: ViewStyle = {
  elevation: 0,
  width: '25%',
};
const ICON: ImageStyle = {
  width: '50%',
  height: '50%',
};

export default function GallerySideMenu(props: GallerySideMenuProps) {
  const {
    show,
    editButtonOnPressHandler,
    reloadButtonOnPressHandler,
    shareButtonOnPressHandler,
    deleteButtonOnPressHandler,
  } = props;
  const { hideAnim, doShowAnim, doHideAnim } = useGalleryMenuAnimations();

  const CONTAINER: ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexShrink: 2,
    height: '12%',
    width: '70%',
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
        children={<Icon style={ICON} icon={icons.gallerySideMenuReload} />}
        onPress={reloadButtonOnPressHandler}
      />
      <Button
        style={BUTTON}
        preset="icon"
        children={<Icon style={ICON} icon={icons.gallerySideMenuEdit} />}
        onPress={editButtonOnPressHandler}
      />
      <Button
        style={BUTTON}
        preset="icon"
        children={<Icon style={ICON} icon={icons.gallerySideMenuShare} />}
        onPress={shareButtonOnPressHandler}
      />
      <Button
        style={BUTTON}
        preset="icon"
        children={<Icon style={ICON} icon={icons.gallerySideMenuDelete} />}
        onPress={deleteButtonOnPressHandler}
      />
    </Animated.View>
  );
}
