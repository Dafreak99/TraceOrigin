import { AlertIcon, Box, Heading, Alert, Text } from "@chakra-ui/react";
import Layout from "@/components/dashboard/Layout";
import { Table, Tr, Td, Th } from "@/components/Table";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import SkeletonTable from "@/components/dashboard/SkeletonTable";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Link from "next/link";

const Seed = () => {
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
        <Box position="relative">
          <Heading mb={8}>Nhật ký thả giống</Heading>
          <SkeletonTable />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box>
        <Heading mb={8}>Nhật ký thả giống</Heading>
        {data?.length > 0 ? (
          <Table>
            <Tr>
              <Th>STT</Th>
              <Th>Tên Con Giống</Th>
              <Th>Số lượng</Th>
              <Th>Tại ao</Th>
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
                  },
                  i
                ) => (
                  <CSSTransition key={i} timeout={500} classNames="item">
                    <Tr cursor="pointer">
                      <Td>{i + 1}</Td>
                      <Td>{name}</Td>
                      <Td>{quantity}</Td>
                      <Td>A1</Td>
                      <Td>{stockingDate}</Td>
                      <Td>{seedAge}</Td>
                      <Td>{hatcheryName}</Td>
                    </Tr>
                  </CSSTransition>
                )
              )}
            </TransitionGroup>
          </Table>
        ) : (
          <Alert status="info" fontSize="md" w="30rem">
            <AlertIcon />
            <Text fontSize="md">Chưa thả giống</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default Seed;
