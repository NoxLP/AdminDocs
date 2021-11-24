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

const SCROLL_CONTAINER: ViewStyle = {
  flex: 2,
  height: Layout.window.height,
};
const FLATLIST_CONTAINER: ViewStyle = {
  flex: 1,
  minHeight: Layout.window.height,
  paddingHorizontal: '3%',
};
const IMAGE_CONTAINER: ViewStyle = {
  width: '47%',
  margin: '3%',
  marginHorizontal: 0,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#ABA7A7',
  elevation: 5,
};
const IMAGE: ImageStyle = {
  height: '100%',
  width: '100%',
  resizeMode: 'cover',
};

export default function GalleryScreen({
  navigation,
  route,
}: RootStackScreenProps<'GalleryScreen'>) {
  const themeColors = useThemeColors();
  const { isLoading, error, isError, documents } = useUserDocuments();

  const imageContainerHeight = Layout.window.height * 0.3;
  const imageContainerOverride: ViewStyle = {
    ...IMAGE_CONTAINER,
    height: imageContainerHeight,
  };

  const renderItem = ({ item }: { item: IDocument }) => {
    console.log(item.name);

    //console.log(`data:${item.contentType};base64,${item.data}`);
    return (
      <View style={imageContainerOverride}>
        <Image
          source={{ uri: `data:${item.contentType};base64,${item.data}` }}
          style={IMAGE}
        />
      </View>
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
