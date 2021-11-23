import React, { useEffect } from "react";
import { BottomTabs } from "../components/BottomTabs/BottomTabs";
import { FlatListCustom } from "../components/FlatListCustom/FlatListCustom";
import { Text, useThemeColors, View } from "../components/Themed";
import useUserDocuments from "../hooks/DocumentsGalleries/useUserDocuments";
import useCommunityDocuments from "../hooks/DocumentsGalleries/useCommunityDocuments";
import { RootStackScreenProps, GalleryType } from "../types";
import { Image, ImageStyle, ScrollView, ViewStyle } from "react-native";
import IDocument from "../models/Document";
import Layout from "../constants/Layout";

const CONTAINER: ViewStyle = {

}
const CONTAINER_CONTENT: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "space-around"
}
const IMAGE_CONTAINER: ViewStyle = {
  width: "50%",
  borderColor: "red",
  borderWidth: 5,
}
const IMAGE: ImageStyle = {
  height: "100%",
  width: "100%",
  resizeMode: "cover",
};

export default function GalleryScreen({
  navigation,
  route,
}: RootStackScreenProps<"GalleryScreen">) {
  const themeColors = useThemeColors();
  const { isLoading, error, isError, documents } = useUserDocuments();
  
  const renderItem = ({item}: {item: IDocument}) => {
    console.log(item.name);
    
    //console.log(`data:${item.contentType};base64,${item.data}`);
    return (
      <View
        style={IMAGE_CONTAINER}
      >
        <Image 
          source={{uri: `data:${item.contentType};base64,${item.data}`}} 
          style={IMAGE}
        />
      </View>
    )
  }

  // TODO: isloading and error ui
  return (
    <>
      { 
        isLoading ? 
          (<Text text="loading"/>) :
          (
            <>
            <Text text={documents.length}/>
            <FlatListCustom 
              items={documents ? documents : []}
              renderItem={renderItem}
              contentStyle={CONTAINER_CONTENT}
              numColumns={2}
            />
            </>
          )
      }
      <BottomTabs navigation={navigation}/>
    </>
  )
}