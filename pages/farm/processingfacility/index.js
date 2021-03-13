import { useEffect, useState } from "react";
import { Box, Heading, Text, Image } from "@chakra-ui/core";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Layout from "@/components/dashboard/Layout";
import { Table, Th, Td, Tr } from "@/components/Table";
import fetcher from "@/utils/fetcher";
import FoodTableSkeleton from "@/components/dashboard/FoodTableSkeleton";
import AddProcessingFacility from "@/components/dashboard/AddProcessingFaclity";
import { Popconfirm } from "antd";

const ProcessingFacility = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState();
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);

  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const { data, error } = useSWR(
    [
      "/api/processingfacility",
      process.browser ? localStorage.getItem("token") : null,
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
      await fetch(`/api/processingfacility`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify({ id }),
      });

      mutate(
        [
          "/api/processingfacility",
          process.browser ? localStorage.getItem("token") : null,
        ],
        async (cachedData) => {
          let data = cachedData.filter((each) => each._id !== id);
          return data;
        },
        false
      );
    } catch (error) {
      console.log(error.message);
    }

    setIsOpen(false);
  };

  if (loading) {
    return (
      <Layout>
        <Box px={16} py={12} position="relative">
          <AddProcessingFacility />
          <Heading mt={10} mb={5}>
            Danh sách cơ sở chế biến
          </Heading>
          <FoodTableSkeleton />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box px={16} py={12} position="relative">
        <AddProcessingFacility />

        <Heading mt={10} mb={5}>
          Danh sách cơ sở chế biến
        </Heading>
        {data && data.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>Tên cơ sở chế biến</Th>
                <Th>Địa chỉ cơ sở chế biến</Th>
                <Th>Hình ảnh</Th>
                <Th>{""}</Th>
              </Tr>
              <TransitionGroup component="tbody">
                {data.map(({ name, address, images, _id }, i) => (
                  <CSSTransition key={i} timeout={500} classNames="item">
                    <Tr
                      backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                      cursor="pointer"
                    >
                      <Td>{name}</Td>
                      <Td>{address}</Td>
                      <Td>
                        <Image src={images[0]} h="100px" />
                      </Td>

                      <Popconfirm
                        style={{ fontSize: "16px" }}
                        title="Bạn có sẽ xóa cơ sở chế biến này hay không？"
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => onDelete(_id)}
                      >
                        <Td
                          borderLeft="1px solid #e8eef3"
                          px={8}
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(true);
                            setId(_id);
                          }}
                        >
                          <Box as={FaTrash}></Box>
                        </Td>
                      </Popconfirm>
                    </Tr>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </Table>
          </>
        ) : (
          <Alert status="info" fontSize="md" w="30rem">
            <AlertIcon />
            <Text fontSize="md">Chưa có cơ sở chế biến</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default ProcessingFacility;
