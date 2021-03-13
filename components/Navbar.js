import {
  Box,
  Flex,
  Image,
  Input,
  Grid,
  Text,
  List,
  ListItem,
} from "@chakra-ui/core";
import { HiUserCircle } from "react-icons/hi";
import { useRouter } from "next/router";

import Link from "next/link";
import { RiMenu2Fill } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect, useState } from "react";

const Navbar = ({ float, showDrawer }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

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

      <Flex
        className="account"
        gridColumn={{ base: "span 1", md: "span 4", xl: "span 2" }}
        alignSelf="center"
        justifySelf="flex-end"
        flexDirection="row"
        cursor="pointer"
        fontWeight="bold"
        position="relative"
        onClick={() => (user ? null : router.push("/signin"))}
      >
        <Box as={HiUserCircle} size="1.5rem" color="gray.600" mr="0.5rem" />
        {user ? (
          <>
            <Text>{user.username}</Text>
            <Box
              as={IoMdArrowDropdown}
              size="1.5rem"
              color="#b8bfcb"
              mr="0.5rem"
            />
            <Box
              className="dropdown"
              position="absolute"
              top="130%"
              background="#fff"
              right="0"
              boxShadow="0 15px 30px rgb(0 0 0 / 10%)"
              width="max-content"
              fontWeight="500"
            >
              <List>
                <ListItem p="20px 30px 20px 30px">Xem thông tin</ListItem>
                <ListItem
                  p="20px 30px 20px 30px"
                  color="red.500"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.localStorage.removeItem("token");
                    window.localStorage.removeItem("user");
                    setUser(null);
                  }}
                >
                  Đăng xuất
                </ListItem>
              </List>
            </Box>
          </>
        ) : (
          <Text>Đăng nhập</Text>
        )}
      </Flex>
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
