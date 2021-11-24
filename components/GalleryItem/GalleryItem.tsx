import React from 'react';
import { Image, ImageStyle, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Layout from '../../constants/Layout';
import useGallery from '../../hooks/DocumentsGalleries/useGallery';
import IGalleryItemProps from './GalleryItemProps';

const IMAGE_CONTAINER: ViewStyle = {
  width: '47%',
  height: Layout.window.height * 0.3,
  margin: '3%',
  marginHorizontal: 0,
};
const IMAGE: ImageStyle = {
  height: '100%',
  width: '100%',
  resizeMode: 'cover',
};

export function GalleryItem(props: IGalleryItemProps) {
  const {
    item,
    imageWidth,
    setImageWidth,
    isSelecting,
    setIsSelecting,
    setIsSelected,
    navigation,
  } = props;

  const BUTTON: ViewStyle = {
    width: imageWidth,
    margin: 0,
    padding: 0,
    borderWidth: 0,
    elevation: 0,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
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

  return (
    <View style={IMAGE_CONTAINER}>
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
