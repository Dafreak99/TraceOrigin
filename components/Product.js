import { Text, Flex, Link as ChakraLink, Box } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineQrcode } from "react-icons/ai";
import Image from "next/image";

const Product = ({ images, name, _id }) => {
  return (
    <Flex
      justify="center"
      direction="column"
      gridColumn={{ base: "span 12", xl: "span 3" }}
    >
      <Link href={`/product/${_id}`}>
        <a>
          <Box height="300px" width="100%" position="relative">
            <Image
              src={images[0]}
              objectFit="cover"
              layout="fill"
              style={{ borderRadius: "5px" }}
            />
          </Box>

          <Flex align="center" mt={8}>
            <Box
              as={AiOutlineQrcode}
              height="40px"
              width="40px"
              marginRight="30px"
            />
            <Text color="gray.600" fontSize="md">
              {name}
            </Text>
          </Flex>
        </a>
      </Link>
    </Flex>
  );
};

export default Product;
