import { useEffect, useState } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from "@chakra-ui/core";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Pagination } from "antd";

import WorkerModal from "@/components/dashboard/WorkerModal";
import Layout from "@/components/dashboard/Layout";
import { Table, Th, Td, Tr } from "@/components/Table";
import fetcher from "@/utils/fetcher";
import FoodTableSkeleton from "@/components/dashboard/FoodTableSkeleton";
import Modal from "antd/lib/modal/Modal";
import { useForm } from "react-hook-form";
import EditWorkerModal from "@/components/dashboard/EditWorkerModal";

const Worker = () => {
  const router = useRouter();

  const [visible, setVisible] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [editIndex, setEditIndex] = useState(0);

  const { data, error } = useSWR(
    [
      "/api/worker",
      "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
    ],
    fetcher
  );

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);

  const onOK = async () => {
    try {
      let res = await fetch(`/api/worker/${deleteId}`, {
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

    mutate(
      [
        "/api/worker",
        // REPLACE TOKEN
        "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
      ],
      async (cachedData) => {
        let data = cachedData.filter((each) => each._id !== deleteId);

        return data;
      },
      false
    );

    hideModal();
  };

  return (
    <Layout>
      <Box px={16} py={12} position="relative">
        <WorkerModal />
        <Breadcrumb fontSize="xl">
          <BreadcrumbItem>
            <BreadcrumbLink>Quản lí</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Nhân công</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading mt={10} mb={5}>
          Danh sách nhân công
        </Heading>

        {data && data.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>STT</Th>
                <Th>Họ tên</Th>
                <Th>Địa chỉ</Th>
                <Th>CMND</Th>
                <Th>SDT</Th>
                <Th>Năm sinh</Th>
                <Th>Giới tính</Th>
                <Th>Bằng cấp</Th>
                <Th>Nhiệm vụ</Th>
                <Th>{""}</Th>
                <Th>{""}</Th>
              </Tr>
              {data.map(
                (
                  {
                    hoTen,
                    diaChi,
                    soCMND,
                    namSinh,
                    gioiTinh,
                    bangCap,
                    nhiemVu,
                    sdt,
                    _id,
                  },
                  i
                ) => (
                  <Tr
                    backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                    cursor="pointer"
                    onClick={() => router.push(`./food/${_id}`)}
                  >
                    <Td>{i + 1}</Td>
                    <Td>{hoTen}</Td>
                    <Td>{diaChi}</Td>
                    <Td>{soCMND}</Td>
                    <Td>{sdt}</Td>
                    <Td>{namSinh}</Td>
                    <Td>{gioiTinh}</Td>
                    <Td>{bangCap}</Td>
                    <Td>{nhiemVu}</Td>

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
                    <Td
                      // px={8}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEdit(!isEdit);
                        setEditIndex(i);
                      }}
                    >
                      <Box as={FaEdit} />
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
                <p>Xóa nhân công này ?</p>
              </Modal>

              <EditWorkerModal
                visible={isEdit}
                setVisible={setIsEdit}
                data={data[editIndex]}
              />
            </Table>
            <Pagination
              defaultCurrent={1}
              total={data.length}
              pageSize="5"
              style={{ marginTop: "2rem" }}
            />
          </>
        ) : (
          <FoodTableSkeleton />
        )}
      </Box>
    </Layout>
  );
};

export default Worker;
