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

  const productStatus = (isHarvested) => {
    if (isHarvested === "false") {
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
    } else if (isHarvested === "true") {
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
    } else if (isHarvested === "pending") {
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
                <Th>QR</Th>
                <Th>Duyệt thu hoạch</Th>
                <Th>Quy cách đóng gói</Th>
                <Th>Địa điểm tiêu thụ</Th>
                <Th>{""}</Th>
              </Tr>
              <TransitionGroup component="tbody">
                {data.map(
                  (
                    {
                      name,
                      isHarvested,
                      harvestedDate,
                      qrCode,
                      images,
                      _id,
                      packingMethod,
                    },
                    i
                  ) => (
                    <CSSTransition key={i} timeout={500} classNames="item">
                      <Link href={`./food/${_id}`}>
                        <Tr cursor="pointer">
                          <Td>{name}</Td>
                          <Td>
                            <Image
                              src={images[0]}
                              height="100px"
                              width="auto"
                            />
                          </Td>
                          <Td>{harvestedDate}</Td>
                          <Td>
                            {" "}
                            <QRCode
                              size={100}
                              value={
                                "http://traceorigin.vercel.app/product/" +
                                qrCode
                              }
                            />
                          </Td>
                          <Td>{productStatus(isHarvested)}</Td>
                          {isHarvested === "true" && (
                            <>
                              <Td
                                px={8}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                {packingMethod?.packingMethod ? (
                                  packingMethod.packingMethod
                                ) : (
                                  <AddPackingMethod productId={_id} />
                                )}
                              </Td>
                              <Td
                                px={8}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <Link href={`./product/${_id}/consumption`}>
                                  <a>
                                    <Button>
                                      <Box as={AiOutlinePlus} mr="5px" />
                                      Địa điểm tiêu thụ
                                    </Button>
                                  </a>
                                </Link>
                              </Td>
                            </>
                          )}

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
                      </Link>
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
