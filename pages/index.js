import { Box } from "@chakra-ui/core";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import SectionPadding from "@/components/SectionPadding";

const IndexPage = () => {
  return (
    <>
      <Box position="relative">
        <Navbar float />
        <Hero />
      </Box>
      <SectionPadding>
        <Products />
      </SectionPadding>
    </>
  );
};

export default IndexPage;
