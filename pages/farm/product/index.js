import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Button,
  Alert,
  AlertIcon,
  Badge,
  Text,
  Spinner,
} from "@chakra-ui/react";
import useSWR from "swr";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import Layout from "@/components/dashboard/Layout";
import { Table, Th, Td, Tr } from "@/components/Table";
import fetcher from "@/utils/fetcher";
import SkeletonTable from "@/components/dashboard/SkeletonTable";
import Link from "next/link";
import { deployToBlockchain, listOutputs, updateAsset } from "@/lib/bigchain";
import { message } from "antd";

const Product = () => {
  const [loading, setLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

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

  const reDeployToBlockchain = async () => {
    setIsClicked(true);
    const blockchainData = await listOutputs();

    if (blockchainData.length === 0) {
      const consumption = {
        address: "198 Xo Viet Nghe Tinh",
        coordinate: {
          latitude: 10.07361676432811,
          longitude: 105.63178483857067,
        },
        createdBy: "60a7abe531f28d2cd8fbc7f1",
        name: "Siêu thị CoopMart",
        phone: "0703034308",
        __v: 0,
        _id: "60a9101de1574425d8fcca35",
        datetime: new Date().toString(),
        type: "CONSUMPTIONLOCATION",
      };

      for (let product of fullProducts) {
        let transactionId = await deployToBlockchain(product);
        await updateAsset(transactionId, consumption);
      }
      message.success("Redeploy thành công !");
    } else {
      message.warn("Dữ liệu bị trùng !");
    }
    setIsClicked(false);
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
        <Heading mb={5}>
          Danh sách sản phẩm thu hoạch{" "}
          {isClicked ? (
            <Button backgroundColor="gray.400" color="#fff">
              <Spinner mr={4} /> Đang lưu
            </Button>
          ) : (
            <Button onClick={reDeployToBlockchain}>Redeploy</Button>
          )}
        </Heading>
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
