import { ChakraProvider, CSSReset } from "@chakra-ui/react";

import "antd/dist/antd.min.css";
import theme from "../styles/theme";

import "../styles/globals.css";
import "../styles/animation.css";

import dynamic from "next/dynamic";
import { useEffect } from "react";

const Head = dynamic(() => import("@/components/Head"), { ssr: false });

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
