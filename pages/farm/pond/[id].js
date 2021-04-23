import { Flex, Heading } from "@chakra-ui/react";

import { useRouter } from "next/router";
import useSWR from "swr";
import { Tabs } from "antd";
import QRCode from "qrcode.react";

import Diary from "@/components/dashboard/Diary";
import BackButton from "@/components/dashboard/BackButton";
import Layout from "@/components/dashboard/Layout";
import PondInfo from "@/components/dashboard/PondInfo";
import fetcher from "@/utils/fetcher";
import Product from "@/components/dashboard/Product";

const { TabPane } = Tabs;

const Index = () => {
  const router = useRouter();
  const { data: product } = useSWR(
    router.query.id
      ? [
          `/api/product/${router.query.id}`,
          process.browser ? localStorage.getItem("token") : null,
        ]
      : null,
    fetcher,
    { refreshInterval: 1000 }
  );
  console.log(product);

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
          <Flex flexWrap="wrap-reverse">
            {data && <PondInfo pond={data} />}
            {product && <Product product={product} />}
          </Flex>
        </TabPane>
        <TabPane tab={<span>Ghi chép theo chuẩn VietGAP</span>} key="2">
          {data && <Diary pond={data} />}
        </TabPane>
      </Tabs>
    </Layout>
  );
};

export default Index;
