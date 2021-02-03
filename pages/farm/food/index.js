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
  Text,
} from "@chakra-ui/core";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";
import { Pagination } from "antd";

import AddFoodModal from "@/components/dashboard/AddFoodModal";
import Layout from "@/components/dashboard/Layout";
import { Table, Th, Td, Tr } from "@/components/Table";
import fetcher from "@/utils/fetcher";
import FoodTableSkeleton from "@/components/dashboard/FoodTableSkeleton";
import { format } from "date-fns";

const AddFood = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState();
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const PER_PAGE = 5;
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const { data, error } = useSWR(
    ["/api/food", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  useEffect(() => {
    if (data !== undefined) {
      setLoading(false);
    }
    if (data && data.length > 0) {
      setCurrentData(data.slice(0, 5));
    }
  }, [data]);

  const onChange = (page, pageSize) => {
    setCurrentPage(page);
    let value = data.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    setCurrentData(value);
  };

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
          <AddFoodModal />
          <Heading mt={10} mb={5}>
            Lịch sử nhập thức ăn
          </Heading>
          <FoodTableSkeleton />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box px={16} py={12} position="relative">
        <AddFoodModal />
        <Heading mt={10} mb={5}>
          Lịch sử nhập thức ăn
        </Heading>
        {currentData && currentData.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>Ngày nhập</Th>
                <Th>Tên thức ăn</Th>
                <Th>Hình ảnh</Th>
                <Th>Số lượng(kg)</Th>
                <Th>Ngày sản xuất</Th>
                <Th>Hạn sử dụng</Th>
                <Th>{""}</Th>
              </Tr>
              {currentData.map(
                (
                  {
                    ngayNhap,
                    tenThucAn,
                    hinhAnh,
                    soLuong,
                    ngaySanXuat,
                    hanSuDung,
                    _id,
                  },
                  i
                ) => (
                  <Tr
                    backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                    cursor="pointer"
                    onClick={() => router.push(`./food/${_id}`)}
                  >
                    <Td>{format(new Date(ngayNhap), "dd/MM/yyyy")}</Td>
                    <Td>{tenThucAn}</Td>
                    <Td>
                      <Image src={hinhAnh[0]} height="5rem" />
                    </Td>
                    <Td>{soLuong}</Td>
                    <Td>{format(new Date(ngaySanXuat), "dd/MM/yyyy")}</Td>
                    <Td>{format(new Date(hanSuDung), "dd/MM/yyyy")}</Td>
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
            <Pagination
              defaultCurrent={1}
              total={data.length}
              pageSize="5"
              onChange={onChange}
              style={{ marginTop: "2rem" }}
            />
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

export default AddFood;
