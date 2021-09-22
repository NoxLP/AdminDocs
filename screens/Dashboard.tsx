import React from "react";
import { Button } from "../components/Button/Button";
import { FlatListCustom } from "../components/FlatListCustom/FlatListCustom";
import { RootStackScreenProps } from "../types";
import { Icon } from "../components/Icon/Icon";
import { icons, IconTypes } from "../components/Icon/icons/index";
import { Text, useThemeColors } from "../components/Themed";
import { View, ViewStyle } from "react-native";

const BUTTON: ViewStyle = {
  backgroundColor: "transparent",
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
  const buttonStyle = [{ color: themeColors.text }, BUTTON];

  const renderItem = (item: any) => {
    const content = (
      <View>
        <Icon icon={item.icon} />
        <Text text={item.text} />
      </View>
    );
    return <Button children={content} style={buttonStyle} />;
  };
  return <FlatListCustom items={ITEMS} renderItem={renderItem} />;
}
