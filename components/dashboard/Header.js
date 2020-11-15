import { Flex, Text } from "@chakra-ui/core";
import Avatar from "antd/lib/avatar/avatar";
import { Header } from "antd/lib/layout/layout";
import { BellOutlined } from "@ant-design/icons";

const DashboardHeader = () => {
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
        <Flex justify="space-between" alignItems="center" px="2rem">
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
        </Flex>
      </Flex>
    </Header>
  );
};

export default DashboardHeader;
