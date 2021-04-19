import AddPondModal from "@/components/dashboard/AddPondModal";
import BackButton from "@/components/dashboard/BackButton";
import Layout from "@/components/dashboard/Layout";
import PondInfo from "@/components/dashboard/PondInfo";
import fetcher from "@/utils/fetcher";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Box, Flex, Heading, List, ListItem, Text } from "@chakra-ui/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useSWR from "swr";
import { Tabs } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Diary from "@/components/dashboard/Diary";

const { TabPane } = Tabs;

const Index = () => {
  const router = useRouter();

  const { data, error } = useSWR(
    router.query.id
      ? [
          `/api/pond/${router.query.id}`,
          process.browser ? localStorage.getItem("token") : null,
        ]
      : null,
    fetcher
  );

  return (
    <Layout>
      <Flex align="center" mb={5}>
        <BackButton />
        {data?.name && <Heading>Ao: {data.name}</Heading>}
      </Flex>
      <Tabs defaultActiveKey="1">
        <TabPane tab={<span>Thông tin ao</span>} key="1">
          {data && <PondInfo pond={data} />}
        </TabPane>
        <TabPane tab={<span>Ghi chép theo chuẩn VietGAP</span>} key="2">
          {/* {pond?.seed?.isRegistered === "true" && (
        <CSSTransition timeout={500} classNames="item">
          <Box
            background="#fff"
            gridColumn="span 6"
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
          >
          // Here
          </Box>
          </CSSTransition>
        )} */}
          {data && <Diary pond={data} />}
        </TabPane>
      </Tabs>
    </Layout>
  );
};

export default Index;
