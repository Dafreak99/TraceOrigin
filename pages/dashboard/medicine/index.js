import { useState } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  Heading,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/core";
import Layout from "@/components/dashboard/Layout";
import { Table, Th, Td, Tr } from "@/components/Table";
import useSWR from "swr";

import fetcher from "@/utils/fetcher";
import FoodTableSkeleton from "@/components/dashboard/FoodTableSkeleton";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";
import AddMedicineModal from "@/components/dashboard/AddMedicineModal";

const Index = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState();
  const [id, setId] = useState();

  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const { data, error } = useSWR(
    [
      "/api/medicine",
      "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
    ],
    fetcher
  );

  const onDelete = async () => {
    try {
      let res = await fetch(`/api/medicine/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
        },
      });
    } catch (error) {
      console.log(error.message);
    }

    setIsOpen(false);
  };

  return (
    <Layout>
      <Box px={16} py={12}>
        <AddMedicineModal />
        <Breadcrumb fontSize="xl">
          <BreadcrumbItem>
            <BreadcrumbLink>Quản lí</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Thuốc</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading mt={10} mb={5}>
          Lịch sử nhập thuốc
        </Heading>
        {data && data.length > 0 ? (
          <Table>
            <Tr>
              <Th>Ngày nhập</Th>
              <Th>Tên thuốc</Th>
              <Th>Hình ảnh</Th>
              <Th>Số lượng(kg)</Th>
              <Th>Cách bảo quản</Th>
              <Th>Ngày sản xuất</Th>
              <Th>Hạn sử dụng</Th>
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
          <FoodTableSkeleton />
        )}
      </Box>
    </Layout>
  );
};

export default Index;
