import React from "react";
import { Button } from "../components/Button/Button";
import { FlatListCustom } from "../components/FlatListCustom/FlatListCustom";
import { icons } from "../components/Icon/icons";
import { useThemeColors } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { Image, ImageStyle, ViewStyle } from "react-native";

const BUTTON: ViewStyle = {
  backgroundColor: "transparent",
  height: 150,
};

const IMAGE: ImageStyle = {
  height: "70%",
  resizeMode: "contain",
};

const ITEMS: Array<any> = [
  {
    icon: icons.uploadDocumentCamera,
    text: "Foto",
  },
  {
    icon: icons.uploadDocumentGallery,
    text: "Galería",
  },
  {
    icon: icons.uploadDocumentFiles,
    text: "Ficheros",
  },
];

export default function UploadDocumentScreen({
  navigation,
}: RootStackScreenProps<"UploadDocument">) {
  const themeColors = useThemeColors();
  const buttonStyle = { color: themeColors.text, ...BUTTON };

  const renderItem = ({ item }) => {
    console.log("ITEM: ", item);
    return (
      <Button
        children={<Image source={item.icon} style={IMAGE} />}
        style={buttonStyle}
        text={item.text}
        preset="icon"
      />
    );
  };

  return <FlatListCustom items={ITEMS} renderItem={renderItem} />;
}
