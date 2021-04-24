import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Alert,
  AlertIcon,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import useSWR, { mutate } from "swr";
import { FaTrash } from "react-icons/fa";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import fetcher from "@/utils/fetcher";
import { Popconfirm } from "antd";

import Layout from "@/components/dashboard/Layout";
import { Table, Th, Td, Tr } from "@/components/Table";
import SkeletonTable from "@/components/dashboard/SkeletonTable";
import AddHatcheryModal from "@/components/dashboard/AddHatcheryModal";
import EditHatcheryModal from "@/components/dashboard/EditHatcheryModal";
import Link from "next/link";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import RejectMessageModal from "@/components/dashboard/RejectMessageModal";
import { useRouter } from "next/router";

const Hatchery = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { data, error } = useSWR(
    ["/api/hatchery", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  useEffect(() => {
    if (data !== undefined) {
      setLoading(false);
    }
  }, [data]);

  const onDelete = async (id) => {
    try {
      await fetch("/api/hatchery", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify({ id }),
      });

      mutate(
        [
          "/api/hatchery",
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
  };

  const onApprove = async (id) => {
    try {
      await fetch(`/api/hatchery/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify({ resolveType: "approve" }),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Box position="relative">
          <AddHatcheryModal />
          <Heading mb={5}>Danh sách trại giống</Heading>
          <SkeletonTable />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box position="relative">
        <AddHatcheryModal />

        {/* Pending request one */}
        <Heading mb={5}>Danh sách đề xuất trại giống</Heading>
        {data?.requestedHatcheries?.length > 0 ? (
          <>
            <Table mb="2rem">
              <Tr>
                <Th>Tên trại giống</Th>
                <Th>Địa chỉ</Th>
                <Th>Tọa độ</Th>
                <Th>Yêu cầu từ</Th>
                <Th>Phê duyệt</Th>
                <Th>{""}</Th>
                <Th>{""}</Th>
              </Tr>
              <TransitionGroup component="tbody">
                {data.requestedHatcheries.map(
                  (
                    {
                      name,
                      address,
                      _id,
                      coordinate: { latitude, longitude },
                      createdBy: { username },
                    },
                    i
                  ) => (
                    <CSSTransition key={i} timeout={500} classNames="item">
                      <Link href={`./hatchery/${_id}`}>
                        <Tr cursor="pointer">
                          <Td>{name}</Td>
                          <Td>{address}</Td>
                          <Td>{latitude + " , " + longitude}</Td>
                          <Td>
                            Cơ sở của{" "}
                            <Box as="span" fontWeight="bold">
                              {username}
                            </Box>
                          </Td>
                          <Td>
                            <Popconfirm
                              title="Bạn có chắc là sẽ duyệt trại giống này?"
                              onCancel={(e) => e.stopPropagation()}
                              onConfirm={(e) => {
                                e.stopPropagation();
                                onApprove(_id);
                              }}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button
                                background="#88fcb62b"
                                color="#22a669"
                                mr="10px"
                                leftIcon={<AiOutlineCheck />}
                                _hover={{ background: "88fcb62b" }}
                              >
                                Duyệt
                              </Button>
                            </Popconfirm>
                            <Popconfirm
                              title="Bạn có chắc là sẽ không duyệt trại giống này?"
                              onCancel={(e) => e.stopPropagation()}
                              onConfirm={(e) => {
                                e.stopPropagation();
                                onOpen();
                              }}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button
                                background="#fc88882b"
                                color="#a62222"
                                leftIcon={<AiOutlineClose />}
                                _hover={{ background: "fc88882b" }}
                              >
                                Từ chối
                              </Button>
                              <RejectMessageModal
                                isOpen={isOpen}
                                onClose={onClose}
                                type="hatchery"
                                hatcheryId={_id}
                              />
                            </Popconfirm>
                          </Td>
                        </Tr>
                      </Link>
                    </CSSTransition>
                  )
                )}
              </TransitionGroup>
            </Table>
          </>
        ) : (
          <Alert status="info" fontSize="md" w="30rem">
            <AlertIcon />
            <Text fontSize="md">Chưa có trại giống</Text>
          </Alert>
        )}

        {/* Default */}
        <Heading my={5}>Danh sách trại giống</Heading>

        {data?.defaultHatcheries?.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>Tên trại giống</Th>
                <Th>Địa chỉ</Th>
                <Th>Tọa độ</Th>
                <Th>{""}</Th>
                <Th>{""}</Th>
              </Tr>
              <TransitionGroup component="tbody">
                {data.defaultHatcheries.map(
                  (
                    { name, address, _id, coordinate: { latitude, longitude } },
                    i
                  ) => (
                    <CSSTransition key={i} timeout={500} classNames="item">
                      <Tr cursor="pointer">
                        <Td>{name}</Td>
                        <Td>{address}</Td>
                        <Td>{latitude + " , " + longitude}</Td>
                        <Td>
                          <EditHatcheryModal data={data.defaultHatcheries[i]} />
                        </Td>
                        <Td
                          borderLeft="1px solid #e8eef3"
                          px={8}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Popconfirm
                            style={{ fontSize: "16px" }}
                            title="Bạn có sẽ xóa trại giống này hay không？"
                            okText="Có"
                            cancelText="Không"
                            onConfirm={() => onDelete(_id)}
                          >
                            <Box as={FaTrash}></Box>
                          </Popconfirm>
                        </Td>
                      </Tr>
                    </CSSTransition>
                  )
                )}
              </TransitionGroup>
            </Table>
          </>
        ) : (
          <Alert status="info" fontSize="md" w="30rem">
            <AlertIcon />
            <Text fontSize="md">Chưa có trại giống</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default Hatchery;
