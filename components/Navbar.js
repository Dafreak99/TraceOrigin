import {
  Box,
  Flex,
  Image,
  Input,
  Text,
  List,
  ListItem,
} from "@chakra-ui/react";
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
    // Get user from localStorage
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    window.addEventListener("scroll", (e) => {
      if (window.pageYOffset > 200) {
        document.querySelector(".navbar").classList.add("active");
      } else {
        document.querySelector(".navbar").classList.remove("active");
      }
    });
  }, []);

  const getDashboardRoute = () => {
    const { type } = user;

    const obj = {
      farm: "/farm",
      qualitycontrol: "/qualitycontrol/authentication",
      admin: "/admin",
      consumption: "/consumption-location",
    };

    return obj[type];
  };

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
      <Box alignSelf="center" mr={{ base: "0", md: "4rem" }}>
        <Link href="/">
          <a>
            <Image cursor="pointer" src="/water.svg" w="3rem" h="3rem" />
          </a>
        </Link>
      </Box>
      <Flex
        flex="1"
        alignSelf="center"
        styleType="none"
        color="gray"
        fontWeight="bold"
        display={{ base: "none", xl: "flex" }}
      >
        <Box
          mr="2rem"
          fontSize="1rem"
          color="#4e5256"
          fontFamily="'Nunito', sans-serif"
        >
          <Link href="/">
            <a>Giới thiệu</a>
          </Link>
        </Box>
        <Box
          mr="2rem"
          fontSize="1rem"
          color="#4e5256"
          fontFamily="'Nunito', sans-serif"
        >
          <Link href="/product">
            <a>Sản phẩm</a>
          </Link>
        </Box>
        <Box
          mr="2rem"
          fontSize="1rem"
          color="#4e5256"
          fontFamily="'Nunito', sans-serif"
        >
          <Link href="/post">
            <a>Bài viết</a>
          </Link>
        </Box>
        <Box
          mr="2rem"
          fontSize="1rem"
          color="#4e5256"
          fontFamily="'Nunito', sans-serif"
        >
          <Link href="/">
            <a>Liên hệ</a>
          </Link>
        </Box>
      </Flex>
      <Box alignSelf="center" mx={{ base: "1rem", md: "2rem" }}>
        <Input
          placeholder="Enter your key word"
          height="3rem"
          variant="filled"
          outline="none"
        />
      </Box>
      <Flex
        className="account"
        gridColumn={{ base: "span 2", md: "span 4", xl: "span 2" }}
        alignSelf="center"
        justifySelf="flex-end"
        align="center"
        flexDirection="row"
        cursor="pointer"
        fontWeight="bold"
        position="relative"
        onClick={() => (user ? null : router.push("/signin"))}
      >
        <Box
          as={HiUserCircle}
          height="3rem"
          width="3rem"
          color="gray.500"
          mr="0.5rem"
          marginLeft="auto"
        />
        {user ? (
          <>
            <Text fontSize="1rem" display={{ base: "none", md: "block" }}>
              {user.username}
            </Text>
            <Box
              display={{ base: "none", md: "block" }}
              as={IoMdArrowDropdown}
              size="1.5rem"
              color="#b8bfcb"
              mr={{ base: 0, md: "0.5rem" }}
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
                <ListItem p="20px 30px 20px 30px">
                  <Link href="/" href={getDashboardRoute()}>
                    <a>Dashboard</a>
                  </Link>
                </ListItem>
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
          <Text display={{ base: "none", md: "block" }}>Đăng nhập</Text>
        )}
      </Flex>
    </>
  );

  return (
    <Box className={float ? "navbar float" : "navbar"}>
      <Box className="container" flex>
        {Content()}
      </Box>
    </Box>
  );
};

export default Navbar;
