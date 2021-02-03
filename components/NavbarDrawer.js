import { Flex, Image, List, ListItem, Text } from "@chakra-ui/core";
import { Drawer, Button, Divider } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const NavbarDrawer = ({ visible, onClose }) => {
  const router = useRouter();

  return (
    <>
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Flex justify="center" alignItems="center">
          <Image
            src="/water.svg"
            minH="3rem"
            maxH="3rem"
            maxW="3rem"
            minW="3rem"
            mr={2}
            onClick={() => router.push("/")}
          />
          <Text
            color="#000"
            fontWeight="bold"
            fontSize="20px"
            // color="#2196f3"
            className="logo--name"
          >
            Trace Origin.
          </Text>
        </Flex>
        <Divider />
        <List spacing={4}>
          <ListItem>
            <Link href="/">
              <a> Giới thiệu</a>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/product">
              <a>Sản phẩm</a>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/dashboard">
              <a>Liên hệ</a>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default NavbarDrawer;
