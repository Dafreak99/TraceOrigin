import Layout from "@/components/dashboard/Layout";

import {
  Box,
  Alert,
  AlertIcon,
  Heading,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import { Table, Td, Th, Tr } from "@/components/Table";

import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import Link from "next/link";

const DashBoard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: products } = useSWR(
    [
      "/api/product/unapproved",
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher,
    { refreshInterval: 1000 }
  );

  const onApprove = async (id) => {
    // Send ID to change isRegistered -> true
    let res = await fetch(`/api/product/approved`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.browser ? localStorage.getItem("token") : null,
      },
      body: JSON.stringify({ id }),
    });
  };

  return (
    <Layout>
      <Box>
        <Heading mb={5}>Sản phẩm chờ duyệt</Heading>

        {products && products.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>Từ cơ sở nuôi trồng</Th>
                <Th>Nuôi tại ao</Th>
                <Th>Ngày thả giống</Th>
                <Th>{""}</Th>
                <Th>{""}</Th>
              </Tr>
              {products.map(
                (
                  {
                    pond: {
                      name: pondName,
                      seed: { stockingDate },
                    },
                    farm: { name: farmName },
                    _id,
                  },
                  i
                ) => (
                  <Link href={`./register/${_id}`}>
                    <Tr cursor="pointer">
                      <Td>{farmName}</Td>
                      <Td>{pondName}</Td>
                      <Td>{stockingDate}</Td>

                      <Td>
                        <Link href={`./register/${_id}`}>
                          <a>
                            <Button>Chi tiết</Button>
                          </a>
                        </Link>
                      </Td>
                    </Tr>
                  </Link>
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
