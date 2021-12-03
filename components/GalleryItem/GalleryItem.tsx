import Checkbox from 'expo-checkbox';
import React from 'react';
import {
  Animated,
  Image,
  ImageStyle,
  Pressable,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Layout from '../../constants/Layout';
import Typography from '../../constants/Typography';
import useGalleryItemsAnimations from '../../hooks/DocumentsGalleries/useGalleryItemsAnimations';
import DocumentCategory from '../../models/DocumentCategory';
import { Text, useThemeColors } from '../Themed';
import IGalleryItemProps from './GalleryItemProps';

//#region styles
const CONTAINER: ViewStyle = {
  width: '47%',
  height: Layout.window.height * 0.3,
  margin: '3%',
  marginHorizontal: 0,
};
const BUTTON: ViewStyle = {
  width: '100%',
  margin: 0,
  padding: 0,
  borderWidth: 0,
  elevation: 0,
  alignSelf: 'flex-end',
};
const IMAGE: ImageStyle = {
  height: '100%',
  width: '100%',
  resizeMode: 'cover',
};
const CHECKBOX: ViewStyle = {
  margin: 0,
  position: 'absolute',
  bottom: 0,
  right: 0,
  zIndex: 200,
};
const OVERLAY: ViewStyle = {
  height: '35%',
  width: '100%',
  position: 'absolute',
  bottom: 0,
  left: 0,
};
const OVERLAY_BACKGROUND: ViewStyle = {
  height: '35%',
  width: '100%',
  backgroundColor: 'black',
  opacity: 0.5,
};
const OVERLAY_TEXT: TextStyle = {
  marginLeft: '4%',
  marginTop: '2%',
  color: 'white',
  fontFamily: Typography.fontFamily.primary,
};
const NAME_FONT: TextStyle = {
  fontSize: Typography.fontSize.galleryItemOverlayName,
};
const CATEGORY_FONT: TextStyle = {
  fontSize: Typography.fontSize.galleryItemOverlayCategory,
};
//#endregion

export function GalleryItem(props: IGalleryItemProps) {
  const {
    item,
    index,
    isSelecting,
    setIsSelecting,
    selectedItems,
    setIsSelected,
    navigation,
  } = props;
  const themeColors = useThemeColors();
  const {
    pressItemAnim,
    doElasticPressAnim,
    shrink,
    grow,
    opacityItemAnim,
    fadeIn,
    fadeOut,
  } = useGalleryItemsAnimations();

  const TRANSFORM: ViewStyle = {
    transform: [
      {
        scale: pressItemAnim,
      },
    ],
  };
  const OPACITY_ANIM: ViewStyle = {
    opacity: opacityItemAnim,
  };

  const onPressHandler = () => {
    grow();
    fadeIn(() => navigation.navigate('PreviewDocumentScreen', { item }));
  };
  const onPressInHandler = () => {
    shrink();
    fadeOut();
  };
  const onLongPressHandler = () => {
    if (isSelecting) {
      setIsSelecting(false);
    } else {
      setIsSelecting(true);
    }
    grow();
    fadeIn();
  };
  const selectThis = () => {
    setIsSelected(index);
  };

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <View style={CONTAINER}>
      {!isSelecting || (
        <Checkbox
          style={CHECKBOX}
          value={selectedItems[index]}
          onValueChange={selectThis}
          color={
            selectedItems[index]
              ? themeColors.checkbox.checked
              : themeColors.checkbox.unchecked
          }
        />
      )}
      <AnimatedPressable
        onPress={onPressHandler}
        onPressIn={onPressInHandler}
        onLongPress={onLongPressHandler}
        style={[BUTTON, TRANSFORM, OPACITY_ANIM]}
      >
        <Animated.View style={OPACITY_ANIM}>
          <Image
            source={{ uri: `data:${item.contentType};base64,${item.data}` }}
            style={IMAGE}
          />
          <View style={[OVERLAY, OVERLAY_BACKGROUND]} />
          <View style={OVERLAY}>
            <Text
              style={[OVERLAY_TEXT, NAME_FONT]}
              text={item.name}
              numberOfLines={1}
            />
            <Text
              style={[OVERLAY_TEXT, CATEGORY_FONT]}
              text={DocumentCategory[item.category]}
              numberOfLines={1}
            />
          </View>
        </Animated.View>
      </AnimatedPressable>
    </View>
  );
}
