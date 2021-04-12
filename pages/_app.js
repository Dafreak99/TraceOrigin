import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "antd/dist/antd.min.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import theme from "../styles/theme";

import "../styles/globals.css";
import "../styles/animation.css";

import { AuthProvider } from "../lib/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>TraceOrigin</title>
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
