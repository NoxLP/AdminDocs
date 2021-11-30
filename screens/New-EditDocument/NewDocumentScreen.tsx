import React, { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
  Image,
  ImageStyle,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ViewStyle,
  View,
  TextStyle,
} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content';
import Layout from '../../constants/Layout';
import Document from '../../models/Document';
import Form from '../../components/Form/Form';
import { Input } from '../../components/Input/Input';
import DocumentCategory from '../../models/DocumentCategory';
import { Picker } from '../../components/Picker/Picker';
import { PickerItemProps } from '../../components/Picker/PickerProps';
import { Button } from '../../components/Button/Button';
import useYupValidationResolver from '../../hooks/New-EditDocument/useYupValidationResolver';
import useUserNewDocument from '../../hooks/New-EditDocument/useUserNewDocument';
import { addDocument } from '../../services/api';
import { RootStackScreenProps } from '../../types';
import { useThemeColors } from '../../components/Themed';
import { BottomTabs } from '../../components/BottomTabs/BottomTabs';
import { FlatListCustom } from '../../components/FlatListCustom/FlatListCustom';
import useFormValidation, {
  FormFields,
} from '../../hooks/New-EditDocument/useFormValidation';
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
