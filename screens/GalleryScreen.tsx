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

  const itemHeight = 0.3;
  const rowHeight = Layout.window.height * (itemHeight + 0.1);
  const rowsNum = Math.ceil(documents.length / 2);
  const height = rowHeight * rowsNum;
  const SCROLL_CONTAINER: ViewStyle = {
    flex: 2,
    height: height,
    backgroundColor: themeColors.background,
  };
  const FLATLIST_CONTAINER: ViewStyle = {
    flex: 1,
    height: height,
    paddingHorizontal: '3%',
  };

  const renderItem = ({ item, index }: { item: IDocument; index: number }) => {
    //console.log(`data:${item.contentType};base64,${item.data}`);
    return (
      <GalleryItem
        item={item}
        itemHeight={itemHeight}
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
      )}
      <BottomTabs navigation={navigation} />
    </>
  );
}
