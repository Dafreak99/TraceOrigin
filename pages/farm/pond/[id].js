import {
  Alert,
  AlertIcon,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Grid,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import useSWR from "swr";
import { Tabs } from "antd";

import Diary from "@/components/dashboard/Diary";
import BackButton from "@/components/dashboard/BackButton";
import Layout from "@/components/dashboard/Layout";
import PondInfo from "@/components/dashboard/PondInfo";
import fetcher from "@/utils/fetcher";
import Product from "@/components/dashboard/Product";
import Link from "next/link";

const { TabPane } = Tabs;

const Index = () => {
  const router = useRouter();

  const { data: product } = useSWR(
    router.query.id
      ? [
          `/api/pond/${router.query.id}/product`,
          process.browser ? localStorage.getItem("token") : null,
        ]
      : null,
    fetcher,
    { refreshInterval: 1000 }
  );

  const { data, error } = useSWR(
    router.query.id
      ? [
          `/api/pond/${router.query.id}`,
          process.browser ? localStorage.getItem("token") : null,
        ]
      : null,
    fetcher,
    { refreshInterval: 1000 }
  );

  return (
    <Layout>
      <Flex align="center" mb={5}>
        <BackButton />
        {data?.name ? (
          <Heading>Ao: {data.name}</Heading>
        ) : (
          <Skeleton height="20px" width="200px" />
        )}
      </Flex>
      <Tabs defaultActiveKey="1">
        <TabPane tab={<span>Thông tin ao</span>} key="1" mb="2rem">
          <Flex flexWrap="wrap">
            {data ? (
              <PondInfo pond={data} />
            ) : (
              <Stack width="500px">
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
              </Stack>
            )}
            <>
              {product &&
                (product.isHarvested === "pending" ? (
                  <Alert
                    status="success"
                    w="max-content"
                    h="min-content"
                    mb={{ base: "1.5rem", lg: 0 }}
                    fontSize="lg"
                  >
                    <AlertIcon />
                    Ao đang được theo dõi thu hoạch.{" "}
                    <Link href="/farm/product">
                      <a
                        style={{
                          marginLeft: "5px",
                          textDecoration: "underline",
                        }}
                      >
                        Xem sản phẩm
                      </a>
                    </Link>
                  </Alert>
                ) : (
                  <Product product={product} />
                ))}
            </>
          </Flex>
        </TabPane>
        {/* Hide the VietGAP diary tab when the product of this pond pending to be harvested */}
        {product?.isHarvested?.status !== "pending" && (
          <TabPane tab={<span>Ghi chép theo chuẩn VietGAP</span>} key="2">
            {data && <Diary pond={data} />}
          </TabPane>
        )}
      </Tabs>
    </Layout>
  );
};

export default Index;
