import { Box, Flex, Image, Input, Text, List, ListItem } from "@chakra-ui/core";
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

    window.addEventListener("scroll", (e) => {
      console.log(window.pageYOffset);

      if (window.pageYOffset > 200) {
        document.querySelector(".navbar").classList.add("active");
      } else {
        document.querySelector(".navbar").classList.remove("active");
      }
    });
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
        <Link href="/">
          <a>
            <Image
              cursor="pointer"
              src="/water.svg"
              minH="3rem"
              maxH="3rem"
              maxW="3rem"
              minW="3rem"
            />
          </a>
        </Link>
      </Box>

      <Flex
        gridColumn="span 5"
        alignSelf="center"
        styleType="none"
        color="gray"
        fontWeight="bold"
        display={{ sx: "none", xl: "flex" }}
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
            <Text fontSize="1rem">{user.username}</Text>
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
                <ListItem p="20px 30px 20px 30px">
                  <Link href="/dashboard">
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
          <Text>Đăng nhập</Text>
        )}
      </Flex>
    </>
  );

  return (
    <div className={`navbar ${float && "float"}`}>
      <div className="container">{Content()}</div>
    </div>
  );
};

export default Navbar;
