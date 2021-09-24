import React, { useState } from "react";
import { Button } from "../components/Button/Button";
import { FlatListCustom } from "../components/FlatListCustom/FlatListCustom";
import { RootStackParamList, RootStackScreenProps } from "../types";
import { icons } from "../components/Icon/icons/index";
import { useThemeColors } from "../components/Themed";
import { Image, ImageStyle, ViewStyle } from "react-native";
import { useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";

const BUTTON: ViewStyle = {
  backgroundColor: "transparent",
  height: 150,
};

const IMAGE: ImageStyle = {
  height: "70%",
  resizeMode: "contain",
};

interface DashboardItem {
  icon: any;
  text: string;
  onPressItem: (...args: any[]) => void;
}
const ITEMS_DASHBOARD: Array<DashboardItem> = [
  {
    icon: icons.dashboardUploadDocs,
    text: "Subir documento",
    onPressItem: (navigation, setImage) =>
      navigation.navigate("UploadDocument"),
  },
  {
    icon: icons.dashboardMyDocs,
    text: "Mis documentos",
    onPressItem: () => {},
  },
  {
    icon: icons.dashboardCommunityDocs,
    text: "Documentos de mi comunidad",
    onPressItem: () => {},
  },
];
const ITEMS_UPLOAD_DOCUMENT: Array<DashboardItem> = [
  {
    icon: icons.uploadDocumentCamera,
    text: "Foto",
    onPressItem: (navigation, setImage) => {
      (async function () {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions!");
          return null;
        }
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });

        if (!result.cancelled) {
          setImage(result.uri);
          console.log(JSON.stringify(result));
        }
      })();
    },
  },
  {
    icon: icons.uploadDocumentGallery,
    text: "Galería",
    onPressItem: (navigation, setImage) => {
      (async function () {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions!");
          return null;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });

        if (!result.cancelled) {
          setImage(result.uri);
          console.log(JSON.stringify(result));
        }
      })();
    },
  },
  {
    icon: icons.uploadDocumentFiles,
    text: "Ficheros",
    onPressItem: () => {},
  },
];

const getRouteItems = (routeName: string) => {
  switch (routeName) {
    case "Dashboard":
      return ITEMS_DASHBOARD;
    //case "UploadDocument":
    default:
      return ITEMS_UPLOAD_DOCUMENT;
  }
};

export default function DashboardScreen({
  navigation,
}: RootStackScreenProps<"Dashboard">) {
  const themeColors = useThemeColors();
  const route = useRoute();

  const buttonStyle = { color: themeColors.text, ...BUTTON };
  const items = getRouteItems(route.name);

  const [image, setImage] = useState<string | null>(null);

  const renderItem = ({ item }: { item: DashboardItem }) => {
    console.log("ITEM: ", item);
    return (
      <Button
        children={<Image source={item.icon} style={IMAGE} />}
        style={buttonStyle}
        text={item.text}
        preset="icon"
        onPress={(e) => item.onPressItem(navigation, setImage)}
      />
    );
  };

  return <FlatListCustom items={items} renderItem={renderItem} />;
}
