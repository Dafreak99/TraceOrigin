import { Flex, Box, Heading } from "@chakra-ui/react";
import { AiOutlineQrcode } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/router";

const Product = ({ images, name, _id }) => {
  return (
    <Flex
      justify="center"
      direction="column"
      gridColumn={{ base: "span 12", md: "span 6", xl: "span 3" }}
      cursor="pointer"
    >
      <a href={`/product/${_id}`} target="_blank">
        <Box height="300px" width="100%" position="relative">
          <Image
            src={images[0] ? images[0] : "/bg1.jpg"}
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

          <Heading fontSize="md" fontWeight="bold" fontSize="xl">
            {name}
          </Heading>
        </Flex>
      </a>
    </Flex>
  );
};

export default Product;
