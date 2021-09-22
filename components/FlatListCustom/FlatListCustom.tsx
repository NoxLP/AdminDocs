import * as React from "react";
import { FlatList, ViewStyle } from "react-native";
import { FlatListCustomProps } from "./FlatListCustomProps";

const CONTAINER: ViewStyle = {
  flex: 1,
  height: "100%",
};

export function FlatListCustom(props: FlatListCustomProps) {
  const { style, items, renderItem, horizontal, keyExtractor } = props;
  const styles = [CONTAINER, style];
  const defaultKeyExtractor = (item: any, idx: number): string =>
    item.id ?? `${item.toString()}.${idx}`;

  return (
    <FlatList
      style={styles}
      data={items}
      renderItem={renderItem}
      horizontal={horizontal}
      keyExtractor={keyExtractor ?? defaultKeyExtractor}
    />
  );
}
