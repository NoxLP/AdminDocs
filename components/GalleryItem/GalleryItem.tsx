import Checkbox from 'expo-checkbox';
import React from 'react';
import { Image, ImageStyle, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Layout from '../../constants/Layout';
import { useThemeColors } from '../Themed';
import IGalleryItemProps from './GalleryItemProps';

const IMAGE: ImageStyle = {
  height: '100%',
  width: '100%',
  resizeMode: 'cover',
};
const CHECKBOX: ViewStyle = {
  margin: 0,
};

export function GalleryItem(props: IGalleryItemProps) {
  const {
    item,
    itemHeight,
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
  const IMAGE_CONTAINER: ViewStyle = {
    width: '47%',
    height: Layout.window.height * itemHeight,
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
    <View style={IMAGE_CONTAINER}>
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
      </TouchableOpacity>
    </View>
  );
}
