import { useEffect, useState } from "react";

import {
  Box,
  Heading,
  Button,
  Flex,
  Alert,
  AlertIcon,
  Text,
  Badge,
} from "@chakra-ui/core";

import Layout from "@/components/dashboard/Layout";
import SkeletonTable from "@/components/dashboard/SkeletonTable";
import { Table, Th, Td, Tr } from "@/components/Table";

import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { FaEdit, FaTrash } from "react-icons/fa";

import Modal from "antd/lib/modal/Modal";

import EditConsignmentModal from "@/components/dashboard/EditConsignmentModal";

const Posts = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const { data, error } = useSWR(
    ["/api/post", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  useEffect(() => {
    if (data !== undefined) {
      setLoading(false);
    }
  }, [data]);

  console.log(data);

  if (loading) {
    <Layout>
      <Box px={16} py={12}>
        <Flex justify="space-between" align="center">
          <Heading mt={10} mb={5}>
            Danh sách bài viết
          </Heading>
          <Button
            background="#006aff"
            color="#fff"
            textTransform="uppercase"
            onClick={() => router.push("./posts/add")}
          >
            <Box as={AiOutlinePlus} mr="0.5rem" />
            <span>New</span>
          </Button>
        </Flex>
        <SkeletonTable />
      </Box>
    </Layout>;
  }

  return (
    <Layout>
      <Box px={16} py={12}>
        <Flex justify="space-between" align="center">
          <Heading mt={10} mb={5}>
            Danh sách bài viết
          </Heading>
          <Button
            background="#006aff"
            color="#fff"
            textTransform="uppercase"
            onClick={() => router.push("./posts/add")}
          >
            <Box as={AiOutlinePlus} mr="0.5rem" />
            <span>New</span>
          </Button>
        </Flex>
        {data && data.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>STT</Th>
                <Th>Tên thủy sản</Th>
                <Th>Loại</Th>
                <Th>{""}</Th>
                <Th>{""}</Th>
              </Tr>
              {data.map(({ name, type, description, _id }, i) => (
                <Tr
                  backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                  cursor="pointer"
                  onClick={() => router.push(`./food/${_id}`)}
                >
                  <Td>{i + 1}</Td>
                  <Td>{name}</Td>
                  <Td>
                    <Badge variantColor="green">{type}</Badge>
                  </Td>

                  <Td
                    borderLeft="1px solid #e8eef3"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Box as={FaEdit} />
                  </Td>

                  <Td
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Box as={FaTrash}></Box>
                  </Td>
                </Tr>
              ))}

              <Modal
                title={null}
                // visible={visible}
                // onOk={onOK}
                // onCancel={hideModal}
                okText="Yes"
                cancelText="No"
              >
                <Text fontSize="md">Xóa bài viết này ?</Text>
              </Modal>
            </Table>
          </>
        ) : (
          <Alert status="info" fontSize="md" w="30rem">
            <AlertIcon />
            <Text fontSize="md">Chưa có bài viết nào</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default Posts;
