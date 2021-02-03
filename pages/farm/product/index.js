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
import { Pagination } from "antd";

import Layout from "@/components/dashboard/Layout";
import { Table, Th, Td, Tr } from "@/components/Table";
import fetcher from "@/utils/fetcher";
import FoodTableSkeleton from "@/components/dashboard/FoodTableSkeleton";
import { format } from "date-fns";
import QRCode from "qrcode.react";

const Product = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState();
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);

  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

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

  const onDelete = async () => {
    try {
      let res = await fetch(`/api/food/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
      });

      mutate(
        ["/api/food", process.browser ? localStorage.getItem("token") : null],
        async (cachedData) => {
          let data = cachedData.filter((each) => each._id !== id);
          return data;
        },
        false
      );
    } catch (error) {
      console.log(error.message);
    }

    setIsOpen(false);
  };

  if (loading) {
    return (
      <Layout>
        <Box px={16} py={12} position="relative">
          <Heading mt={10} mb={5}>
            Danh sách sản phẩm đã thu hoạch
          </Heading>
          <FoodTableSkeleton />
        </Box>
      </Layout>
    );
  }

  const productStatus = (duyetDangKy) => {
    if (duyetDangKy === "false") {
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
    } else if (duyetDangKy === "true") {
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
    } else if (duyetDangKy === "pending") {
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
              {data.map(
                (
                  {
                    tenSanPham,
                    duyetThuHoach,
                    ngayThuHoach,
                    qrCode,
                    hinhAnh,
                    _id,
                  },
                  i
                ) => (
                  <Tr
                    backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                    cursor="pointer"
                    onClick={() => router.push(`./food/${_id}`)}
                  >
                    <Td>{tenSanPham}</Td>
                    <Td>
                      <Image src={hinhAnh[0]} height="100px" width="auto" />
                    </Td>
                    <Td>{ngayThuHoach}</Td>
                    <Td>{qrCode}</Td>
                    <Td>
                      {" "}
                      <QRCode
                        value={
                          "http://traceorigin.vercel.app/product/" + qrCode
                        }
                      />
                    </Td>
                    <Td>{productStatus(duyetThuHoach)}</Td>

                    <Td
                      borderLeft="1px solid #e8eef3"
                      px={8}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {duyetThuHoach === "true" && (
                        <Button
                        // onClick={() => router.push(`/farm/harvest/${_id}`)}
                        >
                          Thêm đóng gói
                        </Button>
                      )}
                    </Td>

                    <Td
                      borderLeft="1px solid #e8eef3"
                      px={8}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(true);
                        setId(_id);
                      }}
                    >
                      <Box as={FaTrash}></Box>
                    </Td>
                  </Tr>
                )
              )}
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay />
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Xóa
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Bạn có chắc rằng sẽ xóa sản phẩm này ?
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Hủy bỏ
                    </Button>
                    <Button variantColor="red" onClick={onDelete} ml={3}>
                      Xóa
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
