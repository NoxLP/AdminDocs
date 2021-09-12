const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';
const placeholderColorLight = 'lightgray'
const placeholderColorDark = 'lightgray'

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    input: {
      background: 'transparent',
      placeholderColor: placeholderColorLight,
      underlineColor: '#000'
    }
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    input: {
      background: 'transparent',
      placeholderColor: placeholderColorDark,
      underlineColor: '#fff'
    }
  },
};
