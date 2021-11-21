import { ListRenderItem, StyleProp, ViewStyle } from "react-native";

export interface FlatListCustomProps {
  items: Array<any>;
  renderItem: ListRenderItem<any>;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  keyExtractor?: (item: any, index: number) => string;
  horizontal?: boolean;
  numColumns?: number;
}
