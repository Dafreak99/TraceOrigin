import { AlertIcon, Box, Heading, Image, Alert, Text } from "@chakra-ui/core";
import Layout from "@/components/dashboard/Layout";
import { Table, Tr, Td, Th } from "@/components/Table";
import { FaTrash } from "react-icons/fa";
import useSWR, { mutate } from "swr";
import fetcher from "@/utils/fetcher";
import SkeletonTable from "@/components/dashboard/SkeletonTable";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Popconfirm } from "antd";

const Seed = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const { data, error } = useSWR(
    ["/api/seed", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  useEffect(() => {
    if (data !== undefined) {
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return (
      <Layout>
        <Box px={16} py={12} position="relative">
          <Heading mb={8}>Nhật ký sử dụng thuốc</Heading>
          <SkeletonTable />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box px={16} py={12}>
        <Heading mb={8}>Nhật ký thả giống</Heading>
        {data?.length > 0 ? (
          <Table>
            <Tr>
              <Th>STT</Th>
              <Th>Tên Con Giống</Th>
              <Th>Số lượng</Th>
              <Th>Ngày thả giống</Th>
              <Th>Ngày tuổi con giống</Th>
              <Th>Trại giống</Th>
              <Th>{""}</Th>
            </Tr>
            <TransitionGroup component="tbody">
              {data.map(
                (
                  {
                    name,
                    quantity,
                    stockingDate,
                    seedAge,
                    hatchery: { name: hatcheryName },
                    pondName,
                    _id,
                  },
                  i
                ) => (
                  <CSSTransition key={i} timeout={500} classNames="item">
                    <Tr
                      backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                      cursor="pointer"
                      onClick={() => router.push(`./seed/${_id}`)}
                    >
                      <Td>{i + 1}</Td>
                      <Td>{name}</Td>
                      <Td>{quantity}</Td>
                      <Td>{stockingDate}</Td>
                      <Td>{seedAge}</Td>
                      <Td>{hatcheryName}</Td>
                      <Td>{pondName}</Td>
                    </Tr>
                  </CSSTransition>
                )
              )}
            </TransitionGroup>
          </Table>
        ) : (
          <Alert status="info" fontSize="md" w="30rem">
            <AlertIcon />
            <Text fontSize="md">Chưa sử dụng thuốc</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default Seed;
