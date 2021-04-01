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
import { Pagination, Popconfirm } from "antd";

import Layout from "@/components/dashboard/Layout";
import { Table, Th, Td, Tr } from "@/components/Table";
import fetcher from "@/utils/fetcher";
import SkeletonTable from "@/components/dashboard/SkeletonTable";
import Modal from "antd/lib/modal/Modal";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useForm } from "react-hook-form";

import WorkerModal from "@/components/dashboard/WorkerModal";
import EditWorkerModal from "@/components/dashboard/EditWorkerModal";

const Worker = () => {
  const router = useRouter();

  const [isEdit, setIsEdit] = useState(false);

  const [editIndex, setEditIndex] = useState(0);

  const { data, error } = useSWR(
    ["/api/worker", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  const onDelete = async (id) => {
    try {
      let res = await fetch(`/api/worker/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
      });
    } catch (error) {
      console.log(error.message);
    }

    mutate(
      ["/api/worker", process.browser ? localStorage.getItem("token") : null],
      async (cachedData) => {
        let data = cachedData.filter((each) => each._id !== id);

        return data;
      },
      false
    );
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
              <TransitionGroup component="tbody">
                {data.map(
                  (
                    {
                      name,
                      address,
                      idCard,
                      dateOfBorn,
                      gender,
                      degree,
                      responsibility,
                      phone,
                      _id,
                    },
                    i
                  ) => (
                    <CSSTransition key={i} timeout={500} classNames="item">
                      <Tr
                        backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                        cursor="pointer"
                      >
                        <Td>{i + 1}</Td>
                        <Td>{name}</Td>
                        <Td>{address}</Td>
                        <Td>{idCard}</Td>
                        <Td>{phone}</Td>
                        <Td>{dateOfBorn}</Td>
                        <Td>{gender}</Td>
                        <Td>{degree}</Td>
                        <Td>{responsibility}</Td>

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
                        <Popconfirm
                          style={{ fontSize: "16px" }}
                          title="Bạn có sẽ xóa nhân công này hay không？"
                          okText="Có"
                          cancelText="Không"
                          onConfirm={() => onDelete(_id)}
                        >
                          <Td
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <Box as={FaTrash} />
                          </Td>
                        </Popconfirm>
                      </Tr>
                    </CSSTransition>
                  )
                )}

                <EditWorkerModal
                  visible={isEdit}
                  setVisible={setIsEdit}
                  data={data[editIndex]}
                />
              </TransitionGroup>
            </Table>
            <Pagination
              defaultCurrent={1}
              total={data.length}
              pageSize="5"
              style={{ marginTop: "2rem" }}
            />
          </>
        ) : (
          <SkeletonTable />
        )}
      </Box>
    </Layout>
  );
};

export default Worker;
