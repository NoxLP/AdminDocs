const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    anchorTextColor: "blue",
    input: {
      background: "transparent",
      placeholderColor: "lightgray",
      underlineColor: "#000",
    },
    button: {
      text: "#fff",
      background: "hsl(120,77%,30%)",
    },
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    anchorTextColor: "blue",
    input: {
      background: "transparent",
      placeholderColor: "lightgray",
      underlineColor: "#fff",
    },
    button: {
      text: "#",
      background: "#",
    },
  },
};
