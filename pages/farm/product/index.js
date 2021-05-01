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
import { FaTrash } from "react-icons/fa";
import { Popconfirm } from "antd";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Layout from "@/components/dashboard/Layout";
import { Table, Th, Td, Tr } from "@/components/Table";
import fetcher from "@/utils/fetcher";
import SkeletonTable from "@/components/dashboard/SkeletonTable";
import QRCode from "qrcode.react";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import AddPackingMethod from "@/components/dashboard/AddPackingMethod";

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

  useEffect(() => {
    if (data !== undefined) {
      setLoading(false);
    }
  }, [data]);

  const onDelete = async (id) => {
    try {
      await fetch("/api/product", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify({ id }),
      });

      mutate(
        [
          "/api/product/harvest",
          process.browser ? localStorage.getItem("token") : null,
        ],
        async (cachedData) => {
          console.log(cachedData);
          let data = cachedData.filter((each) => each._id !== id);
          return data;
        },
        false
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(data);

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
                    { name, isHarvested: { harvestProduct, status }, _id },
                    i
                  ) => (
                    <CSSTransition key={i} timeout={500} classNames="item">
                      <Tr cursor="pointer">
                        <Td>{i + 1}</Td>
                        <Td>{name}</Td>
                        <Td>{harvestProduct.harvestedDate}</Td>
                        <Td>{productStatus(status)}</Td>
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
