import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: "'Nunito', sans-serif",
    heading: "'Nunito', sans-serif",
    mono: "'Nunito', sans-serif",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  colors: {
    primary: {
      100: "#006aff",
    },
  },
});

export default theme;
