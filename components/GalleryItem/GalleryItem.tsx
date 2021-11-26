import Checkbox from 'expo-checkbox';
import React from 'react';
import { Image, ImageStyle, TextStyle, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Layout from '../../constants/Layout';
import Typography from '../../constants/Typography';
import { Text, useThemeColors } from '../Themed';
import IGalleryItemProps from './GalleryItemProps';

const IMAGE: ImageStyle = {
  height: '100%',
  width: '100%',
  resizeMode: 'cover',
};
const CHECKBOX: ViewStyle = {
  margin: 0,
};
const OVERLAY: ViewStyle = {
  height: '35%',
  width: '100%',
  position: 'absolute',
  bottom: 0,
  left: 0,
};
const VIEW_OPACITY: ViewStyle = {
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

export function GalleryItem(props: IGalleryItemProps) {
  const {
    item,
    index,
    imageWidth,
    setImageWidth,
    isSelecting,
    setIsSelecting,
    selectedItems,
    setIsSelected,
    navigation,
  } = props;
  const themeColors = useThemeColors();

  const BUTTON: ViewStyle = {
    width: imageWidth,
    margin: 0,
    marginTop: imageWidth == '100%' ? 0 : '-20%',
    marginBottom: imageWidth == '100%' ? 0 : '20%',
    padding: 0,
    borderWidth: 0,
    elevation: 0,
    alignSelf: 'flex-end',
  };
  const CONTAINER: ViewStyle = {
    width: '47%',
    height: Layout.window.height * 0.3,
    margin: '3%',
    marginHorizontal: 0,
  };

  const onPressHandler = () => {
    //TODO: navigation to preview
  };
  const onLongPressHandler = () => {
    if (isSelecting) {
      setIsSelecting(false);
      setImageWidth('100%');
    } else {
      setIsSelecting(true);
      setImageWidth('75%');
    }
  };
  const selectThis = () => {
    setIsSelected(index);
  };

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
      <TouchableOpacity
        style={BUTTON}
        onPress={onPressHandler}
        onLongPress={onLongPressHandler}
      >
        <Image
          source={{ uri: `data:${item.contentType};base64,${item.data}` }}
          style={IMAGE}
        />
        <View style={[OVERLAY, VIEW_OPACITY]} />
        <View style={OVERLAY}>
          <Text
            style={[OVERLAY_TEXT, NAME_FONT]}
            text={item.name}
            numberOfLines={1}
          />
          <Text
            style={[OVERLAY_TEXT, CATEGORY_FONT]}
            text={item.category}
            numberOfLines={1}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
