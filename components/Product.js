import { Image, Text, Flex, Link as ChakraLink, Box } from "@chakra-ui/core";
import Link from "next/link";
import { AiOutlineQrcode } from "react-icons/ai";

const Product = () => {
  return (
    <Flex
      justify="center"
      direction="column"
      gridColumn={{ base: "span 6", xl: "span 3" }}
    >
      <Link href="/product">
        <a>
          <Image src="/tomcangxanh.jpg" w="100%" />
          <Flex align="center" mt={8}>
            <Box
              as={AiOutlineQrcode}
              height="40px"
              width="40px"
              marginRight="30px"
            />
            <Text color="gray.600" fontSize="md">
              Tôm càng xanh
            </Text>
          </Flex>
        </a>
      </Link>
    </Flex>
  );
};

export default Product;
