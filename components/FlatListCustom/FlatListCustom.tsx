import * as React from "react";
import { FlatList, ViewStyle } from "react-native";
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

export function FlatListCustom(props: FlatListCustomProps) {
  const { style, items, renderItem, horizontal, keyExtractor } = props;
  const themeColors = useThemeColors();
  const styles = { backgroundColor: themeColors.background, ...CONTAINER, style };
  const defaultKeyExtractor = (item: any, idx: number): string =>
    item.id ?? `${JSON.stringify(item)}.${idx}`;

  return (
    <FlatList
      style={styles}
      contentContainerStyle={CONTAINER_CONTENT}
      data={items}
      renderItem={renderItem}
      horizontal={horizontal}
      keyExtractor={keyExtractor ?? defaultKeyExtractor}
    />
  );
}
