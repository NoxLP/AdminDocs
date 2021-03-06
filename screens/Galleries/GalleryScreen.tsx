import React, { useEffect } from 'react';
import { Alert, ViewStyle } from 'react-native';
import {
  AutocompleteDropdown,
  TAutocompleteDropdownItem,
} from 'react-native-autocomplete-dropdown';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
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
import { useQueryClient } from 'react-query';

export default function GalleryScreen({
  navigation,
  route,
}: RootStackScreenProps<'GalleryScreen'>) {
  const themeColors = useThemeColors();
  const queryClient = useQueryClient();

  let isLoading: boolean,
    error,
    isError,
    documents: Array<IDocument> | undefined;

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

  //#region helpers
  const getFirstSelectedDocument = (): IDocument | undefined => {
    const index = selectedItems.indexOf(true);
    if (index !== -1) return documents[index];
    return undefined;
  };
  const shareExistingFile = async (document: IDocument, filePath: string) => {
    await Sharing.shareAsync(filePath, {
      UTI: document.contentType,
      mimeType: document.contentType,
      dialogTitle: `Compartir ${document.name}`,
    });
  };
  const writeDocumentImageToFileAndShare = async (
    document: IDocument,
    filePath: string
  ) => {
    await FileSystem.writeAsStringAsync(filePath, document.data!, {
      encoding: 'base64',
    });
    await shareExistingFile(document, filePath);
  };
  const existingDocumentAlert = (document: IDocument, filePath: string) => {
    Alert.alert(
      'El archivo ya existe',
      'Necesitamos guardar el fichero en su dispositivo para poder compartirlo, pero ya existe un fichero con este nombre en su dispositivo, ??quiere compartir el archivo existente o sobreescribir?:',
      [
        {
          text: 'Existente',
          onPress: async () => await shareExistingFile(document, filePath),
          style: 'default',
        },
        {
          text: 'Sobreescribir',
          onPress: async () =>
            await writeDocumentImageToFileAndShare(document, filePath),
        },
        {
          text: 'Cancelar',
          onPress: () => Alert.alert('No se comparti?? el archivo'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => Alert.alert('No se comparti?? el archivo'),
      }
    );
  };
  //#endregion

  const sideMenuEditButtonOnPressHandler = () => {
    if (documents && selectedItems.length > 0) {
      const document = getFirstSelectedDocument();
      if (document) navigation.navigate('EditDocumentScreen', { document });
    } else {
      //TODO: notification no documents or no documents selected
    }
  };
  const sideMenuReloadButtonOnPressHandler = () => {
    if (route.params.type === GalleryType.UserDocuments) {
      queryClient.invalidateQueries('userDocs');
    } else {
      queryClient.invalidateQueries('commDocs');
    }
  };
  const sideMenuShareButtonOnPressHandler = async () => {
    console.log('>>> SHARE');

    if (documents && selectedItems.length > 0) {
      console.log('documents ok');
      // TODO: check if admin setted document as shareable

      const sharingReady = await Sharing.isAvailableAsync();
      if (sharingReady) {
        console.log('sharing ready');
        const document = getFirstSelectedDocument();
        if (document) {
          console.log('document ready');
          const filePath = `${FileSystem.documentDirectory}/${document.name}`;
          const fileInfo = await FileSystem.getInfoAsync(filePath);

          if (fileInfo.exists) {
            existingDocumentAlert(document, filePath);
          } else {
            await writeDocumentImageToFileAndShare(document, filePath);
          }
          console.log('shared');
        }
      } else {
        //TODO: notification try later
        console.log('sharing not ready');
      }
    }
  };
  const sideMenuDeleteButtonOnPressHandler = () => {};

  const renderItem = ({ item, index }: { item: IDocument; index: number }) => {
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
        reloadButtonOnPressHandler={sideMenuReloadButtonOnPressHandler}
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
