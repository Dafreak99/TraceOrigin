import { useEffect, useState } from "react";
import { Box, Heading, Alert, AlertIcon, Text, Badge } from "@chakra-ui/react";
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
        <Box position="relative">
          <AddHatcheryModal />
          <Heading mb={5}>Danh sách để xuất trại giống</Heading>
          <SkeletonTable />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box position="relative">
        <AddHatcheryModal />

        <Heading mb={5}>Danh sách trại giống đã được kiểm duyệt ✅ </Heading>

        {data?.defaultHatcheries?.length > 0 ? (
          <>
            <Table mb="2rem">
              <Tr>
                <Th>Tên trại giống</Th>
                <Th>Địa chỉ</Th>
                <Th>Tọa độ</Th>
              </Tr>
              <TransitionGroup component="tbody">
                {data.defaultHatcheries.map(
                  (
                    { name, address, _id, coordinate: { latitude, longitude } },
                    i
                  ) => (
                    <CSSTransition key={i} timeout={500} classNames="item">
                      <Tr cursor="pointer">
                        <Td>{name}</Td>
                        <Td>{address}</Td>
                        <Td>{latitude + " , " + longitude}</Td>
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

        {/* Pending request one */}
        <Heading mb={5}>Danh sách đề xuất trại giống</Heading>
        {data?.requestedHatcheries?.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>Tên trại giống</Th>
                <Th>Địa chỉ</Th>
                <Th>Tọa độ</Th>
                <Th>Trạng thái</Th>
                <Th>{""}</Th>
                <Th>{""}</Th>
              </Tr>
              <TransitionGroup component="tbody">
                {data.requestedHatcheries.map(
                  (
                    {
                      name,
                      address,
                      _id,
                      coordinate: { latitude, longitude },
                      isApproved,
                    },
                    i
                  ) => (
                    <CSSTransition key={i} timeout={500} classNames="item">
                      <Tr cursor="pointer">
                        <Td>{name}</Td>
                        <Td>{address}</Td>
                        <Td>{latitude + " , " + longitude}</Td>
                        <Td>
                          {" "}
                          {isApproved === "pending" ? (
                            <Badge>Chờ duyệt</Badge>
                          ) : isApproved === "true" ? (
                            <Badge colorScheme="green">Đã duyệt</Badge>
                          ) : (
                            <Badge colorScheme="red">Không được duyệt</Badge>
                          )}
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
            <Text fontSize="md">Chưa có đề xuất</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default Hatchery;
