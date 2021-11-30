import { TextStyle, ViewStyle } from 'react-native';
import Typography from '../../constants/Typography';
import { useThemeColors } from '../Themed';

export default function useInputPresets() {
  const themeColors = useThemeColors();

  const INPUT: TextStyle = {
    alignSelf: 'center',
    fontSize: Typography.fontSize.primary,
    fontFamily: Typography.fontFamily.primary,
    color: themeColors.text,
    backgroundColor: 'transparent',
    minHeight: 44,
    width: '85%',
    minWidth: '85%',
    paddingHorizontal: '2%',
    borderRadius: 6,
  };
  const INPUT_ROUND: TextStyle = {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  };

  const LABEL: TextStyle = {
    marginLeft: '1%',
    color: themeColors.input.label,
  };
  const LABEL_ROUND: TextStyle = {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.previewDocumentInputLabel,
    marginLeft: '7%',
    marginBottom: '1%',
  };

  const inputPresets = {
    native: INPUT,
    round: [INPUT, INPUT_ROUND],
  };

  const labelPresets = {
    native: LABEL,
    round: [LABEL, LABEL_ROUND],
  };

  return { inputPresets, labelPresets };
}
