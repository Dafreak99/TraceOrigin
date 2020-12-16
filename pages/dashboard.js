import { Box, Flex } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Spin } from "antd";
const Dashboard = () => {
  const a = "farmer";
  const router = useRouter();

  useEffect(() => {
    if (a === "business") {
      router.push("/business");
    } else {
      router.push("/farm");
    }
  }, []);

  return (
    <Flex h="100vh" w="100vw" justify="center" align="center">
      <Spin size="large" />
    </Flex>
  );
};
export default Dashboard;
