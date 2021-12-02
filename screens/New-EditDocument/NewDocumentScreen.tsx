import React, { useEffect } from 'react';
import { Image, ImageStyle, ViewStyle, View } from 'react-native';
import Layout from '../../constants/Layout';
import useUserNewDocument from '../../hooks/Documents/useUserNewDocument';
import { RootStackScreenProps } from '../../types';
import { BottomTabs } from '../../components/BottomTabs/BottomTabs';
import { FormFields } from '../../hooks/Documents/useFormValidation';
import DocumentForm from '../../components/DocumentForm/DocumentForm';

const IMAGE_CONTAINER: ViewStyle = {
  height: '30%',
  width: Layout.window.width,
  paddingVertical: '3%',
  alignContent: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  shadowColor: 'gray',
  shadowRadius: 5,
  shadowOpacity: 0.5,
  shadowOffset: {
    width: 5,
    height: 5,
  },
  elevation: 5,
};
const IMAGE: ImageStyle = {
  height: '100%',
  width: 'auto',
  resizeMode: 'contain',
};

export default function NewDocumentScreen({
  navigation,
  route,
}: RootStackScreenProps<'NewDocumentScreen'>) {
  //#region rest
  const {
    document,
    isDocumentLoading,
    getDocumentName,
    setNewDocumentFile,
    fillDocumentForm,
    saveDocument,
    isDocumentFilled,
  } = useUserNewDocument();

  const documentImage =
    document!.contentType === 'application/json'
      ? require('../../assets/images/pdf-file-thumbnail-placeholder.png')
      : { uri: document!.uri };

  const onSubmit = async (data: FormFields) => {
    console.log('SUBMIT: ', data);
    fillDocumentForm(data);
  };
  const cancelButtonOnPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (!isDocumentFilled) return;
    (async function save() {
      await saveDocument();

      navigation.goBack();
    })();
  }, [document]);
  //#endregion

  return (
    <>
      <View style={IMAGE_CONTAINER}>
        {isDocumentLoading ? null : (
          <Image source={documentImage} style={IMAGE} />
        )}
      </View>
      <DocumentForm
        document={document}
        onSubmit={onSubmit}
        cancelButtonOnPress={cancelButtonOnPress}
        options={{
          type: 'newDoc',
          fillDocumentForm,
          getDocumentName,
          setNewDocumentFile,
          uri: route.params.uri,
          name: route.params.name,
        }}
      />
      <BottomTabs navigation={navigation} />
    </>
  );
}
