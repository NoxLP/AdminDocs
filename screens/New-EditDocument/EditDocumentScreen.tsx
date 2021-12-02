import React, { useEffect } from 'react';
import { Image, ImageStyle, ViewStyle, View, Alert } from 'react-native';
import Layout from '../../constants/Layout';
import useUserNewDocument from '../../hooks/Documents/useUserNewDocument';
import { RootStackScreenProps } from '../../types';
import { BottomTabs } from '../../components/BottomTabs/BottomTabs';
import { FormFields } from '../../hooks/Documents/useFormValidation';
import DocumentForm from '../../components/DocumentForm/DocumentForm';
import useEditDocument from '../../hooks/Documents/useEditDocument';
import { Text } from '../../components/Themed';

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

export default function EditDocumentScreen({
  navigation,
  route,
}: RootStackScreenProps<'EditDocumentScreen'>) {
  const { document, setDocument, mutation } = useEditDocument();

  const onSubmit = async (data: FormFields) => {
    console.log('SUBMIT: ', data);
    const response = await mutation.mutateAsync(data);

    // TODO: Notifications on success and error
    if (response.correct) navigation.goBack();
    else alert('EDIT INCORRECT');
  };
  const cancelButtonOnPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log(route.params.document);

    setDocument(route.params.document);
  }, []);

  return (
    <>
      {document ? (
        <>
          <View style={IMAGE_CONTAINER}>
            <Image
              source={{
                uri: `data:${document.contentType};base64,${document.data}`,
              }}
              style={IMAGE}
            />
          </View>
          <DocumentForm
            document={document}
            onSubmit={onSubmit}
            cancelButtonOnPress={cancelButtonOnPress}
            options={{ type: 'editDoc' }}
          />
        </>
      ) : (
        <Text text="Loading" />
      )}
      <BottomTabs navigation={navigation} />
    </>
  );
}
