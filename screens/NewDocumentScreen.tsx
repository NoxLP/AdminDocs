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
import * as Yup from 'yup';
import SkeletonContent from 'react-native-skeleton-content';
import Layout from '../constants/Layout';
import Document from '../models/Document';
import Form from '../components/Form/Form';
import { Input } from '../components/Input/Input';
import DocumentCategory from '../models/DocumentCategory';
import { Picker } from '../components/Picker/Picker';
import { PickerItemProps } from '../components/Picker/PickerProps';
import { Button } from '../components/Button/Button';
import useYupValidationResolver from '../hooks/useYupValidationResolver';
import useUserNewDocument from '../hooks/useUserNewDocument';
import { addDocument } from '../services/api';
import { RootStackScreenProps } from '../types';
import { useThemeColors } from '../components/Themed';
import { BottomTabs } from '../components/BottomTabs/BottomTabs';

//#region styles
const SCROLL_CONTAINER: ViewStyle = {
  flex: 1,
  width: Layout.window.width,
  minHeight: Layout.window.height * 0.46,
};
const INNER_CONTENT: ViewStyle = {
  flex: 1,
  height: Layout.window.height * 0.64,
  minHeight: Layout.window.height,
};
const CONTAINER_CONTENT: ViewStyle = {
  flex: 1,
  alignItems: 'center',
};
const IMAGE_CONTAINER: ViewStyle = {
  height: '33%',
  width: Layout.window.width,
  marginBottom: '3%',
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
const INPUT: TextStyle = {
  maxWidth: '100%',
  minWidth: '100%',
  paddingBottom: '4%',
  paddingTop: 0,
  textAlignVertical: 'bottom',
};
const INPUT_CONTAINER: ViewStyle = {
  margin: '5%',
  marginBottom: '2%',
};
const COMMENTS_INPUT_CONTAINER: ViewStyle = {
  margin: '5%',
  marginTop: '11%',
  marginBottom: 0,
};
const PICKER_CONTAINER: ViewStyle = {
  paddingVertical: '1%',
  marginTop: '4%',
};
const SUBMIT_BUTTONS_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
  marginTop: '6%',
};
const SUBMIT_BUTTONS: ViewStyle = {
  width: '40%',
};
//#endregion

type FormFields = {
  name: string;
  comments: string;
  category: string;
};

export default function NewDocumentScreen({
  navigation,
  route,
}: RootStackScreenProps<'NewDocumentScreen'>) {
  const themeColors = useThemeColors();
  const innerContainerStylesOverride = {
    ...INNER_CONTENT,
    backgroundColor: themeColors.background,
  };

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

  // Errors messages must be set before schema
  Yup.setLocale({
    mixed: {
      oneOf: 'Elija una categoría',
      required: 'Campo obligatorio',
    },
    string: {
      max: 'Máximo ${max} caracteres',
      required: 'Campo obligatorio',
    },
  });
  // Validation
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    comments: Yup.string(),
    category: Yup.mixed<PickerItemProps>().required(),
  });
  // Validation resolver
  const yupResolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<FormFields>({
    resolver: yupResolver,
  });

  const documentImage =
    document!.contentType === 'application/json'
      ? require('../assets/images/pdf-file-thumbnail-placeholder.png')
      : { uri: document!.uri };
  const categoryItems: PickerItemProps[] = Object.keys(DocumentCategory).map(
    (key) => ({
      key: DocumentCategory[key as keyof typeof DocumentCategory],
      value: key,
    })
  );
  const defaultCategory: PickerItemProps = {
    key: DocumentCategory.Others,
    value: 'Others',
  };

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
  // react-hook-form can't catch the default value
  useEffect(() => {
    const { fileName, type } = getDocumentName(
      route.params.uri,
      route.params.name
    )!;
    setNewDocumentFile(route.params.uri, fileName, type);
    console.log('RESET: ' + JSON.stringify(document, null, 4));
    console.log('RESET: ' + JSON.stringify(route, null, 4));
    reset({
      name: fileName,
      comments: '',
      category: defaultCategory,
    });
    /*setValue("name", route.params.name, {
      shouldValidate: true,
      shouldDirty: false,
    });*/
  }, []);
  // react-hook-form errors
  useEffect(() => {
    console.log('ERRORS: ' + JSON.stringify(errors, null, 4));
  }, [errors]);
  //#endregion

  return (
    <>
      <View style={IMAGE_CONTAINER}>
        {isDocumentLoading ? null : (
          <Image source={documentImage} style={IMAGE} />
        )}
      </View>
      <ScrollView style={SCROLL_CONTAINER}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'position'}
          style={innerContainerStylesOverride}
          contentContainerStyle={CONTAINER_CONTENT}
        >
          <Form register={register} setValue={setValue} errors={errors}>
            <Input
              label="Nombre*"
              style={INPUT_CONTAINER}
              inputStyle={INPUT}
              name="name"
              defaultValue={document.name}
              placeholder="Nombre"
              multiline={true}
              numberOfLines={2}
            />
            <Controller
              control={control}
              name="category"
              defaultValue={defaultCategory}
              render={({ field: { onChange, value, onBlur } }) => (
                <Picker
                  label="Categoría*"
                  name="category"
                  style={PICKER_CONTAINER}
                  items={categoryItems}
                  defaultValue={defaultCategory}
                  selectedValue={value}
                  onValueChange={onChange}
                />
              )}
            />
            <Input
              label="Comentarios"
              style={COMMENTS_INPUT_CONTAINER}
              inputStyle={INPUT}
              name="comments"
              defaultValue={document.comments}
              placeholder="Comentarios"
              multiline={true}
              numberOfLines={4}
            />
          </Form>
          <View style={SUBMIT_BUTTONS_CONTAINER}>
            <Button
              style={SUBMIT_BUTTONS}
              preset="success"
              text="Aceptar"
              onPress={handleSubmit(onSubmit)}
            />
            <Button
              style={SUBMIT_BUTTONS}
              preset="error"
              text="Cancelar"
              onPress={cancelButtonOnPress}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <BottomTabs navigation={navigation} />
    </>
  );
}
