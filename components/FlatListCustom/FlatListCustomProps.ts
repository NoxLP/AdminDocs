import { ListRenderItem, StyleProp, ViewStyle } from 'react-native';

export interface FlatListCustomProps {
  listKey?: string;
  items: Array<any>;
  renderItem: Function;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  keyExtractor?: (item: any, index: number) => string;
  horizontal?: boolean;
  numColumns?: number;
  [x: string]: any;
}
