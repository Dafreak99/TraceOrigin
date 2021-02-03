import { Image, Text, Flex, Link as ChakraLink, Box } from "@chakra-ui/core";
import Link from "next/link";
import { AiOutlineQrcode } from "react-icons/ai";

const Product = ({ hinhAnh, tenSanPham, _id }) => {
  return (
    <Flex
      justify="center"
      direction="column"
      gridColumn={{ base: "span 12", xl: "span 3" }}
    >
      <Link href={`/product/${_id}`}>
        <a>
          <Image
            src={hinhAnh[0]}
            w="100%"
            objectFit="cover"
            height="300px"
            borderRadius="3px"
          />
          <Flex align="center" mt={8}>
            <Box
              as={AiOutlineQrcode}
              height="40px"
              width="40px"
              marginRight="30px"
            />
            <Text color="gray.600" fontSize="md">
              {tenSanPham}
            </Text>
          </Flex>
        </a>
      </Link>
    </Flex>
  );
};

export default Product;
