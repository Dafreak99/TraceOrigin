import { Box, Flex, Image, Input, Grid } from "@chakra-ui/core";
import { HiUserCircle } from "react-icons/hi";
import { useRouter } from "next/router";

import Link from "next/link";
import { RiMenu2Fill } from "react-icons/ri";

const Navbar = ({ float, showDrawer }) => {
  const router = useRouter();

  const Content = () => (
    <>
      <Box
        as={RiMenu2Fill}
        onClick={showDrawer}
        position={{ base: "absolute", xl: "relative" }}
        top="50%"
        fontSize="25px"
        left="10px"
        transform="translateY(-50%)"
        display={{ xl: "none" }}
      ></Box>

      <Box
        gridColumn={{ base: "span 1", md: "span 4", xl: "span 1" }}
        alignSelf="center"
      >
        <Image
          src="/water.svg"
          minH="3rem"
          maxH="3rem"
          maxW="3rem"
          minW="3rem"
          onClick={() => router.push("/")}
        />
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
          <Link href="/">
            <a>Giới thiệu</a>
          </Link>
        </Box>
        <Box mr="2rem">
          <Link href="/product">
            <a>Sản phẩm</a>
          </Link>
        </Box>
        <Box mr="2rem">
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </Box>
        <Box mr="2rem">
          <Link href="/">
            <a>Liên hệ</a>
          </Link>
        </Box>
      </Flex>

      <Box
        gridColumn={{ base: "span 10", md: "span 4" }}
        alignSelf="center"
        mx={{ base: "1rem", md: 0 }}
      >
        <Input
          placeholder="Enter your key word"
          height="3rem"
          variant="filled"
        />
      </Box>

      <Box
        gridColumn={{ base: "span 1", md: "span 4", xl: "span 2" }}
        alignSelf="center"
        justifySelf="flex-end"
        cursor="pointer"
        onClick={() => router.push("/signin")}
      >
        <HiUserCircle size="3rem" />
      </Box>
    </>
  );

  if (float) {
    return (
      <Box boxShadow="0 2px 3px rgba(0,0,0,.1)" position="relative">
        <Grid
          backgroundColor="#fff"
          height="6rem"
          gridTemplateColumns="repeat(12, 1fr)"
          className="container"
        >
          {Content()}
        </Grid>
      </Box>
    );
  }

  return (
    <Box boxShadow="0 2px 3px rgba(0,0,0,.1)">
      <Grid
        px={16}
        backgroundColor="#fff"
        height="6rem"
        position="absolute"
        top="5%"
        left="5%"
        align="center"
        width="90vw"
        zIndex="99"
        gridTemplateColumns="repeat(12, 1fr)"
      >
        {Content()}
      </Grid>
    </Box>
  );
};

export default Navbar;
