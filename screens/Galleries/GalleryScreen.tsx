import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import {
  AutocompleteDropdown,
  TAutocompleteDropdownItem,
} from 'react-native-autocomplete-dropdown';
import { BottomTabs } from '../../components/BottomTabs/BottomTabs';
import { FlatListCustom } from '../../components/FlatListCustom/FlatListCustom';
import { Text, useThemeColors, View } from '../../components/Themed';
import { GalleryItem } from '../../components/GalleryItem/GalleryItem';
import useUserDocuments from '../../hooks/DocumentsGalleries/useUserDocuments';
import useCommunityDocuments from '../../hooks/DocumentsGalleries/useCommunityDocuments';
import useGallery from '../../hooks/DocumentsGalleries/useGallery';
import { useKeyboard } from '../../hooks/useKeyboard';
import { RootStackScreenProps } from '../../types';
import IDocument from '../../models/Document';
import GallerySideMenu from '../../components/GallerySideMenu/GallerySideMenu';
import { GalleryType } from './GalleryType';

export default function GalleryScreen({
  navigation,
  route,
}: RootStackScreenProps<'GalleryScreen'>) {
  const themeColors = useThemeColors();
  let isLoading: boolean,
    error,
    isError,
    documents: Array<IDocument> | undefined;
  console.log('>>> ROUTE TYPE:');
  console.log(route.params.type);

  if (route.params.type === GalleryType.UserDocuments) {
    console.log('User docs');
    ({ isLoading, error, isError, documents } = useUserDocuments());
  } else {
    console.log('Comm docs');
    ({ isLoading, error, isError, documents } = useCommunityDocuments());
  }

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

  const sideMenuEditButtonOnPressHandler = () => {
    if (documents && selectedItems.length > 0) {
      const index = selectedItems.indexOf(true);

      if (index !== -1) {
        navigation.navigate('EditDocumentScreen', {
          document: documents[index],
        });
      }
    } else {
      //TODO: notification no documents or no documents selected
    }
  };
  const sideMenuShareButtonOnPressHandler = () => {};
  const sideMenuDeleteButtonOnPressHandler = () => {};

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
      <GallerySideMenu
        show={isSelecting}
        editButtonOnPressHandler={sideMenuEditButtonOnPressHandler}
        shareButtonOnPressHandler={sideMenuShareButtonOnPressHandler}
        deleteButtonOnPressHandler={sideMenuDeleteButtonOnPressHandler}
      />
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
      <BottomTabs navigation={navigation} />
    </>
  );
}
