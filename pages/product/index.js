import { useState } from "react";
import Navbar from "@/components/Navbar";
import NavbarDrawer from "@/components/NavbarDrawer";
import { Box, Heading, Image } from "@chakra-ui/core";
import Products from "@/components/Products";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

const Product = () => {
  const { data, error } = useSWR("/api/product/finish", fetcher);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Navbar showDrawer={showDrawer} />
      <NavbarDrawer visible={visible} onClose={onClose} />
      <Box py="5rem">
        <Products data={data} />
      </Box>
    </>
  );
};

export default Product;
