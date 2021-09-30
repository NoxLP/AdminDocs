const primaryLight = "#CFE6FB";
const secondaryLight = "#81C0FA";
const successLight = "#58A13E";
const errorLight = "#ED6519";

const primaryDark = "#CFE6FB";
const secondaryDark = "#81C0FA";
const successDark = "#58A13E";
const errorDark = "#ED6519";

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: primaryLight,
    tabIconDefault: secondaryLight,
    tabIconSelected: primaryLight,
    anchorTextColor: "blue",
    input: {
      background: "transparent",
      placeholderColor: "lightgray",
      underlineColor: "#000",
    },
    button: {
      text: "#fff",
      success: successLight,
      error: errorLight,
    },
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: primaryDark,
    tabIconDefault: secondaryDark,
    tabIconSelected: primaryDark,
    anchorTextColor: "blue",
    input: {
      background: "transparent",
      placeholderColor: "lightgray",
      underlineColor: "#fff",
    },
    button: {
      text: "#",
      success: successDark,
      error: errorDark,
    },
  },
};
