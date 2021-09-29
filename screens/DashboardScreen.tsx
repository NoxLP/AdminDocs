import React from "react";
import { Button } from "../components/Button/Button";
import { FlatListCustom } from "../components/FlatListCustom/FlatListCustom";
import { RootStackScreenProps } from "../types";
import { icons } from "../components/Icon/icons/index";
import { useThemeColors } from "../components/Themed";
import { Image, ImageStyle, ViewStyle } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import useUserNewDocument from "../hooks/useUserNewDocument";
import { useBetween } from "use-between";

const BUTTON: ViewStyle = {
  backgroundColor: "transparent",
  height: 150,
};

const IMAGE: ImageStyle = {
  height: "70%",
  resizeMode: "contain",
};

interface IDashboardItem {
  icon: any;
  text: string;
  onPressItem: (...args: any[]) => void;
}

//#region constants
const ITEMS_DASHBOARD: Array<IDashboardItem> = [
  {
    icon: icons.dashboardUploadDocs,
    text: "Subir documento",
    onPressItem: (navigation) => navigation.navigate("UploadDocument"),
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
const ITEMS_UPLOAD_DOCUMENT: Array<IDashboardItem> = [
  {
    icon: icons.uploadDocumentCamera,
    text: "Foto",
    onPressItem: (navigation, setNewDocumentFile) => {
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
          setNewDocumentFile(result);
          console.log(JSON.stringify(result));
          navigation.navigate("NewDocumentModal");
        }
      })();
    },
  },
  {
    icon: icons.uploadDocumentGallery,
    text: "Galería",
    onPressItem: (navigation, setNewDocumentFile) => {
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
          setNewDocumentFile(result);
          console.log(JSON.stringify(result));
          navigation.navigate("NewDocumentModal");
        }
      })();
    },
  },
  {
    /*
    TODO:
    Configuration
  > Managed workflow
  For iOS, outside of the Expo Go app, the DocumentPicker module requires the iCloud entitlement to work properly. You need to set the usesIcloudStorage key to true in your app.json file as specified here.
  In addition, you'll also need to enable the iCloud Application Service in your App identifier. This can be done in the detail of your App ID in the Apple developer interface.
  Enable iCloud service with CloudKit support, create one iCloud Container, and name it iCloud.<your_bundle_identifier>.
  And finally, to apply those changes, you'll need to revoke your existing provisioning profile and run expo build:ios -c
  > Bare workflow
  For iOS bare projects, the DocumentPicker module requires the iCloud entitlement to work properly. If your app doesn't have it already, you can add it by opening the project in Xcode and following these steps:
  In the project, go to the Capabilities tab
  Set the iCloud switch to on
  Check the iCloud Documents checkbox
    */
    icon: icons.uploadDocumentFiles,
    text: "Ficheros",
    onPressItem: (navigation, setNewDocumentFile) => {
      (async function () {
        // TODO: Only pdf files right now. Later I need to include xls, word/txt, etc.
        const result = await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
        });
        console.log("RESULT: " + JSON.stringify(result));

        if (result.type === "success") {
          setNewDocumentFile(result);
          navigation.navigate("NewDocumentModal");
        }
      })();
    },
  },
];
//#endregion

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
  const { document, setNewDocumentFile } = useBetween(useUserNewDocument);
  console.log("document: " + JSON.stringify(document, null, 4));

  const buttonStyle = { color: themeColors.text, ...BUTTON };
  const items = getRouteItems(route.name);

  const renderItem = ({ item }: { item: IDashboardItem }) => (
    <Button
      children={<Image source={item.icon} style={IMAGE} />}
      style={buttonStyle}
      text={item.text}
      preset="icon"
      onPress={(e) => item.onPressItem(navigation, setNewDocumentFile)}
    />
  );

  return <FlatListCustom items={items} renderItem={renderItem} />;
}
