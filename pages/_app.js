import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "antd/dist/antd.min.css";
import "react-calendar/dist/Calendar.css";
import "react-lightbox-component/build/css/index.css";

import theme from "../styles/theme";

import "../styles/globals.css";

import { AuthProvider } from "../lib/AuthContext";

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
