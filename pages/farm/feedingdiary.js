import { Alert, AlertIcon, Box, Heading, Image, Text } from "@chakra-ui/core";

import { FaTrash } from "react-icons/fa";
import useSWR, { mutate } from "swr";
import fetcher from "@/utils/fetcher";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Popconfirm } from "antd";
import { useRouter } from "next/router";

import SkeletonTable from "@/components/dashboard/SkeletonTable";
import Layout from "@/components/dashboard/Layout";
import { Table, Tr, Td, Th } from "@/components/Table";
import Link from "next/link";

const feedingdiary = () => {
  const router = useRouter();
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

  const onDelete = async (id) => {
    try {
      await fetch("/api/feedingdiary", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify({ id }),
      });

      // mutate(
      //   [
      //     "/api/feedingdiary",
      //     process.browser ? localStorage.getItem("token") : null,
      //   ],
      //   async (cachedData) => {
      //     // TODO: Why null here
      //     console.log(cachedData);
      //     let data = cachedData.filter((each) => each._id !== id);

      //     return data;
      //   },
      //   false
      // );

      router.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Box px={16} py={12}>
          <Heading mb={8}>Nhật ký cho ăn 2</Heading>
          <SkeletonTable />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box px={16} py={12}>
        <Heading mb={8}>Nhật ký cho ăn 2</Heading>
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

            <TransitionGroup component="tbody">
              {data.map(
                (
                  {
                    createdDate,
                    weight,
                    note,
                    food: { name, images },
                    pond: { name: pondName },
                    _id,
                  },
                  i
                ) => (
                  <CSSTransition key={i} timeout={500} classNames="item">
                    <Link href={`./feedingdiary/${_id}`}>
                      {/* <a> */}
                      <Tr
                        backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                        cursor="pointer"
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
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Popconfirm
                            style={{ fontSize: "16px" }}
                            title="Bạn có chắc sẽ xóa ghi chép này hay không？"
                            okText="Có"
                            cancelText="Không"
                            onConfirm={() => onDelete(_id)}
                          >
                            <Box as={FaTrash}></Box>
                          </Popconfirm>
                        </Td>
                      </Tr>
                      {/* </a> */}
                    </Link>
                  </CSSTransition>
                )
              )}
            </TransitionGroup>
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
