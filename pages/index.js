import { useState } from "react";
import dynamic from "next/dynamic";

import { Box } from "@chakra-ui/react";
import useSWR from "swr";
import Hero from "@/components/Hero";

import Products from "@/components/Products";
import NavbarDrawer from "@/components/NavbarDrawer";
import fetcher from "@/utils/fetcher";
import Chatbot from "@/components/Chatbot";
import Articles from "@/components/Articles";
import Features from "@/components/Features";

const Navbar = dynamic(() => import("@/components/Navbar"));
const Footer = dynamic(() => import("@/components/Footer"));

const IndexPage = () => {
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
        <Navbar showDrawer={showDrawer} float />
        <NavbarDrawer visible={visible} onClose={onClose} />
        <Hero />
      </Box>
      <Features />
      <Products />
      <Chatbot />
      <Articles data={posts} />
      <Footer />
    </>
  );
};

export default IndexPage;
