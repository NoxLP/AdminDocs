const primaryLight = '#CFE6FB';
const secondaryLight = '#81C0FA';
const successLight = '#58A13E';
const errorLight = '#ED6519';

const primaryDark = '#CFE6FB';
const secondaryDark = '#81C0FA';
const successDark = '#58A13E';
const errorDark = '#ED6519';

export default {
  light: {
    text: '#000',
    background: '#F2FAFF',
    tint: primaryLight,
    tabIconDefault: secondaryLight,
    tabIconSelected: primaryLight,
    anchorTextColor: 'white',
    input: {
      background: 'transparent',
      roundBackground: 'white',
      placeholderColor: 'lightgray',
      underlineColor: '#000',
      label: '#ACACAC',
      border: '#808080',
      disabledColor: '#999999',
    },
    button: {
      text: '#fff',
      success: successLight,
      error: errorLight,
    },
    checkbox: {
      checked: '#81C0FA',
      unchecked: 'white', //'#D4D4D4'
    },
    galleryFilterBackground: '#F0F0F0',
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: primaryDark,
    tabIconDefault: secondaryDark,
    tabIconSelected: primaryDark,
    anchorTextColor: 'blue',
    input: {
      background: 'transparent',
      roundBackground: 'white',
      placeholderColor: 'lightgray',
      underlineColor: '#fff',
      label: '#ACACAC',
      border: '#808080',
      disabledColor: '#999999',
    },
    button: {
      text: '#',
      success: successDark,
      error: errorDark,
    },
    checkbox: {
      checked: '#81C0FA',
      unchecked: 'white', //'#D4D4D4'
    },
    galleryFilterBackground: '#F0F0F0',
  },
};
