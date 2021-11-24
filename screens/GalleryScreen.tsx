import React, { useEffect } from 'react';
import { BottomTabs } from '../components/BottomTabs/BottomTabs';
import { FlatListCustom } from '../components/FlatListCustom/FlatListCustom';
import { Text, useThemeColors, View } from '../components/Themed';
import useUserDocuments from '../hooks/DocumentsGalleries/useUserDocuments';
import useCommunityDocuments from '../hooks/DocumentsGalleries/useCommunityDocuments';
import { RootStackScreenProps, GalleryType } from '../types';
import { Image, ImageStyle, ScrollView, ViewStyle } from 'react-native';
import IDocument from '../models/Document';
import Layout from '../constants/Layout';
import { GalleryItem } from '../components/GalleryItem/GalleryItem';
import useGallery from '../hooks/DocumentsGalleries/useGallery';

const SCROLL_CONTAINER: ViewStyle = {
  flex: 2,
  height: Layout.window.height,
};
const FLATLIST_CONTAINER: ViewStyle = {
  flex: 1,
  minHeight: Layout.window.height,
  paddingHorizontal: '3%',
};

export default function GalleryScreen({
  navigation,
  route,
}: RootStackScreenProps<'GalleryScreen'>) {
  const themeColors = useThemeColors();
  const { isLoading, error, isError, documents } = useUserDocuments();
  const {
    imageWidth,
    setImageWidth,
    isSelecting,
    setIsSelecting,
    selectedItems,
    setIsSelected,
  } = useGallery();

  const renderItem = ({ item }: { item: IDocument }) => {
    console.log(item.name);

    //console.log(`data:${item.contentType};base64,${item.data}`);
    return (
      <GalleryItem
        item={item}
        imageWidth={imageWidth}
        setImageWidth={setImageWidth}
        isSelecting={isSelecting}
        setIsSelecting={setIsSelecting}
        setIsSelected={setIsSelected}
        navigation={navigation}
      />
    );
  };

  // TODO: isloading and error ui
  return (
    <>
      {isLoading ? (
        <Text text="loading" />
      ) : (
        <>
          <Text text={documents.length} />
          <ScrollView style={SCROLL_CONTAINER}>
            <FlatListCustom
              items={documents ? documents : []}
              renderItem={renderItem}
              style={FLATLIST_CONTAINER}
              contentStyle={{
                flex: 1,
                alignItems: 'flex-start',
              }}
              numColumns={3}
            />
          </ScrollView>
        </>
      )}
      <BottomTabs navigation={navigation} />
    </>
  );
}
