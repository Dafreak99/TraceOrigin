import "../styles/globals.css";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import theme from "../styles/theme";
import { AuthProvider } from "../lib/auth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
