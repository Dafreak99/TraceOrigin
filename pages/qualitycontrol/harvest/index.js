import Layout from "@/components/dashboard/Layout";

import {
  Box,
  Alert,
  AlertIcon,
  Heading,
  Image,
  Text,
  Button,
} from "@chakra-ui/react";

import { Table, Td, Th, Tr } from "@/components/Table";

import { Popconfirm } from "antd";

import useSWR, { mutate } from "swr";
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

  console.log(products);

  const onReject = async (id, pondId) => {
    try {
      await fetch(`/api/product/harvest/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify({ id, pond: pondId }),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const onApprove = async (id, pondId) => {
    // Send ID to change isHarvested -> true
    let res = await fetch(`/api/product/harvest/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.browser ? localStorage.getItem("token") : null,
      },
      body: JSON.stringify({ id, pond: pondId }),
    });

    mutate(
      [
        "/api/product/harvest/pending",
        process.browser ? localStorage.getItem("token") : null,
      ],
      async (cachedData) => {
        let data = cachedData.filter((each) => each._id !== id);

        return data;
      },
      false
    );
  };

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
                <Th>Ngày thu hoạch</Th>
                <Th> </Th>
              </Tr>
              {products.map(
                ({ name, isHarvested: { harvestProduct }, _id }, i) => (
                  <Tr>
                    <Td>{i + 1}</Td>
                    <Td>{name}</Td>
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
