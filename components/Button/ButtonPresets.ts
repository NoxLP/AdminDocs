import { TextStyle, ViewStyle } from "react-native";
import Typography from "../../constants/Typography";
import { useThemeColors } from "../Themed";

const themeColors = useThemeColors();

const CONTAINER: ViewStyle = {
  height: 60,
  width: "85%",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 10,
  backgroundColor: themeColors.button.success,
};
const TEXT: TextStyle = {
  fontFamily: Typography.fontFamily.primary,
  fontSize: Typography.fontSize.button,
  fontWeight: "700",
  color: themeColors.text,
};

export const buttonViewPresets = {
  success: CONTAINER,
  error: { ...CONTAINER, backgroundColor: themeColors.button.error },
  icon: { ...CONTAINER, backgroundColor: "transparent" },
};
export const buttonTextPresets = {
  success: TEXT,
  error: TEXT,
  icon: { ...TEXT, color: themeColors.background },
};

export type ButtonPresets = keyof typeof buttonViewPresets;
