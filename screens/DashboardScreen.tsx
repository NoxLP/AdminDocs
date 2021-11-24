import React from 'react';
import { Button } from '../components/Button/Button';
import { FlatListCustom } from '../components/FlatListCustom/FlatListCustom';
import { icons } from '../components/Icon/icons/index';
import { useThemeColors } from '../components/Themed';
import { IDefaultFlatListItem } from '../components/FlatListCustom/FlatListCustom';
import { BottomTabs } from '../components/BottomTabs/BottomTabs';
import { Image, ImageStyle, View, ViewStyle } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { GalleryType, RootStackScreenProps } from '../types';

const BUTTON: ViewStyle = {
  backgroundColor: 'white',
  height: 150,
  width: '90%',
  paddingVertical: '2%',
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#ABA7A7',
};

const IMAGE: ImageStyle = {
  height: '70%',
  resizeMode: 'contain',
};

//#region constants
const ITEMS_DASHBOARD: Array<IDefaultFlatListItem> = [
  {
    icon: icons.dashboardUploadDocs,
    text: 'Subir documento',
    onPressItem: (navigation) => navigation.navigate('UploadDocument'),
  },
  {
    icon: icons.dashboardMyDocs,
    text: 'Mis documentos',
    onPressItem: (navigation) =>
      navigation.navigate('GalleryScreen', { type: GalleryType.MyDocuments }),
  },
  {
    icon: icons.dashboardCommunityDocs,
    text: 'Documentos de mi comunidad',
    onPressItem: () => {},
  },
];
const ITEMS_UPLOAD_DOCUMENT: Array<IDefaultFlatListItem> = [
  {
    icon: icons.uploadDocumentCamera,
    text: 'Foto',
    onPressItem: (navigation) => {
      (async function () {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera permissions!');
          return null;
        }
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });

        if (!result.cancelled) {
          //setNewDocumentFile(result);
          console.log(JSON.stringify(result));
          navigation.navigate('NewDocumentScreen', {
            uri: result.uri,
          });
        }
      })();
    },
  },
  {
    icon: icons.uploadDocumentGallery,
    text: 'Galería',
    onPressItem: (navigation) => {
      (async function () {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera permissions!');
          return null;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });

        if (!result.cancelled) {
          //setNewDocumentFile(result);
          console.log(JSON.stringify(result));
          navigation.navigate('NewDocumentScreen', {
            uri: result.uri,
          });
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
    text: 'Ficheros',
    onPressItem: (navigation) => {
      (async function () {
        // TODO: Only pdf files right now. Later I need to include xls, word/txt, etc.
        const result = await DocumentPicker.getDocumentAsync({
          type: 'application/pdf',
        });
        console.log('RESULT: ' + JSON.stringify(result));

        if (result.type === 'success') {
          //setNewDocumentFile(result);
          navigation.navigate('NewDocumentScreen', {
            uri: result.uri,
            name: result.name,
          });
        }
      })();
    },
  },
];
//#endregion

const getRouteItems = (routeName: string) => {
  switch (routeName) {
    case 'Dashboard':
      return ITEMS_DASHBOARD;
    //case "UploadDocument":
    default:
      return ITEMS_UPLOAD_DOCUMENT;
  }
};

export default function DashboardScreen({
  navigation,
  route,
}: RootStackScreenProps<'Dashboard'>) {
  const themeColors = useThemeColors();

  const buttonStyle = { color: themeColors.text, ...BUTTON };
  const items = getRouteItems(route.name);

  const renderItem = ({ item }: { item: IDefaultFlatListItem }) => (
    <Button
      children={<Image source={item.icon} style={IMAGE} />}
      style={buttonStyle}
      text={item.text}
      preset="icon"
      onPress={(e) => item.onPressItem(navigation)}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatListCustom items={items} renderItem={renderItem} />
      <BottomTabs navigation={navigation} />
    </View>
  );
}
