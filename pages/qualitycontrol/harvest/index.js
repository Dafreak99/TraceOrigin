import Layout from "@/components/dashboard/Layout";

import { Box, Alert, AlertIcon, Heading, Image, Text } from "@chakra-ui/core";

import { Table, Td, Th, Tr } from "@/components/Table";

import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

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
      <Box px={16} py={12}>
        <Heading mt={10} mb={5}>
          Sản phẩm chờ duyệt
        </Heading>

        {products && products.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>#</Th>
                <Th>Tên sản phẩm</Th>
                <Th>Hình ảnh</Th>
                <Th>Nuôi tại ao</Th>
                <Th>Ngày thu hoạch</Th>
                <Th>Trọng lượng</Th>
                <Th>{""}</Th>
                <Th>{""}</Th>
              </Tr>
              {products.map(
                (
                  {
                    name,
                    pond: { name: pondName, _id: pondId },
                    images,
                    harvestedDate,
                    weight,

                    _id,
                  },
                  i
                ) => (
                  <Link href={`./harvest/${_id}`}>
                    {/* <a> */}
                    <Tr cursor="pointer">
                      <Td>{i + 1}</Td>
                      <Td>{name}</Td>
                      <Td>{pondName}</Td>
                      <Td>
                        <Image src={images[0]} height="100px" width="auto" />
                      </Td>
                      <Td>{harvestedDate}</Td>
                      <Td>{weight}</Td>
                      <Td
                        px={8}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Popconfirm
                          title="Bạn có chắc sẽ duyệt sản phẩm này？"
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
                          title="Bạn có chắc sẽ không duyệt sản phẩm này？"
                          okText="Có"
                          cancelText="Không"
                          onConfirm={() => onReject(_id, pondId)}
                        >
                          <Box as={AiFillCloseCircle} size="32px"></Box>
                        </Popconfirm>
                      </Td>
                    </Tr>
                    {/* </a> */}
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
