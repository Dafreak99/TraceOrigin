import { Text, Flex, Box } from "@chakra-ui/react";
import { AiOutlineQrcode } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const Product = ({ images, name, _id }) => {
  const router = useRouter();

  return (
    <Flex
      justify="center"
      direction="column"
      gridColumn={{ base: "span 6", xl: "span 3" }}
      cursor="pointer"
      onClick={() => router.push(`/product/${_id}`)}
    >
      {/* <Link href={`/product/${_id}`} passHref>
        <>
          <a href={`/product/${_id}`}> */}
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
      {/* </a>
        </>
      </Link> */}
    </Flex>
  );
};

export default Product;
