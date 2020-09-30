import { Image, Text, Flex, Link as ChakraLink } from "@chakra-ui/core";
import Link from "next/link";

const Product = () => {
  return (
    <Flex justify="center" align="center" direction="column">
      <Link href="/product">
        <a style={{ textAlign: "center" }}>
          <Image src="/tomcangxanh.jpg" />
          <Text mt={8} color="gray.600">
            Tôm càng xanh
          </Text>
        </a>
      </Link>
    </Flex>
  );
};

export default Product;
