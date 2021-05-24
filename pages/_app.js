import { ChakraProvider, CSSReset } from "@chakra-ui/react";

import "antd/dist/antd.min.css";
import theme from "../styles/theme";

import "../styles/globals.css";
import "../styles/animation.css";

import dynamic from "next/dynamic";

const Head = dynamic(() => import("@/components/Head"), { ssr: false });

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head />
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
