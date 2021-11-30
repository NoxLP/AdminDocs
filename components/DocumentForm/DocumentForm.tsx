import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { TextStyle, View, ViewStyle } from 'react-native';
import useFormValidation from '../../hooks/New-EditDocument/useFormValidation';
import DocumentCategory from '../../models/DocumentCategory';
import { Button } from '../Button/Button';
import { FlatListCustom } from '../FlatListCustom/FlatListCustom';
import Form from '../Form/Form';
import { Input } from '../Input/Input';
import { Picker } from '../Picker/Picker';
import { PickerItemProps } from '../Picker/PickerProps';
import DocumentFormProps from './DocumentFormProps';

//#region styles
const CONTAINER: ViewStyle = {
  paddingTop: '5%',
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
const PICKER_CONTAINER: ViewStyle = {
  flex: 1,
  width: '88%',
  minWidth: '88%',
  paddingVertical: '1%',
  marginTop: '4%',
  marginLeft: '6%',
};
const COMMENTS_INPUT_CONTAINER: ViewStyle = {
  margin: '5%',
  marginTop: '11%',
  marginBottom: 0,
};
const SUBMIT_BUTTONS_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
  marginTop: '10%',
  marginBottom: '15%',
};
const SUBMIT_BUTTONS: ViewStyle = {
  width: '40%',
};
//#endregion

export default function DocumentForm(props: DocumentFormProps) {
  const { document, onSubmit, cancelButtonOnPress, options } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useFormValidation();

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

  // react-hook-form can't catch the default value
  useEffect(() => {
    if (options.type === 'newDoc') {
      //new document
      const { fileName, type } = options.getDocumentName(
        options.uri,
        options.name
      )!;
      options.setNewDocumentFile(options.uri, fileName, type);
      reset({
        name: fileName,
        comments: '',
        category: defaultCategory,
      });
    } else {
      // edit document
    }
  }, []);
  // react-hook-form errors
  useEffect(() => {
    console.log('ERRORS: ' + JSON.stringify(errors, null, 4));
  }, [errors]);

  return (
    <FlatListCustom
      style={CONTAINER}
      renderItem={({ item }) => item}
      items={[
        <Form register={register} setValue={setValue} errors={errors}>
          <Input
            label="Nombre*"
            style={[INPUT_CONTAINER, { marginTop: 0 }]}
            inputStyle={[INPUT, { marginTop: 0 }]}
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
        </Form>,
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
        </View>,
      ]}
    />
  );
}
