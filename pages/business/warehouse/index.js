import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  Box,
  Heading,
} from "@chakra-ui/core";
import { FaTrash } from "react-icons/fa";
import useSWR from "swr";

import AddWarehouseModal from "@/components/dashboard/AddWarehouseModal";
import FoodTableSkeleton from "@/components/dashboard/FoodTableSkeleton";
import Layout from "@/components/dashboard/Layout";
import { Table, Td, Th, Tr } from "@/components/Table";
import fetcher from "@/utils/fetcher";
import { useEffect, useState } from "react";

const Warehouse = () => {
  const [loading, setLoading] = useState(true);

  const { data, error } = useSWR(
    [
      "/api/warehouse",
      // BUSINESS ACCOUNT USER TOKEN
      process.browser ? localStorage.getItem("token") : null,
      // "eyJhbGciOiJIUzI1NiJ9.NWZkYjFiOWM0MjRkYjUwM2E0OTdjN2Iy.5rpAKpQJ35fR9F_bWwW4vZQc-rRPPqHO_ABVG6Hk9Ao",
    ],
    fetcher
  );

  useEffect(() => {
    if (data !== undefined) {
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return (
      <Layout>
        <Box px={16} py={12} position="relative">
          <AddWarehouseModal />
          <Heading mt={10} mb={5}>
            Danh sách kho
          </Heading>
          <FoodTableSkeleton />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box px={16} py={12} position="relative">
        <AddWarehouseModal />

        <Heading mt={10} mb={5}>
          Danh sách kho
        </Heading>
        {data && data.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>Mã kho</Th>
                <Th>Tên kho</Th>
                <Th>SĐT</Th>
                <Th>Email</Th>
                <Th>Địa chỉ</Th>
                <Th>{""}</Th>
              </Tr>
              {data.map(({ maKho, tenKho, sdt, email, diaChi, _id }, i) => (
                <Tr
                  backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                  cursor="pointer"
                  onClick={() => router.push(`./food/${_id}`)}
                >
                  <Td>{maKho}</Td>
                  <Td>{tenKho}</Td>
                  <Td>{sdt}</Td>
                  <Td>{email}</Td>
                  <Td>{diaChi}</Td>

                  <Td
                    borderLeft="1px solid #e8eef3"
                    px={8}
                    onClick={(e) => {
                      e.stopPropagation();
                      // setIsOpen(true);
                      // setId(_id);
                    }}
                  >
                    <Box as={FaTrash}></Box>
                  </Td>
                </Tr>
              ))}
              <AlertDialog
              // isOpen={isOpen}
              // leastDestructiveRef={cancelRef}
              // onClose={onClose}
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
                    <Button
                    //   ref={cancelRef}
                    // onClick={onClose}
                    >
                      Hủy bỏ
                    </Button>
                    <Button
                      variantColor="red"
                      // onClick={onDelete}
                      ml={3}
                    >
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
            Chưa có danh sách kho
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default Warehouse;
