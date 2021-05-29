import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Image,
  Button,
  Alert,
  AlertIcon,
  Badge,
  Text,
} from "@chakra-ui/react";
import useSWR, { mutate } from "swr";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import Layout from "@/components/dashboard/Layout";
import { Table, Th, Td, Tr } from "@/components/Table";
import fetcher from "@/utils/fetcher";
import SkeletonTable from "@/components/dashboard/SkeletonTable";
import Link from "next/link";
import { deployToBlockchain } from "@/lib/bigchain";

const Product = () => {
  const [loading, setLoading] = useState(true);

  const { data, error } = useSWR(
    [
      "/api/product/harvest",
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher,
    { refreshInterval: 1000 }
  );

  const { data: fullProducts } = useSWR(
    [
      "/api/product/finish",
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher
  );

  useEffect(() => {
    if (data !== undefined) {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    timer();
  }, []);

  const timer = () => {
    let tDate = new Date();
    tDate.setHours(9);
    tDate.setMinutes(2);
    tDate.setSeconds(0);
    tDate.setMilliseconds(0);

    let tMillis = tDate - new Date();

    if (tMillis < 0) tMillis = tMillis + 24 * 60 * 60 * 1000; // if time is greater than 21:36:00:500 just add 24 hours as it will execute next day

    setTimeout(reDeployToBlockchain, tMillis);
  };

  const reDeployToBlockchain = async () => {
    for (let product of fullProducts) {
      await deployToBlockchain(product);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Box position="relative">
          <Heading mb={5}>Danh sách sản phẩm thu hoạch</Heading>
          <SkeletonTable />
        </Box>
      </Layout>
    );
  }

  const productStatus = (status) => {
    if (status === "false") {
      return (
        <Badge ml="1" fontSize="0.8em" background="#f8c3c3f0" color="#794444">
          Từ chối
        </Badge>
      );
    } else if (status === "true") {
      return (
        <Badge ml="1" fontSize="0.8em" background="#20f3b8" color="#fff">
          Được duyệt
        </Badge>
      );
    } else if (status === "pending") {
      return (
        <Badge ml="1" fontSize="0.8em" background="#d1d8e8" color="#646770">
          Chờ duyệt
        </Badge>
      );
    }
  };

  return (
    <Layout>
      <Box position="relative">
        <Heading mb={5}>Danh sách sản phẩm thu hoạch </Heading>
        {data && data.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>#</Th>
                <Th>Tên sản phẩm</Th>
                <Th>Ngày thu hoạch</Th>
                <Th>Duyệt thu hoạch</Th>
                <Th>{""}</Th>
              </Tr>
              <TransitionGroup component="tbody">
                {data.map(
                  (
                    {
                      name,
                      isHarvested: { harvestProduct, status },
                      pond,
                      _id,
                    },
                    i
                  ) => (
                    <CSSTransition key={i} timeout={500} classNames="item">
                      <Tr cursor="pointer">
                        <Td>{i + 1}</Td>
                        <Td>{name ? name : "Sản phẩm"}</Td>
                        <Td>
                          {status !== "false"
                            ? harvestProduct.harvestedDate
                            : "Rỗng"}
                        </Td>
                        <Td>{productStatus(status)}</Td>
                        <Td>
                          {status === "true" ? (
                            <Box
                              as="a"
                              target="_blank"
                              href={`/product/${_id}`}
                              textDecoration="underline"
                              fontWeight="bold"
                            >
                              Xem
                            </Box>
                          ) : (
                            <Link href={`./pond/${pond}`}>
                              <a
                                style={{
                                  fontWeight: "bold",
                                  textDecoration: "underline",
                                }}
                              >
                                Xem
                              </a>
                            </Link>
                          )}
                        </Td>
                      </Tr>
                    </CSSTransition>
                  )
                )}
              </TransitionGroup>
            </Table>
          </>
        ) : (
          <Alert status="info" fontSize="md" w="30rem">
            <AlertIcon />
            <Text fontSize="md">Chưa có sản phẩm đã thu hoạch</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default Product;
