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
  Badge,
  Alert,
  AlertIcon,
  Text,
} from "@chakra-ui/core";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";
import { Tooltip } from "antd";

import { Table, Th, Td, Tr } from "@/components/Table";
import Layout from "@/components/dashboard/Layout";
import fetcher from "@/utils/fetcher";
import FoodTableSkeleton from "@/components/dashboard/FoodTableSkeleton";
import AddMedicineModal from "@/components/dashboard/AddMedicineModal";
import { format, isBefore } from "date-fns";

const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState();
  const [id, setId] = useState();

  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const { data, error } = useSWR(
    ["/api/medicine", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  useEffect(() => {
    if (data !== undefined) {
      setLoading(false);
    }
  }, [data]);

  const onDelete = async () => {
    try {
      let res = await fetch(`/api/medicine/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
      });

      mutate(
        [
          "/api/medicine",
          process.browser ? localStorage.getItem("token") : null,
        ],
        async (cachedData) => {
          let data = cachedData.filter((each) => each._id !== id);
          return data;
        },
        false
      );

      // Add mutate
    } catch (error) {
      console.log(error.message);
    }

    setIsOpen(false);
  };

  const medicineCondition = (soLuong, hanSuDung) => {
    let expired = isBefore(new Date(hanSuDung), new Date());

    if (soLuong === 0) {
      return (
        <Tooltip title="Số lượng còn lại là 0" color="#007bff">
          <Badge
            ml="1"
            fontSize="0.8em"
            background="red"
            color="#fff"
            borderRadius="3px"
          >
            Bad
          </Badge>
        </Tooltip>
      );
    } else if (expired) {
      return (
        <Tooltip title="Hết hạn sử dụng" color="#007bff">
          <Badge
            ml="1"
            fontSize="0.8em"
            background="red"
            color="#fff"
            borderRadius="3px"
          >
            Bad
          </Badge>
        </Tooltip>
      );
    } else {
      return (
        <Badge
          ml="1"
          fontSize="0.8em"
          background="#20f3b8"
          color="#fff"
          borderRadius="3px"
        >
          Good
        </Badge>
      );
    }
  };

  if (loading) {
    return (
      <Layout>
        <Box px={16} py={12}>
          <AddMedicineModal />

          <Heading mt={10} mb={5}>
            Lịch sử nhập thuốc
          </Heading>
          <FoodTableSkeleton />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box px={16} py={12}>
        <AddMedicineModal />

        <Heading mt={10} mb={5}>
          Lịch sử nhập thuốc
        </Heading>
        {data && data.length > 0 ? (
          <Table>
            <Tr>
              <Th>Ngày nhập</Th>
              <Th>Tên thuốc</Th>
              <Th>Hình ảnh</Th>
              <Th>Số lượng(g)</Th>
              <Th>Cách bảo quản</Th>
              <Th>Ngày sản xuất</Th>
              <Th>Hạn sử dụng</Th>
              <Th>Tình trạng</Th>
              <Th>{""}</Th>
            </Tr>
            {data.map(
              (
                {
                  tenThuoc,
                  hinhAnh,
                  soLuong,
                  cachBaoQuan,
                  ngayNhap,
                  ngaySanXuat,
                  hanSuDung,
                  _id,
                },
                i
              ) => (
                <Tr
                  backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                  cursor="pointer"
                  onClick={() => router.push(`./medicine/${_id}`)}
                >
                  <Td>{ngayNhap}</Td>

                  <Td>{tenThuoc}</Td>
                  <Td>
                    <Image src={hinhAnh[0]} height="5rem" />
                  </Td>
                  <Td>{soLuong}</Td>
                  <Td>{cachBaoQuan}</Td>
                  <Td>{ngaySanXuat}</Td>
                  <Td>{hanSuDung}</Td>

                  <Td>{medicineCondition(soLuong, hanSuDung)}</Td>
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
        ) : (
          <Alert status="info" fontSize="md" w="30rem">
            <AlertIcon />
            <Text fontSize="md">Chưa nhập thuốc</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default Index;
