import { useEffect, useState } from "react";
import { Box, Heading, Alert, AlertIcon, Text } from "@chakra-ui/core";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { FaEdit, FaTrash } from "react-icons/fa";

import Layout from "@/components/dashboard/Layout";
import { Table, Th, Td, Tr } from "@/components/Table";
import fetcher from "@/utils/fetcher";
import FoodTableSkeleton from "@/components/dashboard/FoodTableSkeleton";
import AddPackingModal from "@/components/dashboard/AddPackingModal";
import Modal from "antd/lib/modal/Modal";

import AddConsignmentModal from "@/components/dashboard/AddConsignmentModal";
import EditConsignmentModal from "@/components/dashboard/EditConsignmentModal";

const Packing = () => {
  const router = useRouter();
  const [id, setId] = useState();
  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const [editIndex, setEditIndex] = useState(0);

  const { data, error } = useSWR(
    [
      "/api/consignment",
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher
  );

  console.log(data);

  useEffect(() => {
    if (data !== undefined) {
      setLoading(false);
    }
  }, [data]);

  const onOK = async () => {
    try {
      let res = await fetch(`/api/consignment/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
      });

      mutate(
        [
          "/api/consignment",
          process.browser ? localStorage.getItem("token") : null,
        ],
        async (cachedData) => {
          let data = cachedData.filter((each) => each._id !== id);
          return data;
        },
        false
      );
    } catch (error) {
      console.log(error.message);
    }

    hideModal();
  };

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);

  if (loading) {
    return (
      <Layout>
        <Box px={16} py={12} position="relative">
          <AddConsignmentModal />
          <Heading mt={10} mb={5}>
            Danh sách Lô hàng
          </Heading>
          <FoodTableSkeleton />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box px={16} py={12} position="relative">
        <AddConsignmentModal />

        <Heading mt={10} mb={5}>
          Danh sách Lô hàng
        </Heading>
        {data && data.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>Mã lô hàng</Th>
                <Th>Ngày sản xuất</Th>
                <Th>Sản phẩm</Th>
                <Th>{""}</Th>
                <Th>{""}</Th>
              </Tr>
              {data.map(
                ({ maLoHang, manufactureDate, sanPham: { name }, _id }, i) => (
                  <Tr
                    backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                    cursor="pointer"
                    onClick={() => router.push(`./food/${_id}`)}
                  >
                    <Td>{maLoHang}</Td>
                    <Td>{manufactureDate}</Td>
                    <Td>{name}</Td>

                    <Td
                      borderLeft="1px solid #e8eef3"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEdit(!isEdit);
                        setEditIndex(i);
                      }}
                    >
                      <Box as={FaEdit} />
                    </Td>

                    <Td
                      onClick={(e) => {
                        e.stopPropagation();
                        setId(_id);
                        showModal();
                      }}
                    >
                      <Box as={FaTrash}></Box>
                    </Td>
                  </Tr>
                )
              )}

              <Modal
                title={null}
                visible={visible}
                onOk={onOK}
                onCancel={hideModal}
                okText="Yes"
                cancelText="No"
              >
                <Text fontSize="md">Xóa lô hàng này ?</Text>
              </Modal>
              <EditConsignmentModal
                visible={isEdit}
                setVisible={setIsEdit}
                data={data[editIndex]}
              />
            </Table>
          </>
        ) : (
          <Alert status="info" fontSize="md" w="30rem">
            <AlertIcon />
            <Text fontSize="md">Chưa có Lô hàng</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default Packing;
