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
  console.log(documents.length);

  const FLATLIST_CONTAINER: ViewStyle = {
    flex: 1,
    paddingHorizontal: '3%',
    backgroundColor: themeColors.background,
  };

  const renderItem = ({ item, index }: { item: IDocument; index: number }) => {
    //console.log(`data:${item.contentType};base64,${item.data}`);
    return (
      <GalleryItem
        item={item}
        index={index}
        imageWidth={imageWidth}
        setImageWidth={setImageWidth}
        isSelecting={isSelecting}
        setIsSelecting={setIsSelecting}
        selectedItems={selectedItems}
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
        <FlatListCustom
          items={documents ? documents : []}
          renderItem={renderItem}
          style={FLATLIST_CONTAINER}
          numColumns={2}
        />
      )}
      <BottomTabs navigation={navigation} />
    </>
  );
}
