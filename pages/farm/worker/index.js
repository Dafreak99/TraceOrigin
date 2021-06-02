import { useEffect, useState } from "react";
import {
  Box,
  Alert,
  AlertIcon,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import useSWR, { mutate } from "swr";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Pagination, Popconfirm } from "antd";

import Layout from "@/components/dashboard/Layout";
import { Table, Th, Td, Tr } from "@/components/Table";
import fetcher from "@/utils/fetcher";
import SkeletonTable from "@/components/dashboard/SkeletonTable";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import WorkerModal from "@/components/dashboard/WorkerModal";
import EditWorkerModal from "@/components/dashboard/EditWorkerModal";
import { useRouter } from "next/router";

const Worker = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [editIndex, setEditIndex] = useState(0);
  const [loading, setLoading] = useState(true);

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
    ["/api/worker", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  useEffect(() => {
    if (data !== undefined) {
      setLoading(false);
    }
  }, [data]);

  const onDelete = async (id) => {
    try {
      await fetch(`/api/worker/${id}`, {
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

  if (loading) {
    return (
      <Layout>
        <Box position="relative">
          <WorkerModal />
          <Heading mb={5}>Danh sách nhân công</Heading>
          <SkeletonTable />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box position="relative">
        <WorkerModal />

        <Heading mb={5}>Danh sách nhân công</Heading>

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
                      <Tr cursor="pointer">
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
                            onOpen();
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
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
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
          <Alert status="info" fontSize="md" w="30rem">
            <AlertIcon />
            <Text fontSize="md">Chưa có nhân công</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default Worker;
