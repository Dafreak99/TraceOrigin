import { Box, Flex, List, ListItem, Text } from "@chakra-ui/core";
import Avatar from "antd/lib/avatar/avatar";
import { Header } from "antd/lib/layout/layout";
import { BellOutlined } from "@ant-design/icons";
import OutsideAlerter from "./OutsideAlerter";
import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/router";

const DashboardHeader = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");

    router.push("/");
  };

  return (
    <Header
      style={{
        background: "#fff",
        padding: 0,
        textAlign: "right",
        boxShadow: "0 4px 10px rgb(32 96 193 / 10%)",
      }}
    >
      <Flex justify="flex-end" alignItems="center">
        <BellOutlined style={{ color: "grey", fontSize: "25px" }} />
        <OutsideAlerter action={() => setIsOpen(false)}>
          <Flex
            justify="space-between"
            alignItems="center"
            mx="2rem"
            position="relative"
            onClick={() => setIsOpen(!isOpen)}
            cursor="pointer"
          >
            <Text>
              Hi,{" "}
              <Text as="span" fontWeight="bold">
                HaiTran
              </Text>
            </Text>
            <Avatar
              style={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
                marginLeft: "10px",
              }}
            >
              U
            </Avatar>
            {isOpen && (
              <Box
                position="absolute"
                zIndex="99"
                top="100%"
                right="0"
                background="#fff"
                w="max-content"
                boxShadow="0 15px 30px rgb(70 126 228 / 10%)"
              >
                <List listStyleType="none">
                  <ListItem
                    padding="0 2rem"
                    fontWeight="medium"
                    cursor="pointer"
                    display="flex"
                    alignItems="center"
                    onClick={logout}
                  >
                    <Box
                      as={AiOutlineLogout}
                      color="#000"
                      h="24px"
                      w="24px"
                      mr="5px"
                    />{" "}
                    Đăng xuất
                  </ListItem>
                </List>
              </Box>
            )}
          </Flex>
        </OutsideAlerter>
      </Flex>
    </Header>
  );
};

export default DashboardHeader;
