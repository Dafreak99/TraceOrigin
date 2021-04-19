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
} from "@chakra-ui/react";

import Layout from "@/components/dashboard/Layout";
import SkeletonTable from "@/components/dashboard/SkeletonTable";
import { Table, Th, Td, Tr } from "@/components/Table";

import { AiOutlinePlus } from "react-icons/ai";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { FaEdit, FaTrash } from "react-icons/fa";

import Link from "next/link";
import Modal from "antd/lib/modal/Modal";

const Posts = () => {
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

  if (loading) {
    <Layout>
      <Box px={16} py={12}>
        <Flex justify="space-between" align="center">
          <Heading mt={10} mb={5}>
            Danh sách bài viết
          </Heading>
          <Button background="#006aff" color="#fff" textTransform="uppercase">
            <Link href="./posts/add">
              <a>
                <Box as={AiOutlinePlus} mr="0.5rem" />
                <span>New</span>
              </a>
            </Link>
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
          <Button background="#006aff" color="#fff" textTransform="uppercase">
            <Link href="./posts/add">
              <a style={{ display: "flex", alignItems: "center" }}>
                <Box as={AiOutlinePlus} mr="0.5rem" />
                <span>New</span>
              </a>
            </Link>
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
                <Tr cursor="pointer">
                  <Td>{i + 1}</Td>
                  <Td>{name}</Td>
                  <Td>
                    <Badge colorScheme="green">{type}</Badge>
                  </Td>

                  <Td borderLeft="1px solid #e8eef3">
                    <Link href={`./posts/edit/${_id}`}>
                      <a>
                        <Box as={FaEdit} />
                      </a>
                    </Link>
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

              <Modal title={null} okText="Yes" cancelText="No">
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
