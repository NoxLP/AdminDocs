import * as React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import useUserNewDocument from "../hooks/useUserNewDocument";
import {
  Image,
  ImageStyle,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ViewStyle,
  Text,
  View,
  TextStyle,
} from "react-native";
import Layout from "../constants/Layout";
import Document from "../models/Document";
import { useBetween } from "use-between";
import Form from "../components/Form/Form";
import { Input } from "../components/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import DocumentCategory from "../models/DocumentCategory";
import { Picker } from "../components/Picker/Picker";
import { PickerItemProps } from "../components/Picker/PickerProps";
import { Button } from "../components/Button/Button";
import { useEffect } from "react";
import useYupValidationResolver from "../hooks/useYupValidationResolver";

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

export default function NewDocumentScreen({ navigation }) {
  const {
    document,
    setNewDocumentCategory,
    setNewDocumentName,
    setNewDocumentComments,
  } = useBetween(useUserNewDocument);
  //console.log("doc: ", document);

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
    category: Yup.mixed().oneOf(Object.keys(DocumentCategory)),
  });
  // Validation resolver
  const yupResolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
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

  const onSubmit: SubmitHandler<Document> = (data) => {
    console.log("SUBMIT: ", data);
  };

  // react-hook-form can't catch the default value
  useEffect(() => {
    console.log("RESET: " + JSON.stringify(document, null, 4));
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
          <Image source={documentImage} style={IMAGE} />
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
          <Picker
            name="category"
            style={PICKER_CONTAINER}
            items={categoryItems}
            defaultValue={defaultCategory}
          />
          <View style={SUBMIT_BUTTONS_CONTAINER}>
            <Button
              style={SUBMIT_BUTTONS}
              preset="success"
              text="Aceptar"
              onPress={handleSubmit(onSubmit)}
            />
            <Button style={SUBMIT_BUTTONS} preset="error" text="Cancelar" />
          </View>
        </Form>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
