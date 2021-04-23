import { useEffect, useRef, useState } from "react";

import {
  Box,
  Heading,
  List,
  ListIcon,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import { Table, Th, Td, Tr } from "@/components/Table";

import { BiDotsVerticalRounded } from "react-icons/bi";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import useSWR, { mutate } from "swr";
import fetcher from "@/utils/fetcher";
import Layout from "@/components/dashboard/Layout";
import SkeletonTable from "@/components/dashboard/SkeletonTable";
import AddUserModal from "@/components/dashboard/AddUserModal";
import ChangePasswordModal from "@/components/dashboard/ChangePasswordModal";
import { FaTrash } from "react-icons/fa";
import { Popconfirm } from "antd";
import { AiTwotoneEdit } from "react-icons/ai";
import OutsideAlerter from "@/components/dashboard/OutsideAlerter";

const Admin = () => {
  const [rowIndex, setRowIndex] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      await fetch("/api/admin", {
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
  };

  if (loading) {
    return (
      <Layout>
        <Box>
          <Heading mb={5}>Danh sách người dùng</Heading>
          <SkeletonTable />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box>
        <Heading mb={5}>Danh sách người dùng</Heading>
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
              <TransitionGroup component="tbody">
                {data.map(({ username, type, _id }, i) => (
                  <CSSTransition key={i} timeout={500} classNames="item">
                    <>
                      <Tr cursor="pointer">
                        <Td>{i + 1}</Td>
                        <Td>{username}</Td>
                        <Td>{type}</Td>
                        <Td>{_id}</Td>
                        <Td>
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
                            <OutsideAlerter action={() => setRowIndex(null)}>
                              <List
                                spacing={3}
                                position="absolute"
                                background="#fff"
                                boxShadow="0 15px 30px rgb(0 0 0 / 5%)"
                                className="user__setting"
                                borderRadius="3px"
                              >
                                <ListItem
                                  padding="15px 30px 15px 30px"
                                  onClick={onOpen}
                                >
                                  <ListIcon
                                    as={AiTwotoneEdit}
                                    color="#738cc7"
                                  />
                                  Đổi mật khẩu
                                </ListItem>

                                <ListItem padding="15px 30px 15px 30px">
                                  <Popconfirm
                                    style={{ fontSize: "16px" }}
                                    title="Bạn có chắc sẽ xóa tài khoản này hay không ?"
                                    okText="Có"
                                    cancelText="Không"
                                    onConfirm={() => onDelete(_id)}
                                  >
                                    <ListIcon as={FaTrash} color="#738cc7" />
                                    Xoá tài khoản
                                  </Popconfirm>
                                </ListItem>
                              </List>
                            </OutsideAlerter>
                          )}
                        </Td>
                      </Tr>
                      <ChangePasswordModal
                        isOpen={isOpen}
                        onClose={onClose}
                        id={_id}
                        setRowIndex={setRowIndex}
                      />
                    </>
                  </CSSTransition>
                ))}
              </TransitionGroup>
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

// Determine this codesanbox: https://codesandbox.io/s/outside-alerter-hooks-lmr2y?module=/src/OutsideAlerter.js&file=/src/index.js
