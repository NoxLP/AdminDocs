import React, { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Image,
  ImageStyle,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ViewStyle,
  View,
  TextStyle,
} from "react-native";
import * as Yup from "yup";
import SkeletonContent from "react-native-skeleton-content";
import Layout from "../constants/Layout";
import Document from "../models/Document";
import Form from "../components/Form/Form";
import { Input } from "../components/Input/Input";
import DocumentCategory from "../models/DocumentCategory";
import { Picker } from "../components/Picker/Picker";
import { PickerItemProps } from "../components/Picker/PickerProps";
import { Button } from "../components/Button/Button";
import useYupValidationResolver from "../hooks/useYupValidationResolver";
import useUserNewDocument from "../hooks/useUserNewDocument";
import { addDocument } from "../services/api";
import { RootStackScreenProps } from "../types";

//#region styles
const CONTAINER: ViewStyle = {
  flex: 1,
};
const INNER_CONTENT: ViewStyle = {
  flex: 1,
  minHeight: Layout.window.height,
  width: Layout.window.width,
};
const CONTAINER_CONTENT: ViewStyle = {
  flex: 1,
  alignItems: "center",
};

const IMAGE_CONTAINER: ViewStyle = {
  height: "30%",
  width: "90%",
  marginHorizontal: "8%",
  marginTop: "4%",
  marginBottom: 0,
  padding: "2%",
  alignContent: "center",
  justifyContent: "center",
  backgroundColor: "white",
  shadowColor: "gray",
  shadowRadius: 5,
  shadowOpacity: 0.5,
  shadowOffset: {
    width: 5,
    height: 5,
  },
  elevation: 5,
  borderRadius: 8,
};
const IMAGE: ImageStyle = {
  height: "100%",
  width: "auto",
  resizeMode: "contain",
};
const INPUT: TextStyle = {
  maxWidth: "100%",
  minWidth: "100%",
  padding: "4%",
  textAlignVertical: "bottom",
};
const INPUT_CONTAINER: ViewStyle = {
  margin: "5%",
  marginBottom: 0,
};
const PICKER_CONTAINER: ViewStyle = {
  paddingVertical: "1%",
  marginTop: "7%",
};
const SUBMIT_BUTTONS_CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-around",
  width: "100%",
  marginTop: "9%",
};
const SUBMIT_BUTTONS: ViewStyle = {
  width: "40%",
};
//#endregion

export default function NewDocumentScreen({
  navigation,
  route,
}: RootStackScreenProps<"NewDocumentScreen">) {
  const { document, isDocumentLoading, setNewDocumentFile } =
    useUserNewDocument();

  // Errors messages must be set before schema
  Yup.setLocale({
    mixed: {
      oneOf: "Elija una categoría",
      required: "Campo obligatorio",
    },
    string: {
      max: "Máximo ${max} caracteres",
      required: "Campo obligatorio",
    },
  });
  // Validation
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    comments: Yup.string(),
    category: Yup.string().required(),
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
  } = useForm<Document>({ resolver: yupResolver });

  const documentImage =
    document!.contentType === "application/json"
      ? require("../assets/images/pdf-file-thumbnail-placeholder.png")
      : { uri: document!.uri };
  const categoryItems: PickerItemProps[] = Object.keys(DocumentCategory).map(
    (key) => ({
      key: DocumentCategory[key as keyof typeof DocumentCategory],
      value: key,
    })
  );
  const defaultCategory: PickerItemProps = {
    key: DocumentCategory.Others,
    value: "Others",
  };

  const onSubmit: SubmitHandler<Document> = async (data) => {
    console.log("SUBMIT: ", data);
    await addDocument(data);
  };
  const cancelButtonOnPress = () => {
    navigation.goBack();
  };

  // react-hook-form can't catch the default value
  useEffect(() => {
    console.log("RESET: " + JSON.stringify(document, null, 4));

    setNewDocumentFile(route.params.uri, route.params.name);
    reset(document);
  }, []);
  // react-hook-form errors
  useEffect(() => {
    console.log("ERRORS: " + JSON.stringify(errors, null, 4));
  }, [errors]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "position"}
      style={CONTAINER}
    >
      <ScrollView
        style={INNER_CONTENT}
        contentContainerStyle={CONTAINER_CONTENT}
      >
        <View style={IMAGE_CONTAINER}>
          {isDocumentLoading ? null : (
            <Image source={documentImage} style={IMAGE} />
          )}
        </View>
        <Form register={register} setValue={setValue} errors={errors}>
          <Input
            style={INPUT_CONTAINER}
            inputStyle={INPUT}
            name="name"
            defaultValue={document.name}
            placeholder="Nombre"
            multiline={true}
            numberOfLines={2}
          />
          <Input
            style={{ ...INPUT_CONTAINER, marginTop: "2%" }}
            inputStyle={{ ...INPUT, paddingTop: "2%" }}
            name="comments"
            defaultValue={document.comments}
            placeholder="Comentarios"
            multiline={true}
            numberOfLines={4}
          />
        </Form>
        <Controller
          control={control}
          name="category"
          defaultValue={defaultCategory}
          render={({ field: { onChange, value, onBlur } }) => (
            <Picker
              name="category"
              style={PICKER_CONTAINER}
              items={categoryItems}
              defaultValue={defaultCategory}
              selectedValue={value}
              onValueChange={onChange}
            />
          )}
        />
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
