import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import IDocument from "../../models/Document";
import { RootStackParamList } from "../../types";

export default interface IGalleryItemProps {
  item: IDocument
  itemHeight: number
  index: number
  imageWidth: string
  setImageWidth: Function
  isSelecting: boolean
  setIsSelecting: Function
  selectedItems: boolean[]
  setIsSelected: (index: number) => void
  navigation: NativeStackNavigationProp<RootStackParamList, "GalleryScreen">
}