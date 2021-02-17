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
} from "@chakra-ui/core";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";

import Layout from "@/components/dashboard/Layout";
import { Table, Th, Td, Tr } from "@/components/Table";
import fetcher from "@/utils/fetcher";
import FoodTableSkeleton from "@/components/dashboard/FoodTableSkeleton";
import AddProcessingFacility from "@/components/dashboard/AddProcessingFaclity";

const ProcessingFacility = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState();
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);

  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const { data, error } = useSWR(
    [
      "/api/processingfacility",
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher
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
          <AddProcessingFacility />
          <Heading mt={10} mb={5}>
            Danh sách cơ sở chế biến
          </Heading>
          <FoodTableSkeleton />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box px={16} py={12} position="relative">
        <AddProcessingFacility />

        <Heading mt={10} mb={5}>
          Danh sách cơ sở chế biến
        </Heading>
        {data && data.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>Tên cơ sở chế biến</Th>
                <Th>Địa chỉ cơ sở chế biến</Th>

                <Th>{""}</Th>
              </Tr>
              {data.map(({ name, address, _id }, i) => (
                <Tr
                  backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                  cursor="pointer"
                  onClick={() => router.push(`./food/${_id}`)}
                >
                  <Td>{name}</Td>
                  <Td>{address}</Td>

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
              ))}
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
                    Bạn có chắc rằng sẽ xóa cơ sở chế biến này không ?
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
            <Text fontSize="md">Chưa có cơ sở chế biến</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default ProcessingFacility;
