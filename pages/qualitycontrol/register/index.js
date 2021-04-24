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

import { Popconfirm } from "antd";

import useSWR, { mutate } from "swr";
import fetcher from "@/utils/fetcher";
import Link from "next/link";
import RejectMessageModal from "@/components/dashboard/RejectMessageModal";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

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
                <Th>Tên sản phẩm</Th>
                <Th>Nuôi tại ao</Th>
                <Th>Ngày thả giống</Th>
                <Th>{""}</Th>
                <Th>{""}</Th>
              </Tr>
              {products.map(
                (
                  {
                    name,
                    pond: {
                      name: pondName,
                      seed: { stockingDate },
                      _id: pondId,
                    },
                    _id,
                  },
                  i
                ) => (
                  <Link href={`./register/${_id}`}>
                    {/* <a> */}
                    <Tr cursor="pointer">
                      <Td>{name}</Td>
                      <Td>{pondName}</Td>
                      <Td>{stockingDate}</Td>

                      <Td>
                        <Popconfirm
                          title="Bạn có chắc là sẽ duyệt trại giống này?"
                          onCancel={(e) => e.stopPropagation()}
                          onConfirm={(e) => {
                            e.stopPropagation();
                            onApprove(_id);
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            background="#88fcb62b"
                            color="#22a669"
                            mr="10px"
                            leftIcon={<AiOutlineCheck />}
                            _hover={{ background: "88fcb62b" }}
                          >
                            Duyệt
                          </Button>
                        </Popconfirm>
                        <Popconfirm
                          title="Bạn có chắc là sẽ không duyệt trại giống này?"
                          onCancel={(e) => e.stopPropagation()}
                          onConfirm={(e) => {
                            e.stopPropagation();
                            onOpen();
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            background="#fc88882b"
                            color="#a62222"
                            leftIcon={<AiOutlineClose />}
                            _hover={{ background: "fc88882b" }}
                          >
                            Từ chối
                          </Button>
                          <RejectMessageModal
                            isOpen={isOpen}
                            onClose={onClose}
                            type="register"
                            productId={_id}
                          />
                        </Popconfirm>
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
