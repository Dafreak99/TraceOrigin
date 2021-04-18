import { useEffect, useState } from "react";
import { Box, Heading, Alert, AlertIcon, Text } from "@chakra-ui/react";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Layout from "@/components/dashboard/Layout";
import { Table, Th, Td, Tr } from "@/components/Table";
import fetcher from "@/utils/fetcher";
import SkeletonTable from "@/components/dashboard/SkeletonTable";
import AddHatcheryModal from "@/components/dashboard/AddHatcheryModal";
import { Popconfirm } from "antd";

const Hatchery = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { data: farm } = useSWR(
    [
      "/api/farm/authentication",
      process.browser ? localStorage.getItem("token") : null,
    ],
    fetcher
  );

  if (farm?.isAuthenticated === "" || farm?.isAuthenticated === "pending") {
    router.push("/farm");
  }

  const { data, error } = useSWR(
    ["/api/hatchery", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  useEffect(() => {
    if (data !== undefined) {
      setLoading(false);
    }
  }, [data]);

  const onDelete = async (id) => {
    try {
      await fetch("/api/hatchery", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify({ id }),
      });

      mutate(
        [
          "/api/hatchery",
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
  };

  if (loading) {
    return (
      <Layout>
        <Box px={16} py={12} position="relative">
          <AddHatcheryModal />
          <Heading mt={10} mb={5}>
            Danh sách trại giống
          </Heading>
          <SkeletonTable />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box px={16} py={12} position="relative">
        <AddHatcheryModal />

        <Heading mt={10} mb={5}>
          Danh sách trại giống
        </Heading>

        {data && data.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>Tên trại giống</Th>
                <Th>Địa chỉ</Th>
                <Th>Tọa độ</Th>
                <Th>{""}</Th>
              </Tr>
              <TransitionGroup component="tbody">
                {data.map(
                  (
                    { name, address, _id, coordinate: { latitude, longitude } },
                    i
                  ) => (
                    <CSSTransition key={i} timeout={500} classNames="item">
                      <Tr cursor="pointer">
                        <Td>{name}</Td>
                        <Td>{address}</Td>
                        <Td>{latitude + " , " + longitude}</Td>
                        <Td
                          borderLeft="1px solid #e8eef3"
                          px={8}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Popconfirm
                            style={{ fontSize: "16px" }}
                            title="Bạn có sẽ xóa trại giống này hay không？"
                            okText="Có"
                            cancelText="Không"
                            onConfirm={() => onDelete(_id)}
                          >
                            <Box as={FaTrash}></Box>
                          </Popconfirm>
                        </Td>
                      </Tr>
                    </CSSTransition>
                  )
                )}
              </TransitionGroup>
            </Table>
          </>
        ) : (
          <Alert status="info" fontSize="md" w="30rem">
            <AlertIcon />
            <Text fontSize="md">Chưa có trại giống</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default Hatchery;
