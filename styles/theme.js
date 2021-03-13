import { theme as chakraTheme } from "@chakra-ui/core";

const theme = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    body:
      // "Nunito, apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif",
      "'Nunito', sans-serif",
    heading: "'Nunito', sans-serif",
    mono: "'Nunito', sans-serif",
  },

  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
};

export default theme;
