import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import NavbarDrawer from "@/components/NavbarDrawer";
import { Box, Heading, List, ListIcon, ListItem } from "@chakra-ui/core";
import { Table, Th, Td, Tr } from "@/components/Table";
import Products from "@/components/Products";
import { BiDotsVerticalRounded } from "react-icons/bi";

import useSWR, { mutate } from "swr";
import fetcher from "@/utils/fetcher";
import Layout from "@/components/dashboard/Layout";
import FoodTableSkeleton from "@/components/dashboard/FoodTableSkeleton";
import AddUserModal from "@/components/dashboard/AddUserModal";
import { AiTwotoneEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { Popconfirm } from "antd";
import { set } from "js-cookie";

const Setting = () => {
  const [openSetting, setOpenSetting] = useState(false);

  return (
    <>
      <Box
        as={BiDotsVerticalRounded}
        h="24px"
        w="24px"
        color="#939caa"
        onClick={() => setOpenSetting(!openSetting)}
      />
      {openSetting && (
        <List
          spacing={3}
          position="absolute"
          padding="20px 30px"
          background="#fff"
          boxShadow="0 15px 30px rgb(0 0 0 / 5%)"
        >
          <ListItem>
            <ListIcon as={AiTwotoneEdit} color="#738cc7" />
            Edit
          </ListItem>
          <ListItem>
            <ListIcon as={FaTrash} color="#738cc7" />
            Remove
          </ListItem>
        </List>
      )}
    </>
  );
};

const Admin = () => {
  const [rowIndex, setRowIndex] = useState(null);

  const [loading, setLoading] = useState(true);

  const { data, error } = useSWR(
    ["/api/admin", process.browser ? localStorage.getItem("token") : null],
    fetcher
  );

  useEffect(() => {
    if (data !== undefined) {
      setLoading(false);
    }
  }, [data]);

  const onDelete = async (id) => {
    try {
      let res = await fetch("/api/admin", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: process.browser ? localStorage.getItem("token") : null,
        },
      });

      mutate(
        ["/api/admin", process.browser ? localStorage.getItem("token") : null],
        async (cachedData) => {
          let data = cachedData.filter((each) => each._id !== id);
          return data;
        },
        false
      );
    } catch (error) {
      console.log(error.message);
    }

    setRowIndex(null);
  };

  if (loading) {
    return (
      <Layout>
        <Box px={16} py={12}>
          <Heading mt={10} mb={5}>
            Danh sách người dùng
          </Heading>
          <FoodTableSkeleton />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box px={16} py={12}>
        <Heading mt={10} mb={5}>
          Danh sách người dùng
        </Heading>
        <AddUserModal />
        {data && data.length > 0 ? (
          <>
            <Table>
              <Tr>
                <Th>#</Th>
                <Th>Tên người dùng</Th>
                <Th>Loại tài khoản</Th>
                <Th>ID</Th>

                <Th>{""}</Th>
              </Tr>
              {data.map(({ username, type, _id }, i) => (
                <Tr
                  backgroundColor={i % 2 === 0 ? "white" : "gray.50"}
                  cursor="pointer"
                >
                  <Td>{i + 1}</Td>
                  <Td>{username}</Td>
                  <Td>{type}</Td>
                  <Td>{_id}</Td>
                  <Td>
                    {/* <Setting /> */}
                    <Box
                      as={BiDotsVerticalRounded}
                      h="24px"
                      w="24px"
                      color="#939caa"
                      onClick={() => {
                        if (i + 1 === rowIndex) setRowIndex(null);
                        else setRowIndex(i + 1);
                      }}
                    />
                    {i + 1 === rowIndex && (
                      <List
                        spacing={3}
                        position="absolute"
                        background="#fff"
                        boxShadow="0 15px 30px rgb(0 0 0 / 5%)"
                        className="user__setting"
                      >
                        <ListItem padding="15px 30px 5px 30px">
                          <ListIcon as={AiTwotoneEdit} color="#738cc7" />
                          Edit
                        </ListItem>
                        <ListItem padding="5px 30px 15px 30px">
                          <Popconfirm
                            style={{ fontSize: "16px" }}
                            title="Bạn có sẽ xóa tài khoản này hay không？"
                            okText="Có"
                            cancelText="Không"
                            onConfirm={() => onDelete(_id)}
                          >
                            <ListIcon as={FaTrash} color="#738cc7" />
                            Remove
                          </Popconfirm>
                        </ListItem>
                      </List>
                    )}
                  </Td>
                </Tr>
              ))}
            </Table>
          </>
        ) : (
          <Alert status="info" fontSize="md" w="30rem">
            <AlertIcon />
            <Text fontSize="md">Chưa có tài khoản nào được tạo</Text>
          </Alert>
        )}
      </Box>
    </Layout>
  );
};

export default Admin;
