import React from "react";
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
  onPressItem: (
    navigation: NativeStackNavigationProp<
      RootStackParamList,
      keyof RootStackParamList
    >
  ) => void;
}
const ITEMS_DASHBOARD: Array<DashboardItem> = [
  {
    icon: icons.dashboardUploadDocs,
    text: "Subir documento",
    onPressItem: (navigation) => navigation.navigate("UploadDocument"),
  },
  {
    icon: icons.dashboardMyDocs,
    text: "Mis documentos",
    onPressItem: (navigation) => {},
  },
  {
    icon: icons.dashboardCommunityDocs,
    text: "Documentos de mi comunidad",
    onPressItem: (navigation) => {},
  },
];
const ITEMS_UPLOAD_DOCUMENT: Array<DashboardItem> = [
  {
    icon: icons.uploadDocumentCamera,
    text: "Foto",
    onPressItem: (navigation) => {},
  },
  {
    icon: icons.uploadDocumentGallery,
    text: "Galería",
    onPressItem: (navigation) => {},
  },
  {
    icon: icons.uploadDocumentFiles,
    text: "Ficheros",
    onPressItem: (navigation) => {},
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

  const [image, setImage] = useState(null);

  const takePhoto = async () => {
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
    }
  };

  const renderItem = ({ item }: { item: DashboardItem }) => {
    console.log("ITEM: ", item);
    return (
      <Button
        children={<Image source={item.icon} style={IMAGE} />}
        style={buttonStyle}
        text={item.text}
        preset="icon"
        onPress={(e) => item.onPressItem(navigation)}
      />
    );
  };

  return <FlatListCustom items={items} renderItem={renderItem} />;
}
