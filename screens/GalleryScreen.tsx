import React, { useEffect } from "react";
import { BottomTabs } from "../components/BottomTabs/BottomTabs";
import { FlatListCustom } from "../components/FlatListCustom/FlatListCustom";
import { Text, useThemeColors } from "../components/Themed";
import useUserDocuments from "../hooks/DocumentsGalleries/useUserDocuments";
import useCommunityDocuments from "../hooks/DocumentsGalleries/useCommunityDocuments";
import { RootStackScreenProps, GalleryType } from "../types";
import { Image, ScrollView } from "react-native";
import IDocument from "../models/Document";
import Layout from "../constants/Layout";
import { useQuery } from "react-query";

export default function GalleryScreen({
  navigation,
  route,
}: RootStackScreenProps<"GalleryScreen">) {
  const themeColors = useThemeColors();
  const { getDocuments, documents } = useUserDocuments();
  
  const renderItem = ({item}: {item: IDocument}) => {
    console.log(item.name);
    
    //console.log(`data:${item.contentType};base64,${item.data}`);
    return (
      <Image 
        source={{uri: `data:${item.contentType};base64,${item.data}`}} 
        style={{height: Layout.window.height, }}
      />
    )
  }

  useEffect(() => {
    async function docs() {
      await getDocuments();
    }
    docs();    
  }, [])

  return (
    <>
      { !documents ? 
        (<Text text="loading"/>) :
      <>
      <FlatListCustom 
        items={documents ? documents : []}
        renderItem={renderItem}
      />
      </>
      }
      <BottomTabs navigation={navigation}/>
    </>
  )
}