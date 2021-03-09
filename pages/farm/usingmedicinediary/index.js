import { AlertIcon, Box, Heading, Image, Alert, Text } from "@chakra-ui/core";
import Layout from "@/components/dashboard/Layout";
import { Table, Tr, Td, Th } from "@/components/Table";
import { FaTrash } from "react-icons/fa";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import FoodTableSkeleton from "@/components/dashboard/FoodTableSkeleton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const UsingMedicineDiary = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const { data, error } = useSWR(
    [
      "/api/usingmedicine",
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
        <Box px={16} py={12} position="relative">
          <Heading mb={8}>Nhật ký sử dụng thuốc</Heading>

          <FoodTableSkeleton />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box px={16} py={12}>
        <Heading mb={8}>Nhật ký sử dụng thuốc</Heading>
        {data && data.length > 0 ? (
          <Table>
            <Tr>
              <Th>Ngày sử dung</Th>
              <Th>Tên Ao</Th>
              <Th>Tên thuốc</Th>
              <Th>Hình ảnh thuốc</Th>
              <Th>Tên thức ăn</Th>
              <Th>Hình ảnh thức ăn</Th>
              <Th>Khối lượng thuốc(kg)</Th>
              <Th>Tỷ lệ phối trộn(%)</Th>
              <Th>Người trộn</Th>
              <Th>{""}</Th>
            </Tr>
            {data.map(
              (
                {
                  createdDate,
                  medicine: { name, images: hinhAnhThuoc },
                  food: { name: foodName, images: hinhAnhThucAn },
                  pond: { name: pondName },
                  mixingRatio,
                  weight,
                  worker: { name: workerName },
                  _id,
                },
                i
              ) => (
                <Tr
                  backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                  cursor="pointer"
                  onClick={() => router.push(`./usingmedicinediary/${_id}`)}
                >
                  <Td>{format(new Date(createdDate), "dd/MM/yyyy")}</Td>
                  <Td>{pondName}</Td>
                  <Td>{name}</Td>
                  <Td>
                    <Image src={hinhAnhThuoc[0]} height="5rem" />
                  </Td>
                  <Td>{foodName}</Td>
                  <Td>
                    <Image src={hinhAnhThucAn[0]} height="5rem" />
                  </Td>
                  <Td>{weight}</Td>
                  <Td>{mixingRatio}</Td>
                  <Td>{workerName}</Td>
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
            <Text fontSize="md">Chưa sử dụng thuốc</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default UsingMedicineDiary;
