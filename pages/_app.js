import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.css";
import "react-day-picker/lib/style.css";
import "antd/dist/antd.min.css";

import theme from "../styles/theme";
import { AuthProvider } from "../lib/AuthContext";
import head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CSSReset />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
