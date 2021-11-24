import { useEffect, useState, useRef } from "react";
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
} from "@chakra-ui/react";
import useSWR, { mutate } from "swr";
import { FaTrash } from "react-icons/fa";
import { Pagination } from "antd";

import AddFoodModal from "@/components/dashboard/AddFoodModal";
import Layout from "@/components/dashboard/Layout";
import { Table, Th, Td, Tr } from "@/components/Table";
import fetcher from "@/utils/fetcher";
import SkeletonTable from "@/components/dashboard/SkeletonTable";
import Link from "next/link";
import { useRouter } from "next/router";

const AddFood = () => {
  const [isOpen, setIsOpen] = useState();
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const PER_PAGE = 5;
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const router = useRouter();

  const { data: farm } = useSWR(
    [
      "/api/farm/authentication",
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher
  );

  if (farm?.isAuthenticated === "" || farm?.isAuthenticated === "pending") {
    router.push("/farm");
  }

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
        <Box position="relative">
          <AddFoodModal />
          <Heading mb={5}>Lịch sử nhập thức ăn</Heading>
          <SkeletonTable />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box position="relative">
        <AddFoodModal />
        <Heading mb={5}>Lịch sử nhập thức ăn</Heading>
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
                    importDate,
                    name,
                    images,
                    weight,
                    manufactureDate,
                    expiryDate,
                    _id,
                  },
                  i
                ) => (
                  <Link href={`./food/${_id}`}>
                    {/* <a> */}
                    <Tr cursor="pointer">
                      <Td>{importDate}</Td>
                      <Td>{name}</Td>
                      <Td>
                        <Image src={images[0]} height="5rem" />
                      </Td>
                      <Td>{weight}</Td>
                      <Td>{manufactureDate}</Td>
                      <Td>{expiryDate}</Td>
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
                    {/* </a> */}
                  </Link>
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
                    <Button colorScheme="red" onClick={onDelete} ml={3}>
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
