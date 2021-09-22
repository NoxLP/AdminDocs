import { ListRenderItem, StyleProp, ViewStyle } from "react-native";

export interface FlatListCustomProps {
  items: Array<any>;
  renderItem: ListRenderItem<any>;
  style?: StyleProp<ViewStyle>;
  horizontal?: boolean;
  keyExtractor?: (item: any, index: number) => string;
}
