import Layout from "@/components/dashboard/Layout";

import { Box, Alert, AlertIcon, Heading, Text, Button } from "@chakra-ui/react";

import { Table, Td, Th, Tr } from "@/components/Table";

import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import Link from "next/link";

const DashBoard = () => {
  const { data: products } = useSWR(
    [
      "/api/product/harvest/pending",
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher,
    { refreshInterval: 1000 }
  );

  return (
    <Layout>
      <Box>
        <Heading mb={5}>Sản phẩm chờ duyệt</Heading>

        {products && products.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>#</Th>
                <Th>Tên sản phẩm</Th>
                <Th>Cơ sơ</Th>
                <Th>Ngày thu hoạch</Th>
                <Th> </Th>
              </Tr>
              {products.map(
                (
                  {
                    name,
                    isHarvested: { harvestProduct },
                    farm: { name: farmName },
                    _id,
                  },
                  i
                ) => (
                  <Tr>
                    <Td>{i + 1}</Td>
                    <Td>{name}</Td>
                    <Td>{farmName}</Td>
                    <Td>{harvestProduct.harvestedDate}</Td>
                    <Td>
                      <Link href={`./harvest/${_id}`}>
                        <a>
                          <Button>Chi tiết</Button>
                        </a>
                      </Link>
                    </Td>
                  </Tr>
                )
              )}
            </Table>
          </>
        ) : (
          <Alert status="info" fontSize="md" w="30rem">
            <AlertIcon />
            <Text fontSize="md">Tất cả đều đã được phê duyệt</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default DashBoard;
