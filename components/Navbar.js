import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  List,
  ListItem,
  Text,
  PseudoBox,
  Grid,
} from "@chakra-ui/core";
import { HiUserCircle } from "react-icons/hi";

import Link from "next/link";

const Navbar = ({ float }) => {
  const Content = () => (
    <>
      <Box gridColumn={{ base: "span 4", xl: "span 1" }} alignSelf="center">
        <Image src="/water.svg" height="40px" width="40px" />
      </Box>

      <Flex
        gridColumn="span 5"
        alignSelf="center"
        styleType="none"
        color="gray"
        fontWeight="bold"
        display={{ sx: "none", xl: "flex" }}
      >
        <Box mr="2rem">
          <PseudoBox _hover={{ color: "gray.400" }} transition="300ms">
            <Link href="/dashboard">
              <a>Giới thiệu</a>
            </Link>
          </PseudoBox>
        </Box>
        <Box mr="2rem">
          <PseudoBox _hover={{ color: "gray.400" }} transition="300ms">
            <Link href="/">
              <a>Sản phẩm</a>
            </Link>
          </PseudoBox>
        </Box>
        <Box mr="2rem">
          <PseudoBox _hover={{ color: "gray.400" }} transition="300ms">
            <Link href="/">
              <a>Tin tức</a>
            </Link>
          </PseudoBox>
        </Box>
        <Box mr="2rem">
          <PseudoBox _hover={{ color: "gray.400" }} transition="300ms">
            <Link href="/">
              <a>Liên hệ</a>
            </Link>
          </PseudoBox>
        </Box>
      </Flex>

      <Box gridColumn="span 4" alignSelf="center">
        <Input
          placeholder="Enter your key word"
          height="3rem"
          variant="filled"
        />
      </Box>

      <Box
        gridColumn={{ base: "span 4", xl: "span 1" }}
        alignSelf="center"
        justifySelf="flex-end"
      >
        <HiUserCircle size="3.6rem" />
      </Box>
    </>
  );

  if (float) {
    return (
      <Grid
        backgroundColor="#fff"
        height="6rem"
        paddingX={16}
        boxShadow="0 2px 3px rgba(0,0,0,.1)"
        gridTemplateColumns="repeat(12, 1fr)"
      >
        {Content()}
      </Grid>
    );
  }

  return (
    <Grid
      backgroundColor="#fff"
      height="6rem"
      position="absolute"
      top="5%"
      left="5%"
      paddingX={16}
      align="center"
      width="90vw"
      zIndex="99"
      gridTemplateColumns="repeat(12, 1fr)"
    >
      {Content()}
    </Grid>
  );
};

export default Navbar;
