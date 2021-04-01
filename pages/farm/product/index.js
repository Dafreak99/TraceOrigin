import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Alert,
  AlertIcon,
  Badge,
  Text,
} from "@chakra-ui/core";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";
import { Pagination, Popconfirm } from "antd";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Layout from "@/components/dashboard/Layout";
import { Table, Th, Td, Tr } from "@/components/Table";
import fetcher from "@/utils/fetcher";
import SkeletonTable from "@/components/dashboard/SkeletonTable";
import { format } from "date-fns";
import QRCode from "qrcode.react";

const Product = () => {
  const router = useRouter();
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

  if (loading) {
    return (
      <Layout>
        <Box px={16} py={12} position="relative">
          <Heading mt={10} mb={5}>
            Danh sách sản phẩm đã thu hoạch
          </Heading>
          <SkeletonTable />
        </Box>
      </Layout>
    );
  }

  const productStatus = (isRegistered) => {
    if (isRegistered === "false") {
      return (
        <Badge
          ml="1"
          fontSize="0.8em"
          background="#f8c3c3f0"
          color="#794444"
          borderRadius="10px"
          padding="10px"
        >
          No
        </Badge>
      );
    } else if (isRegistered === "true") {
      return (
        <Badge
          ml="1"
          fontSize="0.8em"
          background="#20f3b8"
          color="#fff"
          borderRadius="10px"
          padding="10px"
        >
          Yes
        </Badge>
      );
    } else if (isRegistered === "pending") {
      return (
        <Badge
          ml="1"
          fontSize="0.8em"
          background="#d1d8e8"
          color="#646770"
          borderRadius="10px"
          padding="10px"
        >
          Pending
        </Badge>
      );
    }
  };

  return (
    <Layout>
      <Box px={16} py={12} position="relative">
        <Heading mt={10} mb={5}>
          Danh sách sản phẩm đã thu hoạch
        </Heading>
        {data && data.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>Tên sản phẩm</Th>
                <Th>Hình ảnh</Th>
                <Th>Ngày thu hoạch</Th>
                <Th>Mã QR</Th>
                <Th>QR</Th>
                <Th>Duyệt thu hoạch</Th>
                <Th>{""}</Th>
                <Th>{""}</Th>
              </Tr>
              <TransitionGroup component="tbody">
                {data.map(
                  (
                    { name, isHarvested, harvestedDate, qrCode, images, _id },
                    i
                  ) => (
                    <CSSTransition key={i} timeout={500} classNames="item">
                      <Tr
                        backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                        cursor="pointer"
                        onClick={() => router.push(`./food/${_id}`)}
                      >
                        <Td>{name}</Td>
                        <Td>
                          <Image src={images[0]} height="100px" width="auto" />
                        </Td>
                        <Td>{harvestedDate}</Td>
                        <Td>{qrCode}</Td>
                        <Td>
                          {" "}
                          <QRCode
                            value={
                              "http://traceorigin.vercel.app/product/" + qrCode
                            }
                          />
                        </Td>
                        <Td>{productStatus(isHarvested)}</Td>

                        <Td
                          borderLeft="1px solid #e8eef3"
                          px={8}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          {isHarvested === "true" && (
                            <Button>Thêm đóng gói</Button>
                          )}
                        </Td>

                        <Td
                          borderLeft="1px solid #e8eef3"
                          px={8}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Popconfirm
                            style={{ fontSize: "16px" }}
                            title="Bạn có sẽ xóa sản phẩm này hay không？"
                            okText="Có"
                            cancelText="Không"
                            onConfirm={() => onDelete(_id)}
                          >
                            <Box as={FaTrash}></Box>
                          </Popconfirm>
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
            <Text fontSize="md">Chưa nhập thức ăn</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default Product;
