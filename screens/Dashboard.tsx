import React from "react";
import { Button } from "../components/Button/Button";
import { FlatListCustom } from "../components/FlatListCustom/FlatListCustom";
import { RootStackScreenProps } from "../types";
import { icons } from "../components/Icon/icons/index";
import { useThemeColors } from "../components/Themed";
import { Image, ImageStyle, View, ViewStyle } from "react-native";
import { Icon } from "../components/Icon/Icon";

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
    icon: icons.dashboardUploadDocs,
    text: "Subir documento",
  },
  {
    icon: icons.dashboardMyDocs,
    text: "Mis documentos",
  },
  {
    icon: icons.dashboardCommunityDocs,
    text: "Documentos de mi comunidad",
  },
];

export default function Dashboard({
  navigation,
}: RootStackScreenProps<"Login">) {
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
