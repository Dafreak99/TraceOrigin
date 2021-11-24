import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

import { FaTrash } from "react-icons/fa";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Popconfirm } from "antd";
import { useRouter } from "next/router";

import SkeletonTable from "@/components/dashboard/SkeletonTable";
import Layout from "@/components/dashboard/Layout";
import { Table, Tr, Td, Th } from "@/components/Table";
import Link from "next/link";
import { Select } from "antd";
import Search from "antd/lib/input/Search";

const { Option } = Select;

const feedingdiary = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [active, setActive] = useState(true);
  const [pondId, setPondId] = useState("*");
  const [keyword, setKeyword] = useState("");

  const { data, error } = useSWR(
    [
      `/api/feedingdiary/${active}||${pondId}`,
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
      await fetch("/api/feedingdiary", {
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
        <Heading mb={8}>Nhật ký cho ăn</Heading>
        <SkeletonTable />
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex align="center" mb={8} justify="space-between">
        <Heading flex="1">Nhật ký cho ăn</Heading>
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
                    <Tr
                      backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                      cursor="pointer"
                    >
                      <Td>{createdDate}</Td>
                      <Td>{pondName}</Td>
                      <Td>{name}</Td>
                      <Td>
                        <Image src={images[0]} height="5rem" />
                      </Td>
                      <Td>{weight}</Td>
                      <Td>{note}</Td>
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
    </Layout>
  );
};

export default feedingdiary;
