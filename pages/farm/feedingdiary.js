import { Alert, AlertIcon, Box, Heading, Image, Text } from "@chakra-ui/core";
import Layout from "@/components/dashboard/Layout";
import { Table, Tr, Td, Th } from "@/components/Table";
import { FaTrash } from "react-icons/fa";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useEffect, useState } from "react";
import FoodTableSkeleton from "@/components/dashboard/FoodTableSkeleton";

const feedingdiary = () => {
  const [loading, setLoading] = useState(true);
  const { data, error } = useSWR(
    [
      "/api/feedingdiary",
      process.browser ? localStorage.getItem("token") : null,
      ,
    ],
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
        <Box px={16} py={12}>
          <Heading mb={8}>Nhật ký cho ăn</Heading>
          <FoodTableSkeleton />
        </Box>
      </Layout>
    );
  }
  console.log(data);

  return (
    <Layout>
      <Box px={16} py={12}>
        <Heading mb={8}>Nhật ký cho ăn</Heading>
        {data && data.length > 0 ? (
          <Table>
            <Tr>
              <Th>Ngày cho ăn</Th>
              <Th>Tên Ao</Th>
              <Th>Tên thức ăn</Th>
              <Th>Hình ảnh</Th>
              <Th>Khối lượng(kg)</Th>
              <Th>Ghi chú</Th>
              <Th>{""}</Th>
            </Tr>
            {data.map(
              (
                {
                  createdDate,
                  weight,
                  note,
                  food: { name, images },
                  pond: { name: pondName },
                },
                i
              ) => (
                <Tr
                  backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                  cursor="pointer"
                  onClick={() => router.push(`./medicine/${_id}`)}
                >
                  <Td>{createdDate}</Td>
                  <Td>{pondName}</Td>
                  <Td>
                    <Image src={images[0]} height="5rem" />
                  </Td>
                  <Td>{weight}</Td>
                  <Td>{note}</Td>
                  <Td>{name}</Td>
                  <Td
                    borderLeft="1px solid #e8eef3"
                    px={8}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Box as={FaTrash}></Box>
                  </Td>
                </Tr>
              )
            )}
          </Table>
        ) : (
          <Alert status="info" fontSize="md" w="30rem">
            <AlertIcon />
            <Text fontSize="md">Chưa có lịch sử cho ăn</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default feedingdiary;
