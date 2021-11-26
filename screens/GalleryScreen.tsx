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
import {
  AutocompleteDropdown,
  TAutocompleteDropdownItem,
} from 'react-native-autocomplete-dropdown';

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
    buildAutocompleteItems,
    autocompleteItems,
    filteredDocuments,
    filterDocuments,
  } = useGallery();
  console.log(isLoading ? 'loading' : documents.length);

  const FLATLIST_CONTAINER: ViewStyle = {
    flex: 1,
    marginTop: '3%',
    paddingHorizontal: '3%',
    backgroundColor: themeColors.background,
  };

  const filterOnTextChangeHandler = (text: string) => {
    filterDocuments(documents, text);
  };
  const filterOnSelectItemHandler = (item: TAutocompleteDropdownItem) => {
    if (item) filterDocuments(documents, item.id, true);
  };
  const filterOnClearHandler = () => {
    filterDocuments(documents, '');
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

  useEffect(() => {
    if (!isLoading) {
      buildAutocompleteItems(documents);
      filterDocuments(documents, '');
    }
  }, [isLoading, documents]);

  // TODO: isloading and error ui
  return (
    <>
      {isLoading || !documents || documents.length == 0 ? (
        <Text text="loading" />
      ) : (
        <FlatListCustom
          items={filteredDocuments ? filteredDocuments : []}
          renderItem={renderItem}
          style={FLATLIST_CONTAINER}
          numColumns={2}
        />
      )}
      <AutocompleteDropdown
        loading={isLoading}
        textInputProps={{ placeholder: 'Filtro' }}
        dataSet={autocompleteItems}
        onChangeText={filterOnTextChangeHandler}
        onSelectItem={filterOnSelectItemHandler}
        onClear={filterOnClearHandler}
        emptyResultText="No se encontraron resultados"
      />
      <BottomTabs navigation={navigation} />
    </>
  );
}
