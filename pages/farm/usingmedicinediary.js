import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

import Layout from "@/components/dashboard/Layout";
import { Table, Tr, Td, Th } from "@/components/Table";
import { FaTrash } from "react-icons/fa";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import SkeletonTable from "@/components/dashboard/SkeletonTable";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Popconfirm } from "antd";
import Link from "next/link";
import { Select } from "antd";
import Search from "antd/lib/input/Search";

const { Option } = Select;

const UsingMedicineDiary = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [active, setActive] = useState(true);
  const [pondId, setPondId] = useState("*");
  const [keyword, setKeyword] = useState("");

  const { data, error } = useSWR(
    [
      `/api/usingmedicine/${active}||${pondId}`,
      process.browser ? localStorage.getItem("token") : null,
      ,
    ],
    fetcher
  );

  const { data: pondsData } = useSWR(
    [`/api/pond`, process.browser ? localStorage.getItem("token") : null, ,],
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

      router.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Box position="relative">
          <Heading mb={8}>Nhật ký sử dụng thuốc</Heading>

          <SkeletonTable />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex align="center" mb={8} justify="space-between">
        <Heading flex="1">Nhật ký sử dụng thuốc</Heading>
        <Search
          size="large"
          style={{ width: "max-content" }}
          placeholder="Nhập từ khóa"
          onSearch={setKeyword}
          enterButton
        />
      </Flex>

      <style global jsx>{`
        .badge {
          cursor: pointer;
          transition: 350ms all;
        }
        .badge.active {
          font-weight: bold;
        }
      `}</style>
      <Box marginBottom="1rem ">
        <Flex align="center" fontSize="1rem">
          <Flex
            className={`badge ${active === true ? "active" : null}`}
            onClick={() => setActive(true)}
          >
            <Text>Mới</Text>
          </Flex>
          <Text mx="10px">|</Text>
          <Flex
            className={`badge ${active === false ? "active" : null}`}
            onClick={() => setActive(false)}
          >
            <Text>Lưu trữ</Text>
          </Flex>
        </Flex>
        <Flex>
          {pondsData?.ponds?.length && (
            <Select
              defaultValue="*"
              style={{ width: 120, marginRight: "10px" }}
              onChange={setPondId}
            >
              <Option value="*">Tất cả</Option>
              {pondsData.ponds.map(({ _id, name }) => (
                <Option value={_id}>{name}</Option>
              ))}
            </Select>
          )}
        </Flex>
      </Box>

      {data?.length > 0 ? (
        <Table>
          <Tr>
            <Th>Ngày sử dung</Th>
            <Th>Tên Ao</Th>
            <Th>Tên thuốc</Th>
            {/* <Th>Hình ảnh thuốc</Th> */}
            <Th>Tên thức ăn</Th>
            {/* <Th>Hình ảnh thức ăn</Th> */}
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
                  pond,
                  mixingRatio,
                  weight,
                  worker: { name: workerName },
                  _id,
                },
                i
              ) => (
                <CSSTransition key={i} timeout={500} classNames="item">
                  <Link href={`./usingmedicinediary/${_id}`}>
                    <Tr cursor="pointer">
                      <Td>{createdDate}</Td>
                      <Td>{pond?.name ? pond.name : "A1"}</Td>
                      <Td>{name}</Td>
                      {/* <Td>
                        <Image src={hinhAnhThuoc[0]} height="5rem" />
                      </Td> */}
                      <Td>{foodName}</Td>
                      {/* <Td>
                        <Image src={hinhAnhThucAn[0]} height="5rem" />
                      </Td> */}
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
    </Layout>

    // <Layout>
    //   <Box>
    //     <Heading mb={8}>Nhật ký sử dụng thuốc</Heading>

    //   </Box>
    // </Layout>
  );
};

export default UsingMedicineDiary;
