import { useState } from "react";
import { Box } from "@chakra-ui/core";
import useSWR from "swr";

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import NavbarDrawer from "@/components/NavbarDrawer";
import Footer from "@/components/Footer";
import fetcher from "@/utils/fetcher";
import Chatbot from "@/components/Chatbot";
import Articles from "@/components/Articles";
import Features from "@/components/Features";

const IndexPage = () => {
  const { data } = useSWR("/api/product/finish", fetcher);
  const { data: posts } = useSWR("/api/post", fetcher);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Box position="relative">
        <Navbar showDrawer={showDrawer} />
        <NavbarDrawer visible={visible} onClose={onClose} />
        <Hero />
      </Box>
      <Features />
      <Products data={data} />
      <Chatbot />
      <Articles data={posts} />
      <Footer />
    </>
  );
};

export default IndexPage;
