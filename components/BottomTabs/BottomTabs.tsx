import React from 'react';
import { Image, ImageStyle, TextStyle, ViewStyle } from 'react-native';
import Layout from '../../constants/Layout';
import useLogout from '../../hooks/auth/useLogout';
import { GalleryType } from '../../types';
import { Button } from '../Button/Button';
import {
  FlatListCustom,
  IDefaultFlatListItem,
} from '../FlatListCustom/FlatListCustom';
import { icons } from '../Icon/icons/index';

const CONTAINER: ViewStyle = {
  height: Layout.window.height * 0.13,
  maxHeight: Layout.window.height * 0.13,
  backgroundColor: '#81C0FA',
  paddingHorizontal: '3%',
  paddingVertical: 0,
};
const BUTTON: ViewStyle = {
  backgroundColor: 'transparent',
  height: '100%',
  borderColor: 'transparent',
  borderRadius: 0,
  shadowColor: 'transparent',
  elevation: 0,
};
const BUTTON_TEXT: TextStyle = {
  fontSize: 18,
  color: 'white',
};
const IMAGE: ImageStyle = {
  height: '100%',
  resizeMode: 'contain',
};

export function BottomTabs({ navigation }) {
  const { mutate: logout } = useLogout();
  const TABS: Array<IDefaultFlatListItem> = [
    {
      icon: icons.bottomTabsUploadDoc,
      text: 'Subir doc',
      onPressItem: (navigation) => navigation.navigate('UploadDocument'),
    },
    {
      icon: icons.bottomTabsMyDocs,
      text: 'Mis docs',
      onPressItem: (navigation) => {
        navigation.navigate('GalleryScreen', {
          type: GalleryType.MyDocuments,
        });
      },
    },
    {
      icon: icons.bottomTabsCommunityDocs,
      text: 'Comunidad',
      onPressItem: (navigation) => {},
    },
    {
      icon: icons.bottomTabsLogout,
      text: 'Cerrar',
      onPressItem: (navigation) => {
        const syncLogout = async () => await logout();
        syncLogout();
      },
    },
  ];

  const renderItem = ({ item }: { item: IDefaultFlatListItem }) => (
    <Button
      children={<Image source={item.icon} style={IMAGE} />}
      style={BUTTON}
      textStyle={BUTTON_TEXT}
      text={item.text}
      preset="icon"
      onPress={(e) => item.onPressItem(navigation)}
    />
  );

  return (
    <FlatListCustom
      style={CONTAINER}
      items={TABS}
      renderItem={renderItem}
      numColumns={4}
    />
  );
}
