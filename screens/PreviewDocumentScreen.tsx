import React from 'react';
import { Image, ImageStyle, TextStyle, View, ViewStyle } from 'react-native';
import { BottomTabs } from '../components/BottomTabs/BottomTabs';
import { Button } from '../components/Button/Button';
import { FlatListCustom } from '../components/FlatListCustom/FlatListCustom';
import { Input } from '../components/Input/Input';
import { useThemeColors } from '../components/Themed';
import Layout from '../constants/Layout';
import Typography from '../constants/Typography';
import DocumentCategory from '../models/DocumentCategory';
import { RootStackScreenProps } from '../types';

const IMAGE: ImageStyle = {
  height: '100%',
  resizeMode: 'contain',
};
const IMAGE_CONTAINER: ViewStyle = {
  height: '33%',
  width: Layout.window.width,
  marginBottom: '3%',
  paddingVertical: '3%',
  alignContent: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  shadowColor: 'gray',
  shadowRadius: 5,
  shadowOpacity: 0.5,
  shadowOffset: {
    width: 5,
    height: 5,
  },
  elevation: 5,
};
const BUTTON = { width: '86%', marginVertical: '8%' };

export default function PreviewDocumentScreen({
  navigation,
  route,
}: RootStackScreenProps<'PreviewDocumentScreen'>) {
  const themeColors = useThemeColors();
  const CONTAINER: ViewStyle = {
    flex: 1,
    width: Layout.window.width,
    minHeight: Layout.window.height * 0.46,
    backgroundColor: themeColors.background,
  };
  const INPUT: TextStyle = {
    color: themeColors.input.disabledColor,
    marginBottom: '4%',
  };
  const TOP_TEXT_INPUT: TextStyle = {
    textAlignVertical: 'top',
  };

  const document = route.params.item;
  const onPressHandler = () => navigation.goBack();

  return (
    <>
      <View style={IMAGE_CONTAINER}>
        <Image
          source={{
            uri: `data:${document.contentType};base64,${document.data}`,
          }}
          style={IMAGE}
        />
      </View>
      <FlatListCustom
        style={CONTAINER}
        items={[
          <Input
            label="Fecha subida"
            inputStyle={INPUT}
            value={document.date.toLocaleDateString()}
            editable={false}
            preset="round"
          />,
          <Input
            label="Nombre"
            inputStyle={[INPUT, TOP_TEXT_INPUT]}
            value={document.name}
            editable={false}
            preset="round"
            numberOfLines={2}
            multiline
          />,
          <Input
            label="Usuario"
            inputStyle={INPUT}
            value={document.user}
            editable={false}
            preset="round"
          />,
          <Input
            label="Categoría"
            inputStyle={INPUT}
            value={DocumentCategory[document.category]}
            editable={false}
            preset="round"
          />,
          <Input
            label="Comentarios"
            inputStyle={[INPUT, TOP_TEXT_INPUT]}
            value={document.comments}
            editable={false}
            preset="round"
            numberOfLines={4}
            multiline
          />,
          <Button text="Aceptar" style={BUTTON} onPress={onPressHandler} />,
        ]}
        renderItem={({ item }) => item}
      />
      <BottomTabs navigation={navigation} />
    </>
  );
}
