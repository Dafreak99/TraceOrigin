import { Alert, AlertIcon, Box, Heading, Image } from "@chakra-ui/core";
import Layout from "@/components/dashboard/Layout";
import { Table, Tr, Td, Th } from "@/components/Table";
import { FaTrash } from "react-icons/fa";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useEffect, useState } from "react";
import FoodTableSkeleton from "@/components/dashboard/FoodTableSkeleton";
import { format } from "date-fns";

const feedingdiary = () => {
  const [loading, setLoading] = useState(true);
  const { data, error } = useSWR(
    [
      "/api/feedingdiary",
      "eyJhbGciOiJIUzI1NiJ9.NWY3N2U5NWY1MTc4ZjYwN2E4N2Q4OTJm.sbylEYcbOYbyduD_9ATpULGTIt5oIfA-k6crYU3YlgY",
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

  return (
    <Layout>
      <Box px={16} py={12}>
        <Heading mb={8}>Nhật ký cho ăn</Heading>
        {data && data.length > 0 ? (
          <Table>
            <Tr>
              <Th>Ngày cho ăn</Th>
              <Th>Tên thức ăn</Th>
              <Th>Hình ảnh</Th>
              <Th>Khối lượng(kg)</Th>
              <Th>Ghi chú</Th>
              <Th>Tên Ao</Th>
              <Th>{""}</Th>
            </Tr>
            {data.map(
              (
                {
                  ngayThangNam,
                  khoiLuong,
                  ghiChu,
                  thucAn: { tenThucAn, hinhAnh },
                  ao: { tenAo },
                },
                i
              ) => (
                <Tr
                  backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                  cursor="pointer"
                  onClick={() => router.push(`./medicine/${_id}`)}
                >
                  <Td>{format(new Date(ngayThangNam), "dd/MM/yyyy")}</Td>
                  <Td>{tenThucAn}</Td>
                  <Td>
                    <Image src={hinhAnh[0]} height="5rem" />
                  </Td>
                  <Td>{khoiLuong}</Td>
                  <Td>{ghiChu}</Td>
                  <Td>{tenAo}</Td>
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
            Chưa có lịch sử cho ăn
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default feedingdiary;
