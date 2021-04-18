import { AlertIcon, Box, Heading, Image, Alert, Text } from "@chakra-ui/react";
import Layout from "@/components/dashboard/Layout";
import { Table, Tr, Td, Th } from "@/components/Table";
import { FaTrash } from "react-icons/fa";
import useSWR, { mutate } from "swr";
import fetcher from "@/utils/fetcher";
import SkeletonTable from "@/components/dashboard/SkeletonTable";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Popconfirm } from "antd";
import Link from "next/link";

const UsingMedicineDiary = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const { data, error } = useSWR(
    [
      "/api/usingmedicine",
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
      await fetch("/api/usingmedicine", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
        body: JSON.stringify({ id }),
      });

      // mutate(
      //   [
      //     "/api/usingmedicine",
      //     process.browser ? localStorage.getItem("token") : null,
      //   ],
      //   async (cachedData) => {
      //     // let data = cachedData.filter((each) => each._id !== id);
      //     // return data;
      //     console.log(cachedData);
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
        <Box px={16} py={12} position="relative">
          <Heading mb={8}>Nhật ký sử dụng thuốc</Heading>

          <SkeletonTable />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box px={16} py={12}>
        <Heading mb={8}>Nhật ký sử dụng thuốc</Heading>
        {data && data.length > 0 ? (
          <Table>
            <Tr>
              <Th>Ngày sử dung</Th>
              <Th>Tên Ao</Th>
              <Th>Tên thuốc</Th>
              <Th>Hình ảnh thuốc</Th>
              <Th>Tên thức ăn</Th>
              <Th>Hình ảnh thức ăn</Th>
              <Th>Khối lượng thuốc(kg)</Th>
              <Th>Tỷ lệ phối trộn(%)</Th>
              <Th>Người trộn</Th>
              <Th>{""}</Th>
            </Tr>
            <TransitionGroup component="tbody">
              {data.map(
                (
                  {
                    createdDate,
                    medicine: { name, images: hinhAnhThuoc },
                    food: { name: foodName, images: hinhAnhThucAn },
                    pond: { name: pondName },
                    mixingRatio,
                    weight,
                    worker: { name: workerName },
                    _id,
                  },
                  i
                ) => (
                  <CSSTransition key={i} timeout={500} classNames="item">
                    <Link href={`./usingmedicinediary/${_id}`}>
                      {/* <a> */}
                      <Tr cursor="pointer">
                        <Td>{createdDate}</Td>
                        <Td>{pondName}</Td>
                        <Td>{name}</Td>
                        <Td>
                          <Image src={hinhAnhThuoc[0]} height="5rem" />
                        </Td>
                        <Td>{foodName}</Td>
                        <Td>
                          <Image src={hinhAnhThucAn[0]} height="5rem" />
                        </Td>
                        <Td>{weight}</Td>
                        <Td>{mixingRatio}</Td>
                        <Td>{workerName}</Td>
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
            <Text fontSize="md">Chưa sử dụng thuốc</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default UsingMedicineDiary;
