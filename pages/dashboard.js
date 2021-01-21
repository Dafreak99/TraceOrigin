import { Box, Flex } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Spin } from "antd";
const Dashboard = () => {
  const a = "farmer";
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      router.push("/");
    } else if (user.type === "qualitycontrol") {
      router.push("/qualitycontrol");
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
