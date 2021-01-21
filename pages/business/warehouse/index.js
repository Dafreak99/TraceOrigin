import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  Box,
  Button,
  Heading,
} from "@chakra-ui/core";
import { FaTrash } from "react-icons/fa";
import useSWR, { mutate } from "swr";

import AddWarehouseModal from "@/components/dashboard/AddWarehouseModal";
import FoodTableSkeleton from "@/components/dashboard/FoodTableSkeleton";
import Layout from "@/components/dashboard/Layout";
import { Table, Td, Th, Tr } from "@/components/Table";
import fetcher from "@/utils/fetcher";
import { useEffect, useState } from "react";
import Modal from "antd/lib/modal/Modal";

const Warehouse = () => {
  const { data, error } = useSWR(
    ["/api/warehouse", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  const [isOpen, setIsOpen] = useState();
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);

  const [visible, setVisible] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);

  const onOK = async () => {
    try {
      let res = await fetch(`/api/warehouse/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify({ deleteId }),
      });
    } catch (error) {
      console.log(error.message);
    }

    mutate(
      [
        "/api/warehouse",
        // REPLACE TOKEN
        process.browser ? localStorage.getItem("token") : null,

        // process.browser ? localStorage.getItem("token") : null,
      ],
      async (cachedData) => {
        let data = cachedData.filter((each) => each._id !== deleteId);

        return data;
      },
      false
    );

    hideModal();
  };

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
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteId(_id);
                      showModal();
                    }}
                  >
                    <Box as={FaTrash} />
                  </Td>
                </Tr>
              ))}

              <Modal
                title={null}
                visible={visible}
                onOk={onOK}
                onCancel={hideModal}
                okText="Yes"
                cancelText="No"
              >
                <p>Xóa nhân công này ?</p>
              </Modal>
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
