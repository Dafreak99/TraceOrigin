import Layout from "@/components/dashboard/Layout";

import { Box, Alert, AlertIcon, Heading, Image, Text } from "@chakra-ui/core";

import { Table, Td, Th, Tr } from "@/components/Table";

import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { useRouter } from "next/router";

import { Popconfirm } from "antd";

import useSWR, { mutate } from "swr";
import fetcher from "@/utils/fetcher";

const DashBoard = () => {
  const router = useRouter();

  const { data } = useSWR(
    [
      "/api/enterpriseauthentication",
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher
  );

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
      <Box px={16} py={12}>
        <Heading mt={10} mb={5}>
          Danh sách doanh nghiệp chờ duyệt xác thực
        </Heading>

        {data && data.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>#</Th>
                <Th>Tên cơ sở</Th>
                <Th>SĐT</Th>
                <Th>Thêm vào bởi</Th>

                <Th>{""}</Th>
                <Th>{""}</Th>
              </Tr>
              {data.map(({ name, phone, createdBy, _id }, i) => (
                <Tr
                  backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                  cursor="pointer"
                  onClick={() => router.push(`./authentication/${_id}`)}
                >
                  <Td>{i + 1}</Td>
                  <Td>{name}</Td>
                  <Td>{phone}</Td>

                  <Td>{createdBy}</Td>

                  {/* <Td
                    px={8}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Popconfirm
                      title="Bạn có chắc sẽ duyệt cơ sở này？"
                      okText="Có"
                      cancelText="Không"
                      onConfirm={() => onApprove(_id, pondId)}
                    >
                      <Box
                        as={AiFillCheckCircle}
                        size="32px"
                        color="#5adba5"
                      ></Box>
                    </Popconfirm>
                  </Td>
                  <Td
                    px={8}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    color="#f72f2f"
                  >
                    <Popconfirm
                      title="Bạn có chắc sẽ không duyệt cơ sở này？"
                      okText="Có"
                      cancelText="Không"
                      onConfirm={() => onReject(_id, pondId)}
                    >
                      <Box as={AiFillCloseCircle} size="32px"></Box>
                    </Popconfirm>
                  </Td> */}
                </Tr>
              ))}
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
