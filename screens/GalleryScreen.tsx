import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import {
  AutocompleteDropdown,
  TAutocompleteDropdownItem,
} from 'react-native-autocomplete-dropdown';
import { BottomTabs } from '../components/BottomTabs/BottomTabs';
import { FlatListCustom } from '../components/FlatListCustom/FlatListCustom';
import { Text, useThemeColors, View } from '../components/Themed';
import { GalleryItem } from '../components/GalleryItem/GalleryItem';
import useUserDocuments from '../hooks/DocumentsGalleries/useUserDocuments';
import useCommunityDocuments from '../hooks/DocumentsGalleries/useCommunityDocuments';
import useGallery from '../hooks/DocumentsGalleries/useGallery';
import { useKeyboard } from '../hooks/useKeyboard';
import { RootStackScreenProps, GalleryType } from '../types';
import IDocument from '../models/Document';
import GallerySideMenu from '../components/GallerySideMenu/GallerySideMenu';

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
  const isKeyboardVisible = useKeyboard();
  console.log(isLoading ? 'loading' : documents!.length);

  const FLATLIST_CONTAINER: ViewStyle = {
    flex: 1,
    padding: '3%',
    backgroundColor: themeColors.background,
  };

  const onFilterTextChangeHandler = (text: string) => {
    filterDocuments(documents!, text);
  };
  const onFilterSelectItemHandler = (item: TAutocompleteDropdownItem) => {
    if (item) filterDocuments(documents!, item.id, true);
  };
  const onFilterClearHandler = () => {
    filterDocuments(documents!, '');
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
      buildAutocompleteItems(documents!);
      filterDocuments(documents!, '');
    }
  }, [isLoading, documents]);

  // TODO: isloading and error ui
  return (
    <>
      <GallerySideMenu show={isSelecting} />
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
        emptyResultText="No se encontraron resultados"
        onChangeText={onFilterTextChangeHandler}
        onSelectItem={onFilterSelectItemHandler}
        onClear={onFilterClearHandler}
      />
      <BottomTabs navigation={navigation} hide={isKeyboardVisible} />
    </>
  );
}
