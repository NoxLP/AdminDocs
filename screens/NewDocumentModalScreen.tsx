import * as React from "react";
import { useForm } from "react-hook-form";
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
} from "react-native";
import Layout from "../constants/Layout";
import Document from "../models/Document";
import { useBetween } from "use-between";
import Form from "../components/Form/Form";
import Input from "../components/Input/Input";

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
  height: "35%",
  width: "90%",
  margin: "8%",
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
//#endregion

//#region constants
const VALIDATION = {};
//#endregion

export default function NewDocumentModalScreen({ navigation }) {
  const {
    document,
    setNewDocumentCommunity,
    setNewDocumentUser,
    setNewDocumentCategory,
    setNewDocumentName,
    setNewDocumentComments,
  } = useBetween(useUserNewDocument);
  console.log("doc: ", document);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Document>();

  const headerImage =
    document!.contentType === "application/json"
      ? require("../assets/images/pdf-file-thumbnail-placeholder.png")
      : { uri: document!.uri };
  console.log("IMAGE: ", headerImage);

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
          <Image source={headerImage} style={IMAGE} />
        </View>
        <Form register={register} setValue={setValue} errors={errors}>
          <Input
            placeholder="Nombre"
            value={document.name}
            onChangeText={setNewDocumentName}
          />
        </Form>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
