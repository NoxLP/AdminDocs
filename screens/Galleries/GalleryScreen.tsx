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
import { Text, useThemeColors } from '../../components/Themed';
import { GalleryItem } from '../../components/GalleryItem/GalleryItem';
import useUserDocuments from '../../hooks/DocumentsGalleries/useUserDocuments';
import useCommunityDocuments from '../../hooks/DocumentsGalleries/useCommunityDocuments';
import useGallery from '../../hooks/DocumentsGalleries/useGallery';
import { RootStackScreenProps } from '../../types';
import IDocument from '../../models/Document';
import GallerySideMenu from '../../components/GallerySideMenu/GallerySideMenu';
import { GalleryType } from './GalleryType';
import { useQueryClient } from 'react-query';
import useRemoveDocument from '../../hooks/Documents/useRemoveDocument';
import { Icon } from '../../components/Icon/Icon';
import { icons } from '../../components/Icon/icons';
import { useKeyboard } from '../../hooks/useKeyboard';

const FLATLIST_CONTENT_CONTAINER: ViewStyle = {
  justifyContent: 'flex-start',
};
const FILTER_BACKGROUND: ViewStyle = {
  backgroundColor: '#405E7A',
};

export default function GalleryScreen({
  navigation,
  route,
}: RootStackScreenProps<'GalleryScreen'>) {
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
  const themeColors = useThemeColors();
  const queryClient = useQueryClient();
  const isKeyboardVisible = useKeyboard();
  const {
    imageWidth,
    setImageWidth,
    isSelecting,
    setIsSelecting,
    selectedItems,
    setIsSelected,
    clearSelectedItems,
    buildAutocompleteItems,
    autocompleteItems,
    filteredDocuments,
    filterDocuments,
  } = useGallery();
  const {
    isLoading: removeLoading,
    isSuccess: removeDocumentSuccess,
    mutate: removeDocument,
    isError: removeDocumentIsError,
    error: removeDocumentError,
    data: removeDocumentData,
  } = useRemoveDocument();

  const FLATLIST_CONTAINER: ViewStyle = {
    flex: 1,
    padding: '3%',
    backgroundColor: themeColors.background,
  };
  const AUTOCOMPLETE_CONTAINER: ViewStyle = {
    backgroundColor: '#405E7A',
    marginBottom: isKeyboardVisible ? 0 : '-1%',
    height: 57,
    justifyContent: 'center',
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
      'Necesitamos guardar el fichero en su dispositivo para poder compartirlo, pero ya existe un fichero con este nombre en su dispositivo, ¿quiere compartir el archivo existente o sobreescribir?:',
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
          onPress: () => Alert.alert('No se compartió el archivo'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => Alert.alert('No se compartió el archivo'),
      }
    );
  };
  const removeDocumentDialog = () => {
    const documentsToRemove = documents!.filter(
      (doc, idx) => selectedItems[idx]
    );
    console.log(documentsToRemove.map((doc) => doc.name).join('\n'));
    Alert.alert(
      'Borrar documento',
      `Va a borrar los siguientes documentos:
      ${documentsToRemove.map((doc) => doc.name).join('\n')}`,
      [
        {
          text: 'Aceptar',
          onPress: async () => {
            console.log('>>> removeDocumentDialog');
            if (selectedItems.length > 1) {
              console.log('>>> IF removeDocumentDialog');
              const removedDocuments: Array<IDocument> = [];
              let index;
              for (index = 0; index < documentsToRemove.length; index++) {
                await removeDocument(documentsToRemove[index]);
                if (removeDocumentIsError) {
                  Alert.alert(
                    'Error',
                    `El documento no fue borrado: ${removeDocumentError}`
                  );
                  break;
                } else {
                  removedDocuments.push();
                }
              }
              if (removedDocuments.length > 0) {
                Alert.alert(
                  'Documentos borrados',
                  `Documentos borrados: 
                  ${removedDocuments.map((doc) => doc.name).join('\n')}`
                );
                clearSelectedItems();
              }
            } else {
              console.log('>>> ELSE removeDocumentDialog');
              await removeDocument(documentsToRemove[0]);
              console.log('>>> removeDocumentIsError');
              console.log(removeDocumentIsError);
              if (removeDocumentIsError) {
                Alert.alert(
                  'Error',
                  `El documento no fue borrado: ${removeDocumentError}`
                );
              } else {
                clearSelectedItems();
                Alert.alert('El documento fue borrado');
              }
            }
          },
          style: 'default',
        },
        {
          text: 'Cancelar',
          onPress: () => Alert.alert('No se borró ningún documento'),
          style: 'cancel',
        },
      ]
    );
  };
  //#endregion

  //#region filter events
  const onFilterTextChangeHandler = (text: string) => {
    filterDocuments(documents!, text);
  };
  const onFilterSelectItemHandler = (item: TAutocompleteDropdownItem) => {
    console.log('onFilterSelectItemHandler');

    if (item) filterDocuments(documents!, item.id, true);
  };
  const onFilterClearHandler = () => {
    filterDocuments(documents!, '');
  };
  //#endregion
  //#region side menu events
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
  const sideMenuDeleteButtonOnPressHandler = async () => {
    if (documents && selectedItems.length > 0) {
      removeDocumentDialog();
    } else {
      //TODO: notification no documents or no documents selected
    }
  };
  //#endregion

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
      clearSelectedItems();
    }
  }, [isLoading, documents]);
  useEffect(() => {
    clearSelectedItems();
  }, []);

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
          contentStyle={FLATLIST_CONTENT_CONTAINER}
          numColumns={2}
        />
      )}
      <AutocompleteDropdown
        loading={isLoading}
        textInputProps={{
          placeholder: 'Filtro',
          style: FILTER_BACKGROUND,
        }}
        rightButtonsContainerStyle={FILTER_BACKGROUND}
        containerStyle={AUTOCOMPLETE_CONTAINER}
        dataSet={autocompleteItems}
        emptyResultText="No se encontraron resultados"
        ChevronIconComponent={<Icon icon={icons.chevronDown} />}
        onChangeText={onFilterTextChangeHandler}
        onSelectItem={onFilterSelectItemHandler}
        onClear={onFilterClearHandler}
      />
      <BottomTabs navigation={navigation} />
    </>
  );
}
