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
} from "@chakra-ui/core";
import { HiUserCircle } from "react-icons/hi";

import Link from "next/link";
import { useEffect } from "react";

const Navbar = ({ float }) => {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (pageYOffset > 300) {
      } else if (pageYOffset < 300) {
      }
    });
  }, []);

  const Content = () => (
    <>
      <Box mr={16}>
        <Image src="/water.svg" height="40px" width="40px" />
      </Box>

      <Flex styleType="none" color="gray" fontWeight="bold">
        <Box mr={8}>
          <PseudoBox _hover={{ color: "gray.400" }} transition="300ms">
            <Link href="/dashboard">
              <a>Giới thiệu</a>
            </Link>
          </PseudoBox>
        </Box>
        <Box mr={8}>
          <PseudoBox _hover={{ color: "gray.400" }} transition="300ms">
            <Link href="/">
              <a>Sản phẩm</a>
            </Link>
          </PseudoBox>
        </Box>
        <Box mr={8}>
          <PseudoBox _hover={{ color: "gray.400" }} transition="300ms">
            <Link href="/">
              <a>Tin tức</a>
            </Link>
          </PseudoBox>
        </Box>
        <Box mr={8}>
          <PseudoBox _hover={{ color: "gray.400" }} transition="300ms">
            <Link href="/">
              <a>Liên hệ</a>
            </Link>
          </PseudoBox>
        </Box>
      </Flex>
      <Box ml={32}>
        <Input
          placeholder="Enter your key word"
          height="3rem"
          width="40rem"
          variant="filled"
        />
      </Box>

      <Box ml="auto">
        <HiUserCircle size="3.6rem" />
      </Box>
    </>
  );

  if (float) {
    return (
      <Flex
        backgroundColor="#fff"
        height="6rem"
        paddingX={16}
        align="center"
        // width="90vw"
      >
        {Content()}
      </Flex>
    );
  }

  return (
    <Flex
      backgroundColor="#fff"
      height="6rem"
      position="absolute"
      top="5%"
      left="5%"
      paddingX={16}
      align="center"
      width="90vw"
      zIndex="99"
    >
      {Content()}
    </Flex>
  );
};

export default Navbar;
