import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import { FlatList, ViewStyle } from "react-native";
import { RootStackParamList } from "../../types";
import { useThemeColors } from "../Themed";
import { FlatListCustomProps } from "./FlatListCustomProps";

const CONTAINER: ViewStyle = {
  height: "100%",
};
const CONTAINER_CONTENT: ViewStyle = {
  alignItems: "stretch",
  justifyContent: "space-around",
  flexGrow: 1,
};

export interface IDefaultFlatListItem {
  icon: any;
  text: string;
  onPressItem: (
    navigation: NativeStackNavigationProp<RootStackParamList, "Dashboard">
  ) => void;
}

export function FlatListCustom(props: FlatListCustomProps) {
  const { style, contentStyle, items, renderItem, keyExtractor, horizontal, numColumns } = props;
  const themeColors = useThemeColors();
  const styles = [{ backgroundColor: themeColors.background}, CONTAINER, style ]
  const contentStyles = [CONTAINER_CONTENT, contentStyle]
  const defaultKeyExtractor = (item: any, idx: number): string =>
    item.id ?? `${JSON.stringify(item)}.${idx}`;

  return (
    <FlatList
      style={styles}
      contentContainerStyle={contentStyles}
      data={items}
      renderItem={renderItem}
      horizontal={horizontal}
      keyExtractor={keyExtractor ?? defaultKeyExtractor}
      columnWrapperStyle={numColumns && numColumns > 0 ? {
        flex: 1,
        justifyContent: "space-between"
      } : null}
      numColumns={numColumns}
    />
  );
}
